import { createBoss } from "./boss";
import { extractYouTubeId } from "./youtube";

const QUEUE_NAME = "youtube-ingestion";

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const rawInput = args.find((value) => !value.startsWith("--"));

  if (!rawInput) {
    console.error("Usage: bun src/worker/enqueue.ts <youtubeId|url> [--force]");
    process.exit(1);
  }

  const youtubeId = extractYouTubeId(rawInput);
  if (!youtubeId) {
    console.error("Could not parse a YouTube video ID.");
    process.exit(1);
  }

  const boss = createBoss();
  await boss.start();

  await boss.send(QUEUE_NAME, { youtubeId, force }, { retryLimit: 3, retryDelay: 30 });

  console.log(`Enqueued ingestion for ${youtubeId}`);
  await boss.stop();
}

main().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
