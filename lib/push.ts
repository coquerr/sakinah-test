import webpush from 'web-push';

let isConfigured = false;

export function configureWebPush() {
  if (isConfigured) return webpush;

  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;

  if (publicKey && privateKey) {
    webpush.setVapidDetails(
      'mailto:vimeruch321@gmail.com',
      publicKey,
      privateKey
    );
    isConfigured = true;
  }

  return webpush;
}

export default webpush;