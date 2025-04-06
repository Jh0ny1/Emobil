
import React from 'react';
import PropertyMap from './PropertyMap';
import { PropertyType } from '../Properties/PropertyCard';

// Dados de propriedades mockados - usando as mesmas estruturas que no componente PropertyCard
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

const MapView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Mapa de Imóveis</h1>
      </div>
      <div className="h-[calc(100vh-200px)] w-full bg-gray-100 rounded-lg overflow-hidden border">
        <PropertyMap properties={mockProperties} />
      </div>
    </div>
  );
};

export default MapView;
