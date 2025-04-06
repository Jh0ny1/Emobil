import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { DollarSign, Plus, Check, Clock, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface CommissionType {
  id: string;
  agentName: string;
  propertyTitle: string;
  clientName: string;
  date: string;
  status: string;
  value: number;
}

const mockCommissions: CommissionType[] = [
  {
    id: '1',
    agentName: 'Carolina Santos',
    propertyTitle: 'Apartamento Moderno no Centro',
    clientName: 'João Silva',
    date: '15/02/2025',
    status: 'paid',
    value: 22500
  },
  {
    id: '2',
    agentName: 'Rafael Oliveira',
    propertyTitle: 'Casa Espaçosa com Jardim',
    clientName: 'Maria Oliveira',
    date: '20/03/2025',
    status: 'pending',
    value: 37500
  },
  {
    id: '3',
    agentName: 'Carolina Santos',
    propertyTitle: 'Estúdio Aconchegante no Centro Histórico',
    clientName: 'Pedro Souza',
    date: '05/04/2025',
    status: 'processing',
    value: 16500
  },
  {
    id: '4',
    agentName: 'Lucas Mendes',
    propertyTitle: 'Sobrado Renovado no Bairro Nobre',
    clientName: 'Ana Pereira',
    date: '25/03/2025',
    status: 'paid',
    value: 26850
  }
];

interface CommissionFormValues {
  agentName: string;
  propertyTitle: string;
  clientName: string;
  value: number;
  status: string;
}

const CommissionsList: React.FC = () => {
  const [commissions, setCommissions] = useState<CommissionType[]>(mockCommissions);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<CommissionFormValues>({
    defaultValues: {
      agentName: '',
      propertyTitle: '',
      clientName: '',
      value: 0,
      status: 'pending'
    }
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Pago</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500">Pendente</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">Em Processamento</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'pending':
      case 'processing':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };
  
  const onSubmit = (data: CommissionFormValues) => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    
    const newCommission: CommissionType = {
      id: (commissions.length + 1).toString(),
      ...data,
      date: formattedDate
    };
    
    setCommissions([newCommission, ...commissions]);
    setOpen(false);
    form.reset();
    
    toast({
      title: "Comissão adicionada",
      description: "A comissão foi adicionada com sucesso."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Comissões</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Nova Comissão
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Comissão</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="agentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Agente</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do agente" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="propertyTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imóvel</FormLabel>
                      <FormControl>
                        <Input placeholder="Título do imóvel" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do cliente" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Valor da comissão" 
                          {...field} 
                          onChange={e => field.onChange(Number(e.target.value))} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="paid">Pago</SelectItem>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="processing">Em Processamento</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="pt-4">
                  <Button type="submit">Adicionar</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Agente</TableHead>
              <TableHead>Imóvel</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commissions.map((commission) => (
              <TableRow key={commission.id}>
                <TableCell>#{commission.id}</TableCell>
                <TableCell>{commission.agentName}</TableCell>
                <TableCell>{commission.propertyTitle}</TableCell>
                <TableCell>{commission.clientName}</TableCell>
                <TableCell>{commission.date}</TableCell>
                <TableCell>{formatCurrency(commission.value)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(commission.status)}
                    {getStatusBadge(commission.status)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default CommissionsList;
