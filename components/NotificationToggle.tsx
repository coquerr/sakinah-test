"use client";

// Убедись, что путь к хуку совпадает с твоей структурой папок
import { usePushNotifications } from "@/hooks/use-push-notifications";

export function NotificationToggle() {
  const { isSubscribed, subscribe } = usePushNotifications();

  return (
    <button
      onClick={subscribe}
      disabled={isSubscribed}
      className={`px-6 py-3 rounded-xl font-semibold text-white transition-all ${
        isSubscribed 
          ? "bg-gray-400 cursor-not-allowed" 
          : "bg-emerald-600 hover:bg-emerald-700 active:scale-95"
      }`}
    >
      {isSubscribed ? "Уведомления включены ✓" : "Включить уведомления об азане"}
    </button>
  );
}