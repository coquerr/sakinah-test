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
      const { subscription } = data;

      // Тестовый флаг (позже заменим на сверку расписания)
      const isPrayerTime = true;

      if (isPrayerTime) {
        const payload = JSON.stringify({
          title: 'Время намаза',
          body: 'Наступило время молитвы.'
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

    await Promise.all(notifications);
    return NextResponse.json({ success: true, sent: notifications.length });
  } catch (error) {
    console.error('Cron error:', error);
    return NextResponse.json({ error: 'Push failed' }, { status: 500 });
  }
}