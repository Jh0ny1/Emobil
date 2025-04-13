
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

export type VisitType = {
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
  notes?: string;
};

type VisitCardProps = {
  visit: VisitType;
  onStatusChange: (visitId: string, newStatus: 'scheduled' | 'completed' | 'canceled') => void;
};

const VisitCard: React.FC<VisitCardProps> = ({ visit, onStatusChange }) => {
  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    completed: 'bg-green-100 text-green-800 hover:bg-green-200',
    canceled: 'bg-red-100 text-red-800 hover:bg-red-200',
  };

  const statusLabels = {
    scheduled: 'Agendada',
    completed: 'Concluída',
    canceled: 'Cancelada',
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start">
        <div>
          <Badge className={statusColors[visit.status]}>
            {statusLabels[visit.status]}
          </Badge>
          <h3 className="font-semibold text-lg mt-2 line-clamp-1">{visit.propertyTitle}</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Mais opções</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {visit.status !== 'completed' && (
              <DropdownMenuItem
                onClick={() => onStatusChange(visit.id, 'completed')}
              >
                Marcar como concluída
              </DropdownMenuItem>
            )}
            {visit.status !== 'scheduled' && (
              <DropdownMenuItem
                onClick={() => onStatusChange(visit.id, 'scheduled')}
              >
                Marcar como agendada
              </DropdownMenuItem>
            )}
            {visit.status !== 'canceled' && (
              <DropdownMenuItem
                onClick={() => onStatusChange(visit.id, 'canceled')}
              >
                Cancelar visita
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <span className="text-sm text-muted-foreground">
            {visit.propertyAddress}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{visit.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{visit.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            Cliente: <span className="font-medium">{visit.clientName}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            Corretor: <span className="font-medium">{visit.agentName}</span>
          </span>
        </div>
        {visit.notes && (
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-1">Observações:</h4>
            <p className="text-sm text-muted-foreground">{visit.notes}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full gap-2" size="sm">
          <Icons.property className="h-4 w-4" />
          Ver detalhes do imóvel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VisitCard;
