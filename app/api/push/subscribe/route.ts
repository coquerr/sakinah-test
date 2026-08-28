import { NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function POST(request: Request) {
  try {
    const { subscription, timezone } = await request.json();
    
    // endpoint уникален для каждого устройства, используем его как ID
    const subscriberId = subscription.endpoint;
    
    // Сохраняем в KV Hash Map через ioredis
    // Синтаксис: redis.hset(ключ_хэша, поле, значение)
    await redis.hset(
      'subscribers',
      subscriberId,
      JSON.stringify({ subscription, timezone })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}