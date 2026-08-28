import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function POST(request: Request) {
  try {
    const { subscription, timezone, city } = await request.json();
    
    const subscriberId = subscription.endpoint;
    
    // Сохраняем подписку, таймзону и город (по умолчанию Махачкала, если город не передан)
    await redis.hset(
      'subscribers',
      subscriberId,
      JSON.stringify({ 
        subscription, 
        timezone: timezone || 'Europe/Moscow',
        city: city || 'Makhachkala' 
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}