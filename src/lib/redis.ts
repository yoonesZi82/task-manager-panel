import { Redis } from "@upstash/redis";
const redis = new Redis({
  url: "https://warm-lacewing-14304.upstash.io",
  token: "ATfgAAIncDJhODc4MTFiYTNmZjY0ZmE1ODZlZTc3OWQ1OGIyZjk5M3AyMTQzMDQ",
});
export default redis;
