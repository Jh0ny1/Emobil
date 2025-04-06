
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Eye, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface ClientType {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  viewedProperties: number;
  scheduledVisits: number;
  image?: string;
}

interface ClientCardProps {
  client: ClientType;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-6 flex-1">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={client.image} alt={client.name} />
            <AvatarFallback>{getInitials(client.name)}</AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="font-semibold text-lg">{client.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{client.city}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{client.phone}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="truncate">{client.email}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-muted/50 p-3 rounded-md text-center">
            <span className="block text-lg font-medium">{client.viewedProperties}</span>
            <span className="text-xs text-muted-foreground">Viewed Properties</span>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-md text-center">
            <span className="block text-lg font-medium">{client.scheduledVisits}</span>
            <span className="text-xs text-muted-foreground">Scheduled Visits</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4">
        <Button asChild className="w-full gap-2">
          <Link to={`/clients/${client.id}`}>
            <Eye className="h-4 w-4" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClientCard;
