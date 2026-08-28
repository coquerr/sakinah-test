"use client";

import { usePushNotifications } from "@/hooks/use-push-notifications";
import { Bell, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface NotificationToggleProps {
  hideOnSuccess?: boolean;
}

export function NotificationToggle({ hideOnSuccess = false }: NotificationToggleProps) {
  const { isSubscribed, subscribe } = usePushNotifications();

  // Если проп hideOnSuccess передан как true и уведомления уже включены — скрываем кнопку
  if (isSubscribed && hideOnSuccess) {
    return null;
  }

  return (
    <button
      onClick={subscribe}
      disabled={isSubscribed}
      className={cn(
        "group flex w-full items-center justify-between rounded-2xl border p-4 transition-all active:scale-[0.98]",
        isSubscribed
          ? "cursor-default border-border/60 bg-surface/50"
          : "border-primary/20 bg-primary/10 shadow-sm hover:bg-primary/15"
      )}
    >
      <div className="flex items-center gap-3">
        <div 
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
            isSubscribed ? "bg-surface-hover text-muted-foreground" : "bg-primary/20 text-primary"
          )}
        >
          {isSubscribed ? <Check size={18} /> : <Bell size={18} />}
        </div>
        
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold text-foreground">
            {isSubscribed ? "Уведомления включены" : "Включить уведомления"}
          </span>
          {!isSubscribed && (
            <span className="mt-0.5 text-left text-xs text-muted-foreground">
              Напоминания о времени азана
            </span>
          )}
        </div>
      </div>
      
      {!isSubscribed && (
        <ChevronRight size={18} className="text-primary transition-transform group-hover:translate-x-1" />
      )}
    </button>
  );
}