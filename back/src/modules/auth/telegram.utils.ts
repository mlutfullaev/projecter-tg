import * as crypto from 'crypto';

export function checkTelegramInitData(initData: string, botToken: string): boolean {
  const parsed = new URLSearchParams(initData);
  const hash = parsed.get('hash');
  parsed.delete('hash');

  const dataCheckString = Array.from(parsed.entries())
    .map(([key, value]) => `${key}=${value}`)
    .sort()
    .join('\n');

  const secret = crypto.createHash('sha256').update(botToken).digest();
  const hmac = crypto.createHmac('sha256', secret).update(dataCheckString).digest('hex');

  return hmac === hash;
}

export function parseInitData(initData: string) {
  console.log(initData)
  const params = new URLSearchParams(initData);
  return {
    id: params.get('id'),
    username: params.get('username'),
    first_name: params.get('first_name'),
    last_name: params.get('last_name'),
    photo_url: params.get('photo_url'),
  };
}
