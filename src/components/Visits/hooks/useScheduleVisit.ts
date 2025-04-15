
import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { ClientType } from '../../Clients/ClientCard';
import { FormValues } from '../types/form';

// Mock data
export const mockAgents = [
  { id: '1', name: 'Pedro Almeida' },
  { id: '2', name: 'Juliana Ferreira' },
  { id: '3', name: 'Roberto Campos' },
  { id: '4', name: 'Fernanda Lima' },
  { id: '5', name: 'Marcos Souza' },
];

export const mockProperties = [
  { id: '1', title: 'Apartamento Moderno no Centro', address: 'Rua Principal, 123, São Paulo' },
  { id: '2', title: 'Casa Familiar Espaçosa com Jardim', address: 'Avenida Carvalho, 456, Rio de Janeiro' },
  { id: '3', title: 'Condomínio de Luxo com Vista para o Mar', address: 'Rua da Praia, 789, Salvador' },
  { id: '4', title: 'Estúdio Aconchegante em Bairro Histórico', address: 'Rua das Flores, 101, Belo Horizonte' },
  { id: '5', title: 'Casa Geminada Renovada', address: 'Avenida do Parque, 202, Curitiba' },
];

export function useScheduleVisit(form: UseFormReturn<FormValues>) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState<ClientType[]>([]);

  useEffect(() => {
    const savedClients = localStorage.getItem('clients');
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    }
  }, []);

  const handleSubmit = (data: FormValues) => {
    const selectedClient = clients.find(client => client.id === data.clientId);
    const selectedAgent = mockAgents.find(agent => agent.id === data.agentId);
    const selectedProperty = mockProperties.find(property => property.id === data.propertyId);
    
    if (selectedClient && selectedAgent && selectedProperty) {
      const formattedDate = format(data.date, "d 'de' MMMM, yyyy");
      
      const newVisit = {
        id: String(Date.now()),
        date: formattedDate,
        time: data.time,
        clientName: selectedClient.name,
        clientId: selectedClient.id,
        agentName: selectedAgent.name,
        agentId: selectedAgent.id,
        propertyTitle: selectedProperty.title,
        propertyId: selectedProperty.id,
        propertyAddress: selectedProperty.address,
        status: 'scheduled',
        notes: data.notes
      };
      
      const storedVisits = localStorage.getItem('mockVisits');
      const mockVisits = storedVisits ? JSON.parse(storedVisits) : [];
      mockVisits.push(newVisit);
      localStorage.setItem('mockVisits', JSON.stringify(mockVisits));
    }
    
    toast({
      title: 'Visita agendada com sucesso!',
      description: `Visita agendada para ${format(data.date, 'dd/MM/yyyy')} às ${data.time}`,
    });
    
    form.reset();
    setOpen(false);
    window.location.reload();
  };

  return {
    clients,
    open,
    setOpen,
    handleSubmit
  };
}
