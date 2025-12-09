import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export function WelcomeCard() {
  const { user } = useAuth();
  
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  return (
    <Card className="overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">
          Good {getTimeOfDay()}, {user?.name?.split(' ')[0] || 'there'}!
        </CardTitle>
        <CardDescription>
          Ready to create your personalized workout plan?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Let our AI assistant help you build a workout routine that fits your goals, equipment, and schedule.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/chat">
              <MessageSquare className="mr-2 h-4 w-4" />
              Start planning
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/videos">
              Browse videos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}