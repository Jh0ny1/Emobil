
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { DollarSign, Plus, Check, Clock, MoreHorizontal, Eye, Pencil, Trash2, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [editingCommission, setEditingCommission] = useState<CommissionType | null>(null);
  const [viewingCommission, setViewingCommission] = useState<CommissionType | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [commissionToDelete, setCommissionToDelete] = useState<string | null>(null);
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

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (open && editingCommission) {
      form.reset({
        agentName: editingCommission.agentName,
        propertyTitle: editingCommission.propertyTitle,
        clientName: editingCommission.clientName,
        value: editingCommission.value,
        status: editingCommission.status
      });
    } else if (open) {
      form.reset({
        agentName: '',
        propertyTitle: '',
        clientName: '',
        value: 0,
        status: 'pending'
      });
    }
  }, [open, editingCommission, form]);

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
    if (editingCommission) {
      // Update existing commission
      const updatedCommissions = commissions.map(commission => 
        commission.id === editingCommission.id 
          ? { ...commission, ...data } 
          : commission
      );
      
      setCommissions(updatedCommissions);
      setEditingCommission(null);
      toast({
        title: "Comissão atualizada",
        description: "A comissão foi atualizada com sucesso."
      });
    } else {
      // Add new commission
      const today = new Date();
      const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
      
      const newCommission: CommissionType = {
        id: (commissions.length + 1).toString(),
        ...data,
        date: formattedDate
      };
      
      setCommissions([newCommission, ...commissions]);
      toast({
        title: "Comissão adicionada",
        description: "A comissão foi adicionada com sucesso."
      });
    }
    
    setOpen(false);
    form.reset();
  };

  const handleEditCommission = (commission: CommissionType) => {
    setEditingCommission(commission);
    setOpen(true);
  };

  const handleViewCommission = (commission: CommissionType) => {
    setViewingCommission(commission);
  };

  const handleDeleteCommission = (id: string) => {
    setCommissionToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (commissionToDelete) {
      const updatedCommissions = commissions.filter(
        commission => commission.id !== commissionToDelete
      );
      setCommissions(updatedCommissions);
      toast({
        title: "Comissão excluída",
        description: "A comissão foi removida com sucesso."
      });
      setIsDeleteDialogOpen(false);
      setCommissionToDelete(null);
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    const updatedCommissions = commissions.map(commission => 
      commission.id === id 
        ? { ...commission, status: newStatus } 
        : commission
    );
    
    setCommissions(updatedCommissions);
    toast({
      title: "Status atualizado",
      description: `Status da comissão atualizado para ${newStatus === 'paid' ? 'Pago' : newStatus === 'pending' ? 'Pendente' : 'Em Processamento'}.`
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
              <DialogTitle>
                {editingCommission ? "Editar Comissão" : "Adicionar Nova Comissão"}
              </DialogTitle>
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
                  <Button type="submit">
                    {editingCommission ? "Atualizar" : "Adicionar"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* View Commission Dialog */}
      <Dialog open={!!viewingCommission} onOpenChange={(open) => !open && setViewingCommission(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Comissão</DialogTitle>
          </DialogHeader>
          
          {viewingCommission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ID</p>
                  <p>#{viewingCommission.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data</p>
                  <p>{viewingCommission.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Agente</p>
                  <p>{viewingCommission.agentName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cliente</p>
                  <p>{viewingCommission.clientName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Imóvel</p>
                  <p>{viewingCommission.propertyTitle}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valor</p>
                  <p className="font-semibold">{formatCurrency(viewingCommission.value)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <div className="mt-1">
                    {getStatusBadge(viewingCommission.status)}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setViewingCommission(null)}
                >
                  Fechar
                </Button>
                <Button 
                  onClick={() => {
                    handleEditCommission(viewingCommission);
                    setViewingCommission(null);
                  }}
                >
                  Editar
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta comissão? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCommissionToDelete(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewCommission(commission)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Visualizar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditCommission(commission)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      {commission.status !== 'paid' && (
                        <DropdownMenuItem onClick={() => handleStatusChange(commission.id, 'paid')}>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          <span>Marcar como Pago</span>
                        </DropdownMenuItem>
                      )}
                      {commission.status !== 'pending' && (
                        <DropdownMenuItem onClick={() => handleStatusChange(commission.id, 'pending')}>
                          <Clock className="mr-2 h-4 w-4" />
                          <span>Marcar como Pendente</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteCommission(commission.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Excluir</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
