import { WelcomeCard } from '@/components/dashboard/welcome-card';
import { StatsCard } from '@/components/dashboard/stats-card';
import { ActivityChart } from '@/components/dashboard/activity-chart';
import { UpcomingWorkouts } from '@/components/dashboard/upcoming-workouts';
import { Calendar, CircleCheck as CheckCircle2, Dumbbell, Flame } from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <WelcomeCard />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Weekly Workouts" 
          value="4/5" 
          description="Completed this week" 
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          trend="up"
          trendValue="25%"
        />
        <StatsCard 
          title="Active Minutes" 
          value="138" 
          description="Total this week" 
          icon={<Flame className="h-4 w-4 text-muted-foreground" />}
          trend="up"
          trendValue="12%"
        />
        <StatsCard 
          title="Completed Workouts" 
          value="23" 
          description="Since joining" 
          icon={<CheckCircle2 className="h-4 w-4 text-muted-foreground" />}
        />
        <StatsCard 
          title="Most Trained" 
          value="Abs" 
          description="This month" 
          icon={<Dumbbell className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <ActivityChart />
        </div>
        <div className="lg:col-span-2">
          <UpcomingWorkouts />
        </div>
      </div>
    </div>
  );
}