
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, MoreVertical, Trash } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import DeleteClientDialog from './DeleteClientDialog';

export interface ClientType {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  viewedProperties: number;
  scheduledVisits: number;
  image?: string;
  document?: string;
  address?: string;
}

interface ClientCardProps {
  client: ClientType;
  onDelete: (id: string) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, onDelete }) => {
  const { toast } = useToast();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Criamos uma função que vai servir de wrapper para a função de exclusão
  const handleDeleteClient = () => {
    try {
      // Chamamos a função de exclusão passada como prop
      onDelete(client.id);
      
      // Exibimos o toast de sucesso após a exclusão bem-sucedida
      toast({
        title: "Cliente removido",
        description: `${client.name} foi removido com sucesso.`,
      });
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      toast({
        title: "Erro ao remover cliente",
        description: "Ocorreu um erro ao tentar remover o cliente. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-6 flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* Usando componente de diálogo fora da DropdownMenuItem para evitar problemas de evento */}
              <DeleteClientDialog 
                client={client} 
                onDelete={handleDeleteClient}
                trigger={
                  <button className="w-full flex items-center px-2 py-1.5 text-sm text-destructive hover:bg-accent cursor-pointer">
                    <Trash className="h-4 w-4 mr-2" />
                    Excluir
                  </button>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
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
            <span className="text-xs text-muted-foreground">Imóveis Vistos</span>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-md text-center">
            <span className="block text-lg font-medium">{client.scheduledVisits}</span>
            <span className="text-xs text-muted-foreground">Visitas Agendadas</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientCard;
