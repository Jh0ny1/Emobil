
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, trend, className }) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {change && (
              <div className="flex items-center mt-1 text-sm">
                <span 
                  className={cn(
                    "inline-flex items-center",
                    change.trend === 'up' && "text-green-600", 
                    change.trend === 'down' && "text-red-600",
                    change.trend === 'neutral' && "text-muted-foreground"
                  )}
                >
                  {change.trend === 'up' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m18 15-6-6-6 6"/></svg>
                  )}
                  {change.trend === 'down' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m6 9 6 6 6-6"/></svg>
                  )}
                  {change.value}%
                </span>
                {trend && <span className="ml-1 text-muted-foreground">vs {trend}</span>}
              </div>
            )}
          </div>
          
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
