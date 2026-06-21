const requests = new Map();

export function canRequest(ip: string) {
  const now = Date.now();

  const user = requests.get(ip);

  if (!user) {
    requests.set(ip, {
      count: 1,
      timestamp: now,
    });

    return true;
  }

  if (now - user.timestamp > 60000) {
    requests.set(ip, {
      count: 1,
      timestamp: now,
    });

    return true;
  }

  if (user.count >= 10) {
    return false;
  }

  user.count++;

  return true;
}