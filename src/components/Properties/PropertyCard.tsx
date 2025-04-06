
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Maximize, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

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
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
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
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          
          {property.bathrooms !== undefined && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{property.bathrooms} Baths</span>
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
      
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button asChild className="w-full gap-2">
          <Link to={`/properties/${property.id}`}>
            <Eye className="h-4 w-4" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
