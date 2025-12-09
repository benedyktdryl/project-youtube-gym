import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WorkoutVideo } from '@/lib/types';
import { 
  Clock, 
  Play, 
  Plus, 
  Dumbbell, 
  Bookmark 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

interface VideoCardProps {
  video: WorkoutVideo;
}

export function VideoCard({ video }: VideoCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Removed from saved videos" : "Added to saved videos");
  };

  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success("Added to calendar");
  };

  return (
    <Card className="overflow-hidden group h-full flex flex-col hover:shadow-md transition-all">
      <Link to={`/videos/${video.id}`} className="block h-full">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={video.thumbnailUrl} 
            alt={video.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Button size="icon" variant="secondary" className="rounded-full">
              <Play className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
          </div>
        </div>
        <CardContent className="p-4 flex-grow">
          <div className="flex items-start gap-3 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={video.channelThumbnail} alt={video.channelName} />
              <AvatarFallback>{video.channelName[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-semibold line-clamp-2 leading-tight">{video.title}</h3>
              <p className="text-xs text-muted-foreground">{video.channelName}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {video.muscleGroups.map((group) => (
              <Badge key={group} variant="secondary" className="text-xs">
                {group}
              </Badge>
            ))}
            <Badge 
              variant="outline" 
              className={`text-xs ${
                video.intensity === 'high' 
                  ? 'border-red-200 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300' 
                  : video.intensity === 'medium' 
                    ? 'border-orange-200 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300' 
                    : 'border-green-200 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
              }`}
            >
              {video.intensity} intensity
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t flex justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <Dumbbell className="h-3 w-3 mr-1" />
            {video.equipmentNeeded.length > 0 
              ? video.equipmentNeeded.join(', ') 
              : 'No equipment'}
          </div>
          <div className="flex gap-1">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-7 w-7 rounded-full"
              onClick={handleSave}
            >
              <Bookmark 
                className={`h-4 w-4 ${isSaved ? 'fill-primary' : ''}`} 
              />
              <span className="sr-only">Save</span>
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-7 w-7 rounded-full"
              onClick={handleAddToCalendar}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add to calendar</span>
            </Button>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}