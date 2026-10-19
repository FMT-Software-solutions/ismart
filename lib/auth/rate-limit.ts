// Fixed-window rate limiter kept in server memory.
//
// Good enough to stop casual abuse of the password reset endpoint, but the
// counters are per server instance and reset on redeploy. If the site runs
// on many serverless instances, move this to a shared store (e.g. Upstash
// Redis) behind the same function signature.
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();

  // Opportunistic cleanup so the map cannot grow without bound
  if (buckets.size > 5000) {
    buckets.forEach((bucket, k) => {
      if (bucket.resetAt <= now) buckets.delete(k);
    });
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }

  bucket.count += 1;
  return {
    allowed: bucket.count <= limit,
    retryAfterMs: bucket.resetAt - now,
  };
}
