
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Maximize, Eye, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { deleteProperty } from '@/services/propertyService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface PropertyType {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  type: 'house' | 'apartment' | 'condo' | 'land';
  status: 'available' | 'sold' | 'pending';
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  image: string;
}

interface PropertyCardProps {
  property: PropertyType;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'status-available';
      case 'sold':
        return 'status-sold';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  };

  const deletePropertyMutation = useMutation({
    mutationFn: (id: string) => deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: "Imóvel removido",
        description: "O imóvel foi removido com sucesso.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao remover imóvel",
        description: error.message || "Ocorreu um erro ao remover o imóvel.",
        variant: "destructive"
      });
    }
  });

  const handleDelete = () => {
    deletePropertyMutation.mutate(property.id);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <Badge 
          className={cn(
            "absolute top-2 right-2",
            getStatusClass(property.status)
          )}
        >
          {property.status === 'available' ? 'Disponível' : 
           property.status === 'sold' ? 'Vendido' : 
           property.status === 'pending' ? 'Pendente' : property.status}
        </Badge>
      </div>
      
      <CardContent className="p-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
          <span className="font-bold text-real-700">{formatPrice(property.price)}</span>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span className="line-clamp-1">{property.address}, {property.city}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-sm">
          {property.bedrooms !== undefined && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{property.bedrooms} Quartos</span>
            </div>
          )}
          
          {property.bathrooms !== undefined && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{property.bathrooms} Banheiros</span>
            </div>
          )}
          
          {property.area !== undefined && (
            <div className="flex items-center">
              <Maximize className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{property.area} m²</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 mt-auto flex flex-col gap-2">
        <Button asChild className="w-full gap-2">
          <Link to={`/properties/${property.id}`}>
            <Eye className="h-4 w-4" />
            Ver Detalhes
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full gap-2 text-destructive border-destructive hover:bg-destructive/10">
              <Trash className="h-4 w-4" />
              Excluir
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o imóvel {property.title}? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete} 
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                <Trash className="h-4 w-4 mr-2" />
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
