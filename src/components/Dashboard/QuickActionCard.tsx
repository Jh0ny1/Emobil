
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface Action {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface QuickActionCardProps {
  title: string;
  description?: string;
  actions: Action[];
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ title, description, actions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={action.onClick}
              >
                <Icon className="h-4 w-4" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionCard;
