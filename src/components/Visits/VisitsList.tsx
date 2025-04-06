
import React, { useState } from 'react';
import VisitCard, { VisitType } from './VisitCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Calendar, Filter, X } from 'lucide-react';
import { format } from 'date-fns';

// Mock visits data
const mockVisits: VisitType[] = [
  {
    id: '1',
    date: 'April 7, 2025',
    time: '10:00 AM',
    clientName: 'John Smith',
    clientId: '1',
    agentName: 'Sarah Johnson',
    agentId: '1',
    propertyTitle: 'Modern Apartment in Downtown',
    propertyId: '1',
    propertyAddress: '123 Main Street, New York',
    status: 'scheduled'
  },
  {
    id: '2',
    date: 'April 8, 2025',
    time: '2:30 PM',
    clientName: 'Emily Johnson',
    clientId: '2',
    agentName: 'Michael Brown',
    agentId: '2',
    propertyTitle: 'Spacious Family House with Garden',
    propertyId: '2',
    propertyAddress: '456 Oak Avenue, Los Angeles',
    status: 'scheduled'
  },
  {
    id: '3',
    date: 'April 6, 2025',
    time: '11:15 AM',
    clientName: 'Michael Brown',
    clientId: '3',
    agentName: 'Jessica Davis',
    agentId: '3',
    propertyTitle: 'Luxury Condo with Ocean View',
    propertyId: '3',
    propertyAddress: '789 Beach Road, Miami',
    status: 'completed'
  },
  {
    id: '4',
    date: 'April 9, 2025',
    time: '4:00 PM',
    clientName: 'Jessica Davis',
    clientId: '4',
    agentName: 'David Wilson',
    agentId: '4',
    propertyTitle: 'Cozy Studio in Historic District',
    propertyId: '4',
    propertyAddress: '101 Vine Street, San Francisco',
    status: 'scheduled'
  },
  {
    id: '5',
    date: 'April 5, 2025',
    time: '1:45 PM',
    clientName: 'David Wilson',
    clientId: '5',
    agentName: 'Sarah Martinez',
    agentId: '5',
    propertyTitle: 'Renovated Brownstone Townhouse',
    propertyId: '5',
    propertyAddress: '202 Park Avenue, Chicago',
    status: 'canceled'
  }
];

const VisitsList: React.FC = () => {
  const [visits, setVisits] = useState<VisitType[]>(mockVisits);
  const [filters, setFilters] = useState<{
    search?: string;
    status?: string;
    date?: string;
  }>({});
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const today = format(new Date(), 'yyyy-MM-dd');

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('search', e.target.value);
  };

  const applyFilters = (currentFilters: any) => {
    let filteredVisits = [...mockVisits];
    
    if (currentFilters.search) {
      const searchLower = currentFilters.search.toLowerCase();
      filteredVisits = filteredVisits.filter(visit => 
        visit.clientName.toLowerCase().includes(searchLower) ||
        visit.agentName.toLowerCase().includes(searchLower) ||
        visit.propertyTitle.toLowerCase().includes(searchLower) ||
        visit.propertyAddress.toLowerCase().includes(searchLower)
      );
    }
    
    if (currentFilters.status) {
      filteredVisits = filteredVisits.filter(visit => 
        visit.status === currentFilters.status
      );
    }
    
    if (currentFilters.date) {
      // Simple date filtering - in a real app would need proper date comparison
      filteredVisits = filteredVisits.filter(visit => 
        visit.date.includes(currentFilters.date)
      );
    }
    
    setVisits(filteredVisits);
  };

  const resetFilters = () => {
    setFilters({});
    setVisits(mockVisits);
  };

  const handleStatusChange = (visitId: string, newStatus: 'scheduled' | 'completed' | 'canceled') => {
    const updatedVisits = visits.map(visit => 
      visit.id === visitId ? { ...visit, status: newStatus } : visit
    );
    setVisits(updatedVisits);
    
    // Update the mock data as well to persist changes when filtering
    mockVisits.forEach(visit => {
      if (visit.id === visitId) {
        visit.status = newStatus;
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Visits</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Schedule Visit
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search visits..."
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Select 
            value={filters.status || ''} 
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={filters.date || ''}
              onChange={(e) => handleFilterChange('date', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      )}
      
      {visits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visits.map((visit) => (
            <VisitCard 
              key={visit.id} 
              visit={visit} 
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No visits found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
};

export default VisitsList;
