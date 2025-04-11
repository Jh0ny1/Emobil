
import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PropertyCard, { PropertyType } from './PropertyCard';
import PropertyFilters from './PropertyFilters';
import { Button } from '@/components/ui/button';
import { Plus, Upload, X, Image } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { fetchProperties, addProperty, uploadPropertyImage } from '@/services/propertyService';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PropertyFormValues {
  title: string;
  address: string;
  city: string;
  price: number;
  type: 'house' | 'apartment' | 'condo' | 'land';
  status: 'available' | 'sold' | 'pending';
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
}

const PropertiesList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });
  
  const addPropertyMutation = useMutation({
    mutationFn: async (data: PropertyFormValues) => {
      if (!user) throw new Error('Usuário não autenticado');
      
      let imageUrl = '';
      
      if (imageFile) {
        imageUrl = await uploadPropertyImage(imageFile);
      }
      
      return addProperty({
        ...data,
        image: imageUrl || data.image,
        user_id: user.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      setOpen(false);
      resetForm();
      
      toast({
        title: "Imóvel adicionado",
        description: "O imóvel foi adicionado com sucesso."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao adicionar imóvel",
        description: error.message || "Ocorreu um erro ao adicionar o imóvel.",
        variant: "destructive"
      });
    }
  });
  
  const form = useForm<PropertyFormValues>({
    defaultValues: {
      title: '',
      address: '',
      city: '',
      price: 0,
      type: 'apartment',
      status: 'available',
      bedrooms: 1,
      bathrooms: 1,
      area: 0,
      image: ''
    }
  });
  
  const handleFilterChange = (filters: any) => {
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Erro no upload",
          description: "O arquivo selecionado não é uma imagem.",
          variant: "destructive"
        });
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setImageFile(file);
      form.setValue('image', imageUrl);
    }
  };

  const clearImageUpload = () => {
    setPreviewImage(null);
    setImageFile(null);
    form.setValue('image', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = (data: PropertyFormValues) => {
    if (!user) {
      toast({
        title: "Erro ao adicionar imóvel",
        description: "Você precisa estar logado para adicionar um imóvel.",
        variant: "destructive"
      });
      return;
    }
    
    if (!data.image && !imageFile) {
      toast({
        title: "Erro ao adicionar imóvel",
        description: "Por favor, adicione uma imagem do imóvel.",
        variant: "destructive"
      });
      return;
    }

    addPropertyMutation.mutate(data);
  };

  const resetForm = () => {
    form.reset();
    setPreviewImage(null);
    setImageFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Imóveis</h1>
        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Imóvel
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Imóvel</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh]">
              <div className="p-1">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título</FormLabel>
                          <FormControl>
                            <Input placeholder="Título do imóvel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço</FormLabel>
                          <FormControl>
                            <Input placeholder="Endereço" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input placeholder="Cidade" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Preço" 
                              {...field} 
                              onChange={e => field.onChange(Number(e.target.value))} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="apartment">Apartamento</SelectItem>
                                <SelectItem value="house">Casa</SelectItem>
                                <SelectItem value="condo">Condomínio</SelectItem>
                                <SelectItem value="land">Terreno</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="available">Disponível</SelectItem>
                                <SelectItem value="sold">Vendido</SelectItem>
                                <SelectItem value="pending">Pendente</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="bedrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quartos</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min={0}
                                {...field} 
                                onChange={e => field.onChange(Number(e.target.value))} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="bathrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Banheiros</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min={0}
                                step={0.5}
                                {...field} 
                                onChange={e => field.onChange(Number(e.target.value))} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Área (m²)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min={0}
                                {...field} 
                                onChange={e => field.onChange(Number(e.target.value))} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel>Imagem do Imóvel</FormLabel>
                          <FormControl>
                            <div className="grid gap-4">
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                id="property-image"
                              />
                              {!previewImage ? (
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="h-40 flex flex-col items-center justify-center gap-2 border-dashed"
                                  onClick={() => fileInputRef.current?.click()}
                                >
                                  <Image className="h-10 w-10 text-muted-foreground" />
                                  <span>Clique para adicionar imagem</span>
                                </Button>
                              ) : (
                                <div className="relative h-40">
                                  <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="h-full w-full object-cover rounded-md"
                                  />
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2"
                                    onClick={clearImageUpload}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                              <input
                                type="hidden"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter className="pt-4">
                      <Button 
                        type="submit" 
                        disabled={addPropertyMutation.isPending}
                      >
                        {addPropertyMutation.isPending ? 'Adicionando...' : 'Adicionar'}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      
      <PropertyFilters onFilterChange={handleFilterChange} />
      
      {isLoading ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">Carregando imóveis...</h3>
        </div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">Nenhum imóvel encontrado</h3>
          <p className="text-muted-foreground mt-1">Tente ajustar seus filtros ou critérios de busca</p>
        </div>
      )}
    </div>
  );
};

export default PropertiesList;
