
import React, { useState, useEffect } from 'react';
import VisitCard, { VisitType } from './VisitCard';
import ScheduleVisitForm from './ScheduleVisitForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Calendar, Filter, X } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

// Mock visits data
const mockVisits: VisitType[] = [
  {
    id: '1',
    date: '7 de Abril, 2025',
    time: '10:00',
    clientName: 'John Smith',
    clientId: '1',
    agentName: 'Sarah Johnson',
    agentId: '1',
    propertyTitle: 'Apartamento Moderno no Centro',
    propertyId: '1',
    propertyAddress: 'Rua Principal, 123, São Paulo',
    status: 'scheduled'
  },
  {
    id: '2',
    date: '8 de Abril, 2025',
    time: '14:30',
    clientName: 'Emily Johnson',
    clientId: '2',
    agentName: 'Michael Brown',
    agentId: '2',
    propertyTitle: 'Casa Familiar Espaçosa com Jardim',
    propertyId: '2',
    propertyAddress: 'Avenida Carvalho, 456, Rio de Janeiro',
    status: 'scheduled'
  },
  {
    id: '3',
    date: '6 de Abril, 2025',
    time: '11:15',
    clientName: 'Michael Brown',
    clientId: '3',
    agentName: 'Jessica Davis',
    agentId: '3',
    propertyTitle: 'Condomínio de Luxo com Vista para o Mar',
    propertyId: '3',
    propertyAddress: 'Rua da Praia, 789, Salvador',
    status: 'completed'
  },
  {
    id: '4',
    date: '9 de Abril, 2025',
    time: '16:00',
    clientName: 'Jessica Davis',
    clientId: '4',
    agentName: 'David Wilson',
    agentId: '4',
    propertyTitle: 'Estúdio Aconchegante em Bairro Histórico',
    propertyId: '4',
    propertyAddress: 'Rua das Flores, 101, Belo Horizonte',
    status: 'scheduled'
  },
  {
    id: '5',
    date: '5 de Abril, 2025',
    time: '13:45',
    clientName: 'David Wilson',
    clientId: '5',
    agentName: 'Sarah Martinez',
    agentId: '5',
    propertyTitle: 'Casa Geminada Renovada',
    propertyId: '5',
    propertyAddress: 'Avenida do Parque, 202, Curitiba',
    status: 'canceled'
  }
];

const VisitsList: React.FC = () => {
  const [allVisits, setAllVisits] = useState<VisitType[]>([]);
  const [visits, setVisits] = useState<VisitType[]>([]);
  const [filters, setFilters] = useState<{
    search?: string;
    status?: string;
    date?: string;
  }>({});
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const { toast } = useToast();

  // Carregar as visitas do localStorage e combiná-las com as mockVisits
  useEffect(() => {
    const storedVisits = localStorage.getItem('mockVisits');
    let combinedVisits = [...mockVisits];
    
    if (storedVisits) {
      const parsedVisits = JSON.parse(storedVisits);
      // Combinar as visitas armazenadas com as mockVisits, evitando duplicatas por ID
      const existingIds = new Set(mockVisits.map(visit => visit.id));
      const newVisits = parsedVisits.filter((visit: VisitType) => !existingIds.has(visit.id));
      combinedVisits = [...mockVisits, ...newVisits];
    }
    
    setAllVisits(combinedVisits);
    setVisits(combinedVisits);
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    
    // Se o valor estiver vazio, remova a chave do objeto de filtros
    if (value === '') {
      delete newFilters[key as keyof typeof newFilters];
    }
    
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('search', e.target.value);
  };

  const applyFilters = (currentFilters: any) => {
    let filteredVisits = [...allVisits];
    
    if (currentFilters.search) {
      const searchLower = currentFilters.search.toLowerCase();
      filteredVisits = filteredVisits.filter(visit => 
        visit.clientName.toLowerCase().includes(searchLower) ||
        visit.agentName.toLowerCase().includes(searchLower) ||
        visit.propertyTitle.toLowerCase().includes(searchLower) ||
        visit.propertyAddress.toLowerCase().includes(searchLower)
      );
    }
    
    if (currentFilters.status && currentFilters.status !== 'all') {
      filteredVisits = filteredVisits.filter(visit => 
        visit.status === currentFilters.status
      );
    }
    
    if (currentFilters.date && currentFilters.date !== '') {
      // Convertendo a data do filtro para um formato mais fácil de comparar
      const filterDate = new Date(currentFilters.date);
      const filterDateStr = filterDate.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      // Filtrando por data
      filteredVisits = filteredVisits.filter(visit => {
        // Como estamos usando strings para datas no mock, vamos fazer uma comparação simplificada
        return visit.date.includes(filterDateStr) || 
               visit.date.includes(format(filterDate, 'dd/MM/yyyy')) ||
               visit.date.includes(format(filterDate, "d 'de' MMMM, yyyy"));
      });
    }
    
    setVisits(filteredVisits);
  };

  const resetFilters = () => {
    setFilters({});
    setVisits(allVisits);
  };

  const handleStatusChange = (visitId: string, newStatus: 'scheduled' | 'completed' | 'canceled') => {
    // Update visits in the current state
    const updatedVisits = visits.map(visit => 
      visit.id === visitId ? { ...visit, status: newStatus } : visit
    );
    setVisits(updatedVisits);
    
    // Update allVisits state
    const updatedAllVisits = allVisits.map(visit => 
      visit.id === visitId ? { ...visit, status: newStatus } : visit
    );
    setAllVisits(updatedAllVisits);
    
    // Update localStorage if the visit is from there
    const storedVisits = localStorage.getItem('mockVisits');
    if (storedVisits) {
      const parsedVisits = JSON.parse(storedVisits);
      const updatedStoredVisits = parsedVisits.map((visit: VisitType) => 
        visit.id === visitId ? { ...visit, status: newStatus } : visit
      );
      localStorage.setItem('mockVisits', JSON.stringify(updatedStoredVisits));
    }
  };

  const handleDeleteVisit = (visitId: string) => {
    // Remove visit from current state
    const updatedVisits = visits.filter(visit => visit.id !== visitId);
    setVisits(updatedVisits);
    
    // Remove visit from allVisits state
    const updatedAllVisits = allVisits.filter(visit => visit.id !== visitId);
    setAllVisits(updatedAllVisits);
    
    // Update localStorage
    const storedVisits = localStorage.getItem('mockVisits');
    if (storedVisits) {
      const parsedVisits = JSON.parse(storedVisits);
      const updatedStoredVisits = parsedVisits.filter((visit: VisitType) => visit.id !== visitId);
      localStorage.setItem('mockVisits', JSON.stringify(updatedStoredVisits));
    }
    
    // Show success toast
    toast({
      title: "Visita excluída",
      description: "A visita foi excluída com sucesso.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Visitas</h1>
        <div className="flex flex-wrap gap-2">
          <ScheduleVisitForm />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar visitas..."
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
            Filtros {isFiltersVisible ? 'ocultar' : 'mostrar'}
          </Button>
          
          {Object.keys(filters).length > 0 && (
            <Button 
              variant="ghost" 
              className="gap-2" 
              onClick={resetFilters}
            >
              <X className="h-4 w-4" />
              Limpar
            </Button>
          )}
        </div>
      </div>
      
      {isFiltersVisible && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 bg-muted/20 p-4 rounded-md">
          <Select 
            value={filters.status || ''} 
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="scheduled">Agendada</SelectItem>
              <SelectItem value="completed">Concluída</SelectItem>
              <SelectItem value="canceled">Cancelada</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
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
              onDeleteVisit={handleDeleteVisit}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">Nenhuma visita encontrada</h3>
          <p className="text-muted-foreground mt-1">Tente ajustar seus filtros ou critérios de busca</p>
        </div>
      )}
    </div>
  );
};

export default VisitsList;
