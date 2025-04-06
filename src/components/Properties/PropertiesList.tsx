
import React, { useState } from 'react';
import PropertyCard, { PropertyType } from './PropertyCard';
import PropertyFilters from './PropertyFilters';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

// Mock property data
const mockProperties: PropertyType[] = [
  {
    id: '1',
    title: 'Apartamento Moderno no Centro',
    address: 'Rua Principal, 123',
    city: 'São Paulo',
    price: 750000,
    type: 'apartment',
    status: 'available',
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Casa Espaçosa com Jardim',
    address: 'Avenida dos Carvalhos, 456',
    city: 'Rio de Janeiro',
    price: 1250000,
    type: 'house',
    status: 'available',
    bedrooms: 4,
    bathrooms: 3,
    area: 210,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Condomínio de Luxo com Vista para o Mar',
    address: 'Rua da Praia, 789',
    city: 'Florianópolis',
    price: 980000,
    type: 'condo',
    status: 'sold',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Estúdio Aconchegante no Centro Histórico',
    address: 'Rua da Videira, 101',
    city: 'Salvador',
    price: 550000,
    type: 'apartment',
    status: 'pending',
    bedrooms: 1,
    bathrooms: 1,
    area: 65,
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=1171&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'Sobrado Renovado no Bairro Nobre',
    address: 'Avenida do Parque, 202',
    city: 'Curitiba',
    price: 895000,
    type: 'house',
    status: 'available',
    bedrooms: 3,
    bathrooms: 2.5,
    area: 180,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1170&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'Terreno com Vista para a Montanha',
    address: 'Estrada das Serras, 303',
    city: 'Belo Horizonte',
    price: 350000,
    type: 'land',
    status: 'available',
    area: 1200,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1332&auto=format&fit=crop'
  }
];

const PropertiesList: React.FC = () => {
  const [properties, setProperties] = useState<PropertyType[]>(mockProperties);
  
  const handleFilterChange = (filters: any) => {
    let filteredProperties = [...mockProperties];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProperties = filteredProperties.filter(property => 
        property.title.toLowerCase().includes(searchLower) ||
        property.address.toLowerCase().includes(searchLower) ||
        property.city.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.status) {
      filteredProperties = filteredProperties.filter(property => 
        property.status === filters.status
      );
    }
    
    if (filters.type) {
      filteredProperties = filteredProperties.filter(property => 
        property.type === filters.type
      );
    }
    
    if (filters.city) {
      filteredProperties = filteredProperties.filter(property => 
        property.city === filters.city
      );
    }
    
    if (filters.minPrice) {
      filteredProperties = filteredProperties.filter(property => 
        property.price >= parseInt(filters.minPrice)
      );
    }
    
    if (filters.maxPrice) {
      filteredProperties = filteredProperties.filter(property => 
        property.price <= parseInt(filters.maxPrice)
      );
    }
    
    setProperties(filteredProperties);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Imóveis</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Imóvel
        </Button>
      </div>
      
      <PropertyFilters onFilterChange={handleFilterChange} />
      
      {properties.length > 0 ? (
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
