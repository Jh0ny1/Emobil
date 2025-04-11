import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Bed, Bath, Maximize, Phone, Mail, Calendar, FileText, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { fetchPropertyById } from '@/services/propertyService';
import { useToast } from '@/hooks/use-toast';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => id ? fetchPropertyById(id) : Promise.reject('ID não informado'),
    enabled: !!id,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: 'Erro ao carregar imóvel',
        description: 'Não foi possível carregar os detalhes do imóvel.',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-4">Carregando...</h2>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-4">Imóvel não encontrado</h2>
        <Button asChild>
          <Link to="/properties">Voltar para Imóveis</Link>
        </Button>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponível';
      case 'sold':
        return 'Vendido';
      case 'pending':
        return 'Pendente';
      default:
        return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'house':
        return 'Casa';
      case 'apartment':
        return 'Apartamento';
      case 'condo':
        return 'Condomínio';
      case 'land':
        return 'Terreno';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" asChild className="mb-4">
          <Link to="/properties" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Imóveis
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative rounded-lg overflow-hidden h-80">
            <img 
              src={property.image} 
              alt={property.title} 
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-4 right-4 text-sm">
              {getStatusLabel(property.status)}
            </Badge>
          </div>

          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold">{property.title}</h1>
              <div className="text-2xl font-bold text-real-700">{formatPrice(property.price)}</div>
            </div>
            <p className="text-muted-foreground mt-1">{property.address}, {property.city}</p>
          </div>

          <div className="flex flex-wrap gap-6">
            {property.bedrooms !== undefined && (
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-muted-foreground" />
                <span>{property.bedrooms} Quartos</span>
              </div>
            )}
            {property.bathrooms !== undefined && (
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-muted-foreground" />
                <span>{property.bathrooms} Banheiros</span>
              </div>
            )}
            {property.area !== undefined && (
              <div className="flex items-center gap-2">
                <Maximize className="h-5 w-5 text-muted-foreground" />
                <span>{property.area} m²</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-muted-foreground" />
              <span>{getTypeLabel(property.type)}</span>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Descrição</h2>
              <p className="text-muted-foreground">
                Este impressionante {getTypeLabel(property.type).toLowerCase()} localizado em {property.city} 
                oferece um excelente espaço para moradia com seu layout bem projetado
                {property.bedrooms !== undefined && ` e ${property.bedrooms} quartos espaçosos`}
                {property.bathrooms !== undefined && ` com ${property.bathrooms} banheiros modernos`}.
                {property.area !== undefined && ` A propriedade possui uma área total de ${property.area} m²`}, 
                proporcionando amplo espaço para vida familiar e entretenimento.
                <br /><br />
                A localização privilegiada oferece fácil acesso a comércio, escolas e transporte público. 
                Agende uma visita hoje mesmo para conhecer esta propriedade excepcional.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Contato</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <p>(11) 98765-4321</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>contato@propvue.com.br</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <Button className="w-full">Agendar Visita</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Ações</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Agendar Visita
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Gerar Contrato
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
