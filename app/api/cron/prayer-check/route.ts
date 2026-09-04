import { NextResponse } from 'next/server';
import redis from '@/lib/redis';
import { configureWebPush } from '@/lib/push';
import { PrayerTimes, Coordinates } from 'adhan';
import { getDagestanCalculationParams } from '@/lib/constants/dagestan-prayer-config';

const CITY_COORDS: Record<string, [number, number]> = {
  'Makhachkala': [42.9831, 47.5046],
  'Махачкала': [42.9831, 47.5046],
  'Grozny': [43.3136, 45.6944],
  'Грозный': [43.3136, 45.6944],
  'Magas': [43.1667, 44.8000],
  'Магас': [43.1667, 44.8000],
};

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
    const now = new Date();

    for (const [endpoint, dataString] of Object.entries(subscribers)) {
      const data = typeof dataString === 'string' ? JSON.parse(dataString) : dataString;
      const { subscription, timezone = 'Europe/Moscow', city = 'Makhachkala' } = data;

      const nowUserTime = now.toLocaleTimeString('en-GB', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      // 1. Изолируем дату пользователя от часового пояса сервера
      const nowUserDateStr = now.toLocaleDateString('en-CA', { timeZone: timezone });
      const [year, month, day] = nowUserDateStr.split('-').map(Number);
      
      // Искусственно ставим 12:00 дня, чтобы библиотека adhan не сместила день из-за UTC-сервера
      const exactUserDate = new Date(year, month - 1, day, 12, 0, 0);

      const [lat, lng] = CITY_COORDS[city] || CITY_COORDS['Makhachkala'];
      const coordinates = new Coordinates(lat, lng);
      const params = getDagestanCalculationParams();

      // Передаем жестко зафиксированную дату
      const prayerTimes = new PrayerTimes(coordinates, exactUserDate, params);

      const timings: Record<string, string> = {
        Fajr: prayerTimes.fajr.toLocaleTimeString('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: false }),
        Dhuhr: prayerTimes.dhuhr.toLocaleTimeString('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: false }),
        Asr: prayerTimes.asr.toLocaleTimeString('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: false }),
        Maghrib: prayerTimes.maghrib.toLocaleTimeString('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: false }),
        Isha: prayerTimes.isha.toLocaleTimeString('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: false }),
      };

      const prayerNames: Record<string, string> = {
        Fajr: 'Фаджр',
        Dhuhr: 'Зухр',
        Asr: 'Аср',
        Maghrib: 'Магриб',
        Isha: 'Иша',
      };

      let currentPrayer = null;

      for (const [key, name] of Object.entries(prayerNames)) {
        if (timings[key] === nowUserTime) {
          currentPrayer = name;
          break;
        }
      }

      if (currentPrayer) {
        const payload = JSON.stringify({
          title: `Время намаза: ${currentPrayer}`,
          body: `Наступило время молитвы ${currentPrayer}.`,
        });

        // 2. Устанавливаем высший приоритет, чтобы пробить ночной спящий режим телефона
        const options = {
          urgency: 'high' as const,
        };
        
        notifications.push(
          webpush.sendNotification(subscription, payload, options).catch(async (error: any) => {
            if (error.statusCode === 410) {
              await redis.hdel('subscribers', endpoint);
            }
          })
        );
      }
    }

    await Promise.all(notifications);
    return NextResponse.json({ success: true, triggeredCount: notifications.length });
  } catch (error) {
    console.error('Cron prayer-check error:', error);
    return NextResponse.json({ error: 'Prayer check failed' }, { status: 500 });
  }
}