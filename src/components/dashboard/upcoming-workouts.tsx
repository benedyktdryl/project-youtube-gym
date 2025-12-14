import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, Clock, Video, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import type { SerializedWorkoutDay } from '@/lib/types';

type UpcomingWorkoutsProps = {
  workouts: SerializedWorkoutDay[];
};

export function UpcomingWorkouts({ workouts }: UpcomingWorkoutsProps) {
  const upcomingWorkouts = workouts
    .map((day) => ({ ...day, date: new Date(day.date) }))
    .filter((day) => !day.isCompleted && day.videos.length > 0)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  if (upcomingWorkouts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Workouts</CardTitle>
          <CardDescription>Your scheduled workouts for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">You have no upcoming workouts scheduled.</p>
            <Button asChild>
              <Link to="/chat">Plan a workout</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Workouts</CardTitle>
        <CardDescription>Your scheduled workouts for the week</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-4">
          {upcomingWorkouts.map((day) => (
            <div key={day.id} className="px-6 py-2 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">
                    {format(day.date, 'EEEE, MMM d')}
                  </span>
                </div>
                <Badge variant="outline" className="ml-2">
                  {day.videos.length} {day.videos.length === 1 ? 'video' : 'videos'}
                </Badge>
              </div>
              <div className="space-y-3">
                {day.videos.map((video) => (
                  <div 
                    key={video.id} 
                    className="flex items-center gap-3 ml-6 text-sm text-muted-foreground"
                  >
                    <Video className="h-3 w-3" />
                    <span className="flex-1 truncate">{video.title}</span>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{Math.floor(video.duration / 60)} min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button variant="ghost" size="sm" className="ml-auto" asChild>
          <Link to="/calendar">
            View calendar <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
