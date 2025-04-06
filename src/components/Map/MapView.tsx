
import React from 'react';
import PropertyMap from './PropertyMap';

// Mock property data - we're reusing the same property structures as in the PropertyCard component
const mockProperties = [
  {
    id: '1',
    title: 'Modern Apartment in Downtown',
    address: '123 Main Street',
    city: 'New York',
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
    title: 'Spacious Family House with Garden',
    address: '456 Oak Avenue',
    city: 'Los Angeles',
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
    title: 'Luxury Condo with Ocean View',
    address: '789 Beach Road',
    city: 'Miami',
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
    title: 'Cozy Studio in Historic District',
    address: '101 Vine Street',
    city: 'San Francisco',
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
    title: 'Renovated Brownstone Townhouse',
    address: '202 Park Avenue',
    city: 'Chicago',
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
    title: 'Development Land with Mountain View',
    address: '303 Highland Road',
    city: 'Denver',
    price: 350000,
    type: 'land',
    status: 'available',
    area: 1200,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1332&auto=format&fit=crop'
  }
];

const MapView: React.FC = () => {
  return <PropertyMap properties={mockProperties} />;
};

export default MapView;
