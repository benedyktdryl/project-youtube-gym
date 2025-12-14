import { useMemo, useState } from 'react';
import { addDays, format, isSameDay, startOfWeek } from 'date-fns';
import { useFetcher } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Check as CheckIcon, Clock, Plus, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SerializedWorkoutDay, WorkoutDay } from '@/lib/types';

type CalendarViewProps = {
  workoutDays: SerializedWorkoutDay[];
};

export function CalendarView({ workoutDays }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const fetcher = useFetcher();

  const parsedWorkouts = useMemo<WorkoutDay[]>(
    () =>
      workoutDays.map((day) => ({
        ...day,
        date: new Date(day.date),
      })),
    [workoutDays]
  );

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const toggleWorkoutCompleted = (scheduledId?: string) => {
    if (!scheduledId) return;
    fetcher.submit(
      { workoutId: scheduledId, intent: 'toggle-complete' },
      { method: 'post' }
    );
  };

  const pendingId = fetcher.formData?.get('workoutId') as string | undefined;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Training Calendar</h2>
          <p className="text-muted-foreground">
            {format(startDate, 'MMMM d')} - {format(addDays(startDate, 6), 'MMMM d, yyyy')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentDate(addDays(currentDate, -7))}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setCurrentDate(addDays(currentDate, 7))}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-6">
        {weekDates.map((date, index) => {
          const day = parsedWorkouts.find((d) => isSameDay(new Date(d.date), date));
          const hasWorkout = day && day.videos.length > 0;
          const isPendingToggle = pendingId && day?.videos.some((video) => video.scheduledId === pendingId);

          return (
            <Card
              key={index}
              className={cn(
                'overflow-hidden transition-all duration-200 hover:shadow-md',
                hasWorkout ? 'border-primary/50 border-2' : 'border-muted',
                day?.isCompleted ? 'bg-green-50 dark:bg-green-950' : '',
                !hasWorkout ? 'border-dashed' : ''
              )}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold">{format(date, 'dd')}</div>
                    <div className="text-sm text-muted-foreground">{format(date, 'EEEE')}</div>
                  </div>
                  {hasWorkout && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        'h-8 w-8 rounded-full',
                        day?.isCompleted ? 'text-green-500' : 'text-muted-foreground'
                      )}
                      onClick={() => toggleWorkoutCompleted(day?.videos[0]?.scheduledId)}
                      disabled={isPendingToggle}
                    >
                      <CheckIcon
                        className={cn('h-6 w-6', day?.isCompleted ? 'fill-green-500' : '')}
                      />
                    </Button>
                  )}
                </div>

                <div className="space-y-3 min-h-[120px]">
                  {!hasWorkout ? (
                    <div className="h-full flex flex-col items-center justify-center text-center pt-4">
                      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                        <Plus className="h-3 w-3 mr-1" />
                        Add workout
                      </Button>
                    </div>
                  ) : (
                    day.videos.map((video) => (
                      <div
                        key={video.scheduledId ?? video.id}
                        className={cn(
                          'p-3 rounded-lg border bg-background/50',
                          day.isCompleted ? 'opacity-50' : ''
                        )}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Video className="h-2.5 w-2.5 mr-1" />
                          <span className="text-xs font-medium">{video.channelName}</span>
                          <span className="flex items-center text-xs text-muted-foreground ml-auto">
                            <Clock className="h-2.5 w-2.5 mr-1" />
                            {Math.floor(video.duration / 60)} min
                          </span>
                        </div>
                        <p className="text-sm font-medium line-clamp-2 leading-tight">
                          {video.title}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
