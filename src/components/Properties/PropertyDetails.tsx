
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bed, Bath, Maximize, Phone, Mail, Calendar, FileText, Home, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPropertyById, deleteProperty } from '@/services/propertyService';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ClientType } from '../Clients/ClientCard';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [clients, setClients] = useState<ClientType[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  
  // Fetch clients from localStorage
  useEffect(() => {
    const savedClients = localStorage.getItem('clients');
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }
  }, []);
  
  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => id ? fetchPropertyById(id) : Promise.reject('ID não informado'),
    enabled: !!id,
  });

  const deletePropertyMutation = useMutation({
    mutationFn: (id: string) => deleteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: "Imóvel removido",
        description: "O imóvel foi removido com sucesso.",
      });
      navigate('/properties');
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
    if (id) {
      deletePropertyMutation.mutate(id);
    }
  };

  const handleScheduleVisit = () => {
    if (!selectedClient) {
      toast({
        title: "Erro ao agendar visita",
        description: "Selecione um cliente para agendar a visita.",
        variant: "destructive"
      });
      return;
    }

    if (!property) return;

    // Get existing visits
    const savedVisits = localStorage.getItem('visits') || '[]';
    const visits = JSON.parse(savedVisits);
    
    // Find the selected client
    const client = clients.find(c => c.id === selectedClient);
    if (!client) return;

    // Create new visit
    const newVisit = {
      id: Date.now().toString(),
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      status: 'scheduled',
      notes: '',
      client: {
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone
      },
      property: {
        id: property.id,
        title: property.title,
        address: property.address,
        image: property.image
      }
    };

    // Update client's scheduled visits count
    const updatedClients = clients.map(c => {
      if (c.id === client.id) {
        return { ...c, scheduledVisits: c.scheduledVisits + 1 };
      }
      return c;
    });
    localStorage.setItem('clients', JSON.stringify(updatedClients));

    // Save the updated visits
    const updatedVisits = [...visits, newVisit];
    localStorage.setItem('visits', JSON.stringify(updatedVisits));

    toast({
      title: "Visita agendada",
      description: `Visita agendada com sucesso para ${client.name}.`,
    });

    setSelectedClient('');
  };

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
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="mb-4 gap-2">
              <Trash className="h-4 w-4" />
              Excluir Imóvel
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
              {property.status === 'available' ? 'Disponível' : 
               property.status === 'sold' ? 'Vendido' : 
               property.status === 'pending' ? 'Pendente' : property.status}
            </Badge>
          </div>

          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold">{property.title}</h1>
              <div className="text-2xl font-bold text-real-700">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(property.price)}
              </div>
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
              <span>
                {property.type === 'house' ? 'Casa' : 
                 property.type === 'apartment' ? 'Apartamento' : 
                 property.type === 'condo' ? 'Condomínio' : 
                 property.type === 'land' ? 'Terreno' : property.type}
              </span>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Descrição</h2>
              <p className="text-muted-foreground">
                Este impressionante {
                  property.type === 'house' ? 'casa' : 
                  property.type === 'apartment' ? 'apartamento' : 
                  property.type === 'condo' ? 'condomínio' : 
                  property.type === 'land' ? 'terreno' : property.type
                } localizado em {property.city} 
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
                    <p>contato@emobil.com.br</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">Agendar Visita</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agendar Visita</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="client">Selecione o Cliente</Label>
                        <Select value={selectedClient} onValueChange={setSelectedClient}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um cliente" />
                          </SelectTrigger>
                          <SelectContent>
                            {clients.map(client => (
                              <SelectItem key={client.id} value={client.id}>
                                {client.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSelectedClient('')}>Cancelar</Button>
                      <Button onClick={handleScheduleVisit}>Agendar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Ações</h2>
              <div className="space-y-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Agendar Visita
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agendar Visita</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="client">Selecione o Cliente</Label>
                        <Select value={selectedClient} onValueChange={setSelectedClient}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um cliente" />
                          </SelectTrigger>
                          <SelectContent>
                            {clients.map(client => (
                              <SelectItem key={client.id} value={client.id}>
                                {client.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setSelectedClient('')}>Cancelar</Button>
                      <Button onClick={handleScheduleVisit}>Agendar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Gerar Contrato
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full flex items-center gap-2 text-destructive border-destructive hover:bg-destructive/10">
                      <Trash className="h-4 w-4" />
                      Excluir Imóvel
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
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
