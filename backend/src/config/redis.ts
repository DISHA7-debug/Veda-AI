import Redis from "ioredis";

const redisURL = process.env.REDIS_URL;

if (!redisURL) {
  console.error("❌ REDIS_URL is not defined in environment variables");
  process.exit(1);
}

const redis: Redis = new Redis(redisURL, {
  lazyConnect: true, // don't auto-connect until .connect() is called
  maxRetriesPerRequest: 3, // fail fast on individual commands
  retryStrategy(times: number): number | null {
    if (times > 5) {
      console.error("❌ Redis max reconnection attempts reached. Giving up.");
      return null; // stop retrying
    }
    const delay = Math.min(times * 200, 2000); // exponential backoff, cap at 2s
    console.warn(`⚠️  Redis retry attempt ${times} — reconnecting in ${delay}ms`);
    return delay;
  },
});

redis.on("connect", (): void => {
  console.log("✅ Redis connected successfully");
});

redis.on("ready", (): void => {
  console.log("🚀 Redis is ready to accept commands");
});

redis.on("error", (error: Error): void => {
  console.error(`❌ Redis error: ${error.message}`);
});

redis.on("close", (): void => {
  console.warn("⚠️  Redis connection closed");
});

redis.on("reconnecting", (): void => {
  console.log("🔄 Redis reconnecting...");
});

// Initiate the connection
redis.connect().catch((error: Error) => {
  console.error(`❌ Redis initial connection failed: ${error.message}`);
  process.exit(1);
});

export default redis;