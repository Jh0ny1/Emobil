
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  clientId: z.string().min(1, { message: 'Selecione um cliente' }),
  agentId: z.string().min(1, { message: 'Selecione um corretor' }),
  propertyId: z.string().min(1, { message: 'Selecione um imóvel' }),
  date: z.date({ required_error: 'Selecione uma data para a visita' }),
  time: z.string().min(1, { message: 'Informe o horário da visita' }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Dados fictícios para demonstração
const mockClients = [
  { id: '1', name: 'João Silva' },
  { id: '2', name: 'Maria Oliveira' },
  { id: '3', name: 'Carlos Santos' },
  { id: '4', name: 'Ana Pereira' },
  { id: '5', name: 'Luiz Costa' },
];

const mockAgents = [
  { id: '1', name: 'Pedro Almeida' },
  { id: '2', name: 'Juliana Ferreira' },
  { id: '3', name: 'Roberto Campos' },
  { id: '4', name: 'Fernanda Lima' },
  { id: '5', name: 'Marcos Souza' },
];

const mockProperties = [
  { id: '1', title: 'Apartamento Moderno no Centro', address: 'Rua Principal, 123, São Paulo' },
  { id: '2', title: 'Casa Familiar Espaçosa com Jardim', address: 'Avenida Carvalho, 456, Rio de Janeiro' },
  { id: '3', title: 'Condomínio de Luxo com Vista para o Mar', address: 'Rua da Praia, 789, Salvador' },
  { id: '4', title: 'Estúdio Aconchegante em Bairro Histórico', address: 'Rua das Flores, 101, Belo Horizonte' },
  { id: '5', title: 'Casa Geminada Renovada', address: 'Avenida do Parque, 202, Curitiba' },
];

export default function ScheduleVisitForm() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: '',
    },
  });

  function onSubmit(data: FormValues) {
    // Aqui seria a integração com o backend para salvar a visita agendada
    console.log('Dados do agendamento de visita:', data);
    
    // Criar um objeto de visita com base nos valores do formulário
    const selectedClient = mockClients.find(client => client.id === data.clientId);
    const selectedAgent = mockAgents.find(agent => agent.id === data.agentId);
    const selectedProperty = mockProperties.find(property => property.id === data.propertyId);
    
    if (selectedClient && selectedAgent && selectedProperty) {
      const formattedDate = format(data.date, "d 'de' MMMM, yyyy");
      
      const newVisit = {
        id: String(Date.now()), // ID temporário baseado no timestamp
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
      
      // Em uma aplicação real, enviaria para o backend
      // Por enquanto, vamos adicionar ao array mockVisits no localStorage
      const storedVisits = localStorage.getItem('mockVisits');
      const mockVisits = storedVisits ? JSON.parse(storedVisits) : [];
      mockVisits.push(newVisit);
      localStorage.setItem('mockVisits', JSON.stringify(mockVisits));
    }
    
    toast({
      title: 'Visita agendada com sucesso!',
      description: `Visita agendada para ${format(data.date, 'dd/MM/yyyy')} às ${data.time}`,
    });
    
    // Resetar o formulário e fechar o diálogo
    form.reset();
    setOpen(false);
    
    // Recarregar a página para exibir a nova visita
    window.location.reload();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Agendar Visita
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Agendar Nova Visita</DialogTitle>
          <DialogDescription>
            Preencha os dados para agendar uma visita a um imóvel.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cliente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockClients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="propertyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imóvel</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um imóvel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockProperties.map((property) => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="agentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Corretor</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um corretor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockAgents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Observações adicionais sobre a visita..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Agendar Visita</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
