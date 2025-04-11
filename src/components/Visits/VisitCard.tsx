
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar, Clock, Home, User, MoreVertical, Check, X, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface VisitType {
  id: string;
  date: string;
  time: string;
  clientName: string;
  clientId: string;
  agentName: string;
  agentId: string;
  propertyTitle: string;
  propertyId: string;
  propertyAddress: string;
  status: 'scheduled' | 'completed' | 'canceled';
}

interface VisitCardProps {
  visit: VisitType;
  onStatusChange: (visitId: string, status: 'scheduled' | 'completed' | 'canceled') => void;
}

const VisitCard: React.FC<VisitCardProps> = ({ visit, onStatusChange }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'canceled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return '';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Agendada';
      case 'completed':
        return 'Concluída';
      case 'canceled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <Card className="overflow-hidden h-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-1">
              <Badge className={cn(getStatusClass(visit.status))}>
                {getStatusLabel(visit.status)}
              </Badge>
            </div>
            <h3 className="font-semibold">{visit.propertyTitle}</h3>
            <p className="text-sm text-muted-foreground">{visit.propertyAddress}</p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Ações</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {visit.status !== 'completed' && (
                <DropdownMenuItem onClick={() => onStatusChange(visit.id, 'completed')}>
                  <Check className="h-4 w-4 mr-2" />
                  Marcar como Concluída
                </DropdownMenuItem>
              )}
              {visit.status !== 'canceled' && (
                <DropdownMenuItem onClick={() => onStatusChange(visit.id, 'canceled')}>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar Visita
                </DropdownMenuItem>
              )}
              {visit.status !== 'scheduled' && (
                <DropdownMenuItem onClick={() => onStatusChange(visit.id, 'scheduled')}>
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Reagendar
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{visit.date}</span>
            </div>
            
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{visit.time}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{visit.clientName}</span>
            </div>
            
            <div className="flex items-center text-sm">
              <Home className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{visit.agentName}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitCard;
