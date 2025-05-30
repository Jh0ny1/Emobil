
import React, { useState, useEffect } from 'react';
import ClientCard, { ClientType } from './ClientCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import AddClientForm from './AddClientForm';

const ClientsList: React.FC = () => {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Load clients from localStorage on component mount
  useEffect(() => {
    const savedClients = localStorage.getItem('clients');
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    } else {
      // Initialize with mock data if no saved clients
      const mockClients = [
        {
          id: '1',
          name: 'John Smith',
          email: 'john.smith@example.com',
          phone: '(555) 123-4567',
          city: 'New York',
          viewedProperties: 12,
          scheduledVisits: 4,
          image: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
          id: '2',
          name: 'Emily Johnson',
          email: 'emily.johnson@example.com',
          phone: '(555) 234-5678',
          city: 'Los Angeles',
          viewedProperties: 8,
          scheduledVisits: 2,
          image: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
          id: '3',
          name: 'Michael Brown',
          email: 'michael.brown@example.com',
          phone: '(555) 345-6789',
          city: 'Chicago',
          viewedProperties: 15,
          scheduledVisits: 5,
          image: 'https://randomuser.me/api/portraits/men/22.jpg'
        },
        {
          id: '4',
          name: 'Jessica Davis',
          email: 'jessica.davis@example.com',
          phone: '(555) 456-7890',
          city: 'Miami',
          viewedProperties: 5,
          scheduledVisits: 1,
          image: 'https://randomuser.me/api/portraits/women/17.jpg'
        },
        {
          id: '5',
          name: 'David Wilson',
          email: 'david.wilson@example.com',
          phone: '(555) 567-8901',
          city: 'San Francisco',
          viewedProperties: 10,
          scheduledVisits: 3,
          image: 'https://randomuser.me/api/portraits/men/83.jpg'
        },
        {
          id: '6',
          name: 'Sarah Martinez',
          email: 'sarah.martinez@example.com',
          phone: '(555) 678-9012',
          city: 'Denver',
          viewedProperties: 7,
          scheduledVisits: 2,
          image: 'https://randomuser.me/api/portraits/women/28.jpg'
        }
      ];
      setClients(mockClients);
      localStorage.setItem('clients', JSON.stringify(mockClients));
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleAddClient = (newClient: Omit<ClientType, 'id' | 'viewedProperties' | 'scheduledVisits'>) => {
    const client: ClientType = {
      ...newClient,
      id: Date.now().toString(),
      viewedProperties: 0,
      scheduledVisits: 0
    };
    
    const updatedClients = [...clients, client];
    setClients(updatedClients);
    
    // Save to localStorage
    localStorage.setItem('clients', JSON.stringify(updatedClients));
    
    return client;
  };

  const handleDeleteClient = (id: string) => {
    const updatedClients = clients.filter(client => client.id !== id);
    setClients(updatedClients);
    
    // Save to localStorage
    localStorage.setItem('clients', JSON.stringify(updatedClients));
  };
  
  const filteredClients = searchQuery
    ? clients.filter(client => 
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone.includes(searchQuery) ||
        client.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : clients;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
        <AddClientForm onAddClient={handleAddClient} />
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar clientes por nome, email, telefone ou cidade..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>
      
      {filteredClients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} onDelete={handleDeleteClient} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">Nenhum cliente encontrado</h3>
          <p className="text-muted-foreground mt-1">Tente ajustar seus critérios de busca</p>
        </div>
      )}
    </div>
  );
};

export default ClientsList;
