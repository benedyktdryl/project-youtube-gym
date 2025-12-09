import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  trendValue,
  className 
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center">
            {trend && (
              <span className={cn(
                "mr-1 flex items-center",
                trend === 'up' && "text-emerald-500",
                trend === 'down' && "text-red-500"
              )}>
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
                {trendValue && <span className="ml-1">{trendValue}</span>}
              </span>
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}