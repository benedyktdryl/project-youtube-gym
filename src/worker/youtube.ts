const YOUTUBE_BASE = "https://www.googleapis.com/youtube/v3";

type YouTubeVideoDetails = {
  youtubeId: string;
  title: string;
  description: string;
  channelId: string;
  channelName: string;
  channelThumbnail: string;
  thumbnailUrl: string;
  durationSeconds: number;
  publishedAt: Date | null;
  commentCount: number | null;
};

export type YouTubeComment = {
  id: string;
  text: string;
};

function requireYouTubeKey() {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    throw new Error("YOUTUBE_API_KEY is required for YouTube ingestion.");
  }
  return key;
}

function stripHtml(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDurationToSeconds(duration: string) {
  const match = duration.match(/P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const days = Number(match[1] ?? 0);
  const hours = Number(match[2] ?? 0);
  const minutes = Number(match[3] ?? 0);
  const seconds = Number(match[4] ?? 0);
  return ((days * 24 + hours) * 60 + minutes) * 60 + seconds;
}

export function extractYouTubeId(input: string) {
  if (!input) return null;
  const trimmed = input.trim();
  const idMatch = trimmed.match(/^[a-zA-Z0-9_-]{11}$/);
  if (idMatch) return trimmed;

  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.replace("/", "") || null;
    }
    if (url.hostname.includes("youtube.com")) {
      const v = url.searchParams.get("v");
      if (v) return v;
      const parts = url.pathname.split("/");
      const embedIndex = parts.findIndex((part) => part === "embed");
      if (embedIndex >= 0 && parts[embedIndex + 1]) {
        return parts[embedIndex + 1];
      }
    }
  } catch {
    return null;
  }

  return null;
}

export async function fetchYouTubeVideo(youtubeId: string): Promise<YouTubeVideoDetails> {
  const key = requireYouTubeKey();
  const url = new URL(`${YOUTUBE_BASE}/videos`);
  url.searchParams.set("part", "snippet,contentDetails,statistics");
  url.searchParams.set("id", youtubeId);
  url.searchParams.set("key", key);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.status}`);
  }
  const payload = await response.json();
  const item = payload.items?.[0];
  if (!item) {
    throw new Error("YouTube video not found.");
  }

  const snippet = item.snippet ?? {};
  const statistics = item.statistics ?? {};
  const thumbnails = snippet.thumbnails ?? {};
  const thumbnail =
    thumbnails.maxres ??
    thumbnails.standard ??
    thumbnails.high ??
    thumbnails.medium ??
    thumbnails.default ??
    {};

  const channelThumbnail = snippet.channelId
    ? await fetchChannelThumbnail(snippet.channelId, key)
    : "";

  return {
    youtubeId,
    title: snippet.title ?? "",
    description: snippet.description ?? "",
    channelId: snippet.channelId ?? "",
    channelName: snippet.channelTitle ?? "",
    channelThumbnail,
    thumbnailUrl: thumbnail.url ?? "",
    durationSeconds: parseDurationToSeconds(item.contentDetails?.duration ?? ""),
    publishedAt: snippet.publishedAt ? new Date(snippet.publishedAt) : null,
    commentCount: statistics.commentCount ? Number(statistics.commentCount) : null,
  };
}

async function fetchChannelThumbnail(channelId: string, key: string) {
  const url = new URL(`${YOUTUBE_BASE}/channels`);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("id", channelId);
  url.searchParams.set("key", key);

  const response = await fetch(url.toString());
  if (!response.ok) {
    return "";
  }
  const payload = await response.json();
  const item = payload.items?.[0];
  const thumbnails = item?.snippet?.thumbnails ?? {};
  return thumbnails.default?.url ?? thumbnails.medium?.url ?? thumbnails.high?.url ?? "";
}

export async function fetchYouTubeComments(
  youtubeId: string,
  limit = 20,
): Promise<YouTubeComment[]> {
  const key = requireYouTubeKey();
  const url = new URL(`${YOUTUBE_BASE}/commentThreads`);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("videoId", youtubeId);
  url.searchParams.set("maxResults", String(Math.min(limit, 100)));
  url.searchParams.set("textFormat", "plainText");
  url.searchParams.set("key", key);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`YouTube comments error: ${response.status}`);
  }
  type YouTubeCommentThread = {
    id?: string;
    snippet?: {
      topLevelComment?: {
        snippet?: {
          textDisplay?: string;
          textOriginal?: string;
        };
      };
    };
  };

  const payload = (await response.json()) as { items?: YouTubeCommentThread[] };
  const items = payload.items ?? [];
  return items.map((item) => {
    const snippet = item.snippet?.topLevelComment?.snippet ?? {};
    return {
      id: item.id ?? "",
      text: stripHtml(String(snippet.textDisplay ?? snippet.textOriginal ?? "")),
    };
  });
}
