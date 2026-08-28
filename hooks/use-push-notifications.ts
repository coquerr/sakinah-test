import { useState, useEffect } from 'react';

export function usePushNotifications() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(sub => {
          if (sub) setIsSubscribed(true);
        });
      });
    }
  }, []);

  const subscribe = async () => {
    if (!('serviceWorker' in navigator)) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('Разрешение на уведомления не получено');
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      
      // Конвертация ключа
      const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
      const urlBase64ToUint8Array = (base64String: string) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      };

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      });

      // Передаем подписку и часовой пояс на сервер
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          subscription, 
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone 
        })
      });

      setIsSubscribed(true);
    } catch (error) {
      console.error('Ошибка подписки:', error);
    }
  };

  return { isSubscribed, subscribe };
}