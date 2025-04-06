
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter, X } from 'lucide-react';

interface FilterValues {
  status?: string;
  type?: string;
  city?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
}

interface PropertyFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState<FilterValues>({});
  const [isFiltersVisible, setIsFiltersVisible] = React.useState(false);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('search', e.target.value);
  };

  const resetFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setIsFiltersVisible(!isFiltersVisible)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          
          {Object.keys(filters).length > 0 && (
            <Button 
              variant="ghost" 
              className="gap-2" 
              onClick={resetFilters}
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>
      
      {isFiltersVisible && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <Select 
            value={filters.status || ''} 
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.type || ''} 
            onValueChange={(value) => handleFilterChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.city || ''} 
            onValueChange={(value) => handleFilterChange('city', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Cities</SelectItem>
              <SelectItem value="New York">New York</SelectItem>
              <SelectItem value="Los Angeles">Los Angeles</SelectItem>
              <SelectItem value="Chicago">Chicago</SelectItem>
              <SelectItem value="San Francisco">San Francisco</SelectItem>
              <SelectItem value="Miami">Miami</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
