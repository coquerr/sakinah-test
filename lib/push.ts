import webpush from 'web-push';

webpush.setVapidDetails(
  'vimeruch321@gmail.com', // Укажи свой email (обязательное требование протокола VAPID)
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export default webpush;