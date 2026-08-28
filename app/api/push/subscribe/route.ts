import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request: Request) {
  try {
    const { subscription, timezone } = await request.json();
    
    // endpoint уникален для каждого устройства, используем его как ID
    const subscriberId = subscription.endpoint;
    
    // Сохраняем в KV Hash Map. Ключ хэша 'subscribers'
    await kv.hset('subscribers', {
      [subscriberId]: JSON.stringify({ subscription, timezone })
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}