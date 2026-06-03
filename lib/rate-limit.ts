const rateLimitMap = new Map<string, { count: number; lastReset: number }>()

export function rateLimit(ip: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now - entry.lastReset > windowMs) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return true
  }

  if (entry.count >= limit) {
    return false
  }

  entry.count++
  return true
}
