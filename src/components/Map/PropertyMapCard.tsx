
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PropertyType } from '../Properties/PropertyCard';
import { cn } from '@/lib/utils';

interface PropertyMapCardProps {
  property: PropertyType;
  onClose: () => void;
}

const PropertyMapCard: React.FC<PropertyMapCardProps> = ({ property, onClose }) => {
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
    <Card className="overflow-hidden shadow-lg">
      <div className="relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 z-10 h-8 w-8 bg-white/80 hover:bg-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-32 object-cover"
        />
        <Badge 
          className={cn(
            "absolute top-2 left-2",
            getStatusClass(property.status)
          )}
        >
          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-base line-clamp-1">{property.title}</h3>
          <span className="font-bold text-real-700 text-sm">{formatPrice(property.price)}</span>
        </div>
        
        <div className="flex items-center text-muted-foreground text-xs mb-3">
          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{property.address}, {property.city}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-xs mb-3">
          {property.bedrooms !== undefined && (
            <div className="flex items-center">
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          
          {property.bathrooms !== undefined && (
            <div className="flex items-center">
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
          
          {property.area !== undefined && (
            <div className="flex items-center">
              <span>{property.area} m²</span>
            </div>
          )}
        </div>
        
        <Button asChild size="sm" className="w-full gap-1">
          <Link to={`/properties/${property.id}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertyMapCard;
