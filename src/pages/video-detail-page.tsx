import { Link, useLoaderData } from 'react-router';
import { VideoPlayer } from '@/components/videos/video-player';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { WorkoutVideo } from '@/lib/types';

export function VideoDetailPage() {
  const { video } = useLoaderData<{ video: WorkoutVideo }>();

  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold mb-4">Video not found</h1>
        <p className="text-muted-foreground mb-6">
          The video you're looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/videos">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to videos
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link to="/videos">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-bold truncate">Video Details</h1>
      </div>
      
      <VideoPlayer video={video} />
    </div>
  );
}
