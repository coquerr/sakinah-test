import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { configureWebPush } from '@/lib/push';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization') || '';
  const expectedSecret = process.env.CRON_SECRET;

  // Извлекаем токен независимо от регистра слова Bearer
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  if (!expectedSecret || token !== expectedSecret.trim()) {
    console.error('Auth failed. Expected:', expectedSecret, 'Received token:', token);
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const webpush = configureWebPush();
    const subscribers = await kv.hgetall('subscribers');
    if (!subscribers) return NextResponse.json({ success: true, message: 'No subscribers' });

    const notifications = [];

    for (const [endpoint, dataString] of Object.entries(subscribers)) {
      const data = typeof dataString === 'string' ? JSON.parse(dataString) : dataString;
      const { subscription, timezone } = data;

      // TODO: твоя логика сверки времени
      const isPrayerTime = true;

      if (isPrayerTime) {
        const payload = JSON.stringify({
          title: 'Время намаза',
          body: 'Наступило время молитвы.'
        });

        notifications.push(
          webpush.sendNotification(subscription, payload).catch(async (error: any) => {
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