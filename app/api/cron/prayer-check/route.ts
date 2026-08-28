import { NextResponse } from 'next/server';
import redis from '@/lib/redis';
import { configureWebPush } from '@/lib/push';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization') || '';
  const expectedSecret = process.env.CRON_SECRET;
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  if (!expectedSecret || token !== expectedSecret.trim()) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const webpush = configureWebPush();
    const subscribers = await redis.hgetall('subscribers');

    if (!subscribers || Object.keys(subscribers).length === 0) {
      return NextResponse.json({ success: true, message: 'No subscribers yet' });
    }

    const notifications = [];

    for (const [endpoint, dataString] of Object.entries(subscribers)) {
      const data = typeof dataString === 'string' ? JSON.parse(dataString) : dataString;
      const { subscription, timezone = 'Europe/Moscow', city = 'Makhachkala' } = data;

      // 1. Узнаем текущее время пользователя в его часовом поясе
      const nowUserTime = new Date().toLocaleTimeString('en-GB', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }); // Формат "HH:MM"

      // 2. Получаем сегодняшнюю дату для API
      const todayDate = new Date().toLocaleDateString('en-GB', {
        timeZone: timezone,
      }).split('/').reverse().join('-'); // Формат YYYY-MM-DD

      // 3. Запрашиваем расписание намазов для города пользователя
      const apiRes = await fetch(
        `https://api.aladhan.com/v1/timingsByCity/${todayDate}?city=${city}&country=Russia&method=3`
      );
      const apiData = await apiRes.json();

      if (apiData && apiData.data && apiData.data.timings) {
        const timings = apiData.data.timings;
        // Намазы, которые нас интересуют: Фаджр, Зухр, Аср, Магриб, Иша
        const prayerNames: Record<string, string> = {
          Fajr: 'Фаджр',
          Dhuhr: 'Зухр',
          Asr: 'Аср',
          Maghrib: 'Магриб',
          Isha: 'Иша',
        };

        let currentPrayer = null;

        for (const [key, name] of Object.entries(prayerNames)) {
          const prayerTime = timings[key]; // Время в формате "HH:MM" (без секунд)
          if (prayerTime === nowUserTime) {
            currentPrayer = name;
            break;
          }
        }

        // 4. Если текущее время совпало со временем одного из намазов — отправляем пуш
        if (currentPrayer) {
          const payload = JSON.stringify({
            title: `Время намаза: ${currentPrayer}`,
            body: `Наступило время молитвы ${currentPrayer}.`,
          });

          notifications.push(
            webpush.sendNotification(subscription, payload).catch(async (error: any) => {
              if (error.statusCode === 410) {
                await redis.hdel('subscribers', endpoint);
              }
            })
          );
        }
      }
    }

    await Promise.all(notifications);
    return NextResponse.json({ success: true, triggeredCount: notifications.length });
  } catch (error) {
    console.error('Cron prayer-check error:', error);
    return NextResponse.json({ error: 'Prayer check failed' }, { status: 500 });
  }
}