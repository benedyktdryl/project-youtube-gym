import { CalendarView } from '@/components/calendar/calendar-view';

export function CalendarPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Calendar</h1>
      
      <p className="text-muted-foreground">
        View and manage your workout schedule. Mark completed workouts and stay on track with your fitness goals.
      </p>
      
      <CalendarView />
    </div>
  );
}