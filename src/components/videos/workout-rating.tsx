import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { toast } from "sonner";

interface WorkoutRatingProps {
  scheduledId: string;
  initialRating?: number | null;
  initialComment?: string | null;
}

/**
 * Post-workout feedback (PRI-169). Shown once a scheduled workout is completed:
 * captures a 1-5 star rating + an optional note. Submits via the video-detail
 * `rate-workout` action. Cheap, high-signal data for market-fit validation.
 */
export function WorkoutRating({ scheduledId, initialRating, initialComment }: WorkoutRatingProps) {
  const fetcher = useFetcher<{ ok?: boolean; rated?: boolean; error?: string }>();
  const [rating, setRating] = useState(initialRating ?? 0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState(initialComment ?? "");
  const submitting = fetcher.state !== "idle";

  useEffect(() => {
    if (fetcher.data?.ok && fetcher.data.rated) {
      toast.success("Thanks — rating saved");
    } else if (fetcher.data?.error) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.data]);

  return (
    <fetcher.Form method="post" className="space-y-3 rounded-lg border p-4">
      <p className="font-medium">How was this workout?</p>
      <input type="hidden" name="intent" value="rate-workout" />
      <input type="hidden" name="scheduledId" value={scheduledId} />
      <input type="hidden" name="rating" value={rating || ""} />

      <div className="flex gap-1" role="radiogroup" aria-label="Workout rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            type="button"
            key={n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            aria-pressed={rating === n}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(n)}
            className="p-1"
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                (hover || rating) >= n ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
              }`}
            />
          </button>
        ))}
      </div>

      <textarea
        name="ratingComment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Optional note — how did it feel?"
        rows={2}
        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
        aria-label="Optional rating note"
      />

      <Button type="submit" disabled={submitting || rating === 0}>
        {initialRating ? "Update rating" : "Save rating"}
      </Button>
    </fetcher.Form>
  );
}
