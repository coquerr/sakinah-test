import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { configureWebPush } from '@/lib/push';

export async function GET(request: Request) {
  // Защищаем роут, чтобы никто чужой не мог запустить рассылку
  const authHeader = request.headers.get('authorization');
  const webpush = configureWebPush();
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Получаем всех подписчиков из базы
    const subscribers = await kv.hgetall('subscribers');
    if (!subscribers) return NextResponse.json({ success: true, message: 'No subscribers' });

    const notifications = [];

    for (const [endpoint, dataString] of Object.entries(subscribers)) {
      // Vercel KV может возвращать объект или строку, перестрахуемся
      const data = typeof dataString === 'string' ? JSON.parse(dataString) : dataString;
      const { subscription, timezone } = data;

      // TODO: Здесь твоя логика проверки времени намаза.
      // Например, вычисляешь текущее время в `timezone` пользователя
      // и сравниваешь с локальным расписанием.
      const isPrayerTime = true; // Замени на свою проверку!

      if (isPrayerTime) {
        const payload = JSON.stringify({
          title: 'Время намаза',
          body: 'Наступило время молитвы.'
        });

        // Отправляем пуш и перехватываем ошибку 410 (пользователь удалил PWA)
        notifications.push(
          webpush.sendNotification(subscription, payload).catch(async (error) => {
            if (error.statusCode === 410) {
              await kv.hdel('subscribers', endpoint);
            }
          })
        );
      }
    }

    await Promise.all(notifications);
    return NextResponse.json({ success: true, sent: notifications.length });
  } catch (error) {
    console.error('Cron error:', error);
    return NextResponse.json({ error: 'Push failed' }, { status: 500 });
  }
}