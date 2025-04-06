
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { DollarSign, Plus, Check, Clock, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockCommissions = [
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

const CommissionsList: React.FC = () => {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Comissões</h1>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Nova Comissão
        </Button>
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
            {mockCommissions.map((commission) => (
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
