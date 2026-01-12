import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router";

type IngestionEventView = {
  id: string;
  youtubeId: string;
  analyzerUsed: string;
  qualityScore: number | null;
  missingFields: string[];
  errorMessage: string | null;
  createdAt: string;
};

type IngestedVideoView = {
  id: string;
  youtubeId: string;
  title: string;
  thumbnailUrl: string;
  channelName: string;
  duration: number;
  intensity: string;
  trainingType: string | null;
  trainingTags: string[];
  qualityScore: number | null;
  analyzedAt: string | null;
};

type IngestionPageProps = {
  events: IngestionEventView[];
  videos: IngestedVideoView[];
};

function formatDuration(seconds: number) {
  if (!seconds) return "0m";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m`;
}

function formatTimestamp(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  return date.toLocaleString();
}

export function IngestionPage({ events, videos }: IngestionPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Ingestion Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor YouTube ingestion jobs and review analyzed training metadata.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Ingestion Events</CardTitle>
            <CardDescription>Latest job runs from the worker.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Video</TableHead>
                  <TableHead>Analyzer</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Missing</TableHead>
                  <TableHead>At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-muted-foreground">
                      No ingestion events yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">
                        <a
                          href={`https://www.youtube.com/watch?v=${event.youtubeId}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          {event.youtubeId}
                        </a>
                        {event.errorMessage ? (
                          <p className="text-xs text-destructive mt-1 line-clamp-2">
                            {event.errorMessage}
                          </p>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        <Badge variant={event.analyzerUsed === "llm" ? "default" : "secondary"}>
                          {event.analyzerUsed}
                        </Badge>
                      </TableCell>
                      <TableCell>{event.qualityScore ?? "—"}</TableCell>
                      <TableCell>
                        {event.missingFields.length ? (
                          <span className="text-xs text-muted-foreground">
                            {event.missingFields.join(", ")}
                          </span>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>{formatTimestamp(event.createdAt)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analyzed Videos</CardTitle>
            <CardDescription>Latest videos enriched with training metadata.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {videos.length === 0 ? (
                <p className="text-sm text-muted-foreground">No analyzed videos yet.</p>
              ) : (
                videos.map((video) => (
                  <div key={video.id} className="flex gap-4 rounded-lg border border-border/60 p-3">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="h-20 w-32 rounded-md object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            to={`/videos/${video.id}`}
                            className="font-semibold leading-tight hover:underline"
                          >
                            {video.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">{video.channelName}</p>
                        </div>
                        <div className="text-right text-xs text-muted-foreground">
                          <div>{formatDuration(video.duration)}</div>
                          <div>{formatTimestamp(video.analyzedAt)}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {video.trainingType ? (
                          <Badge variant="secondary">{video.trainingType}</Badge>
                        ) : null}
                        <Badge variant="outline">{video.intensity}</Badge>
                        {video.qualityScore !== null ? (
                          <Badge variant="default">Score {video.qualityScore}</Badge>
                        ) : null}
                        {video.trainingTags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
