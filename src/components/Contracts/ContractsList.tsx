
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { FileText, Plus, ExternalLink, Download, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockContracts = [
  {
    id: '1',
    propertyId: '1',
    propertyTitle: 'Apartamento Moderno no Centro',
    clientName: 'João Silva',
    contractType: 'Venda',
    date: '10/02/2025',
    status: 'active',
    value: 750000
  },
  {
    id: '2',
    propertyId: '2',
    propertyTitle: 'Casa Espaçosa com Jardim',
    clientName: 'Maria Oliveira',
    contractType: 'Venda',
    date: '15/03/2025',
    status: 'pending',
    value: 1250000
  },
  {
    id: '3',
    propertyId: '4',
    propertyTitle: 'Estúdio Aconchegante no Centro Histórico',
    clientName: 'Pedro Souza',
    contractType: 'Aluguel',
    date: '01/04/2025',
    status: 'active',
    value: 2500
  },
  {
    id: '4',
    propertyId: '5',
    propertyTitle: 'Sobrado Renovado no Bairro Nobre',
    clientName: 'Ana Pereira',
    contractType: 'Venda',
    date: '20/03/2025',
    status: 'expired',
    value: 895000
  }
];

const ContractsList: React.FC = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Ativo</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500">Pendente</Badge>;
      case 'expired':
        return <Badge className="bg-gray-500">Expirado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Contratos</h1>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          Novo Contrato
        </Button>
      </div>

      <Card className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Imóvel</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockContracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell>#{contract.id}</TableCell>
                <TableCell>{contract.propertyTitle}</TableCell>
                <TableCell>{contract.clientName}</TableCell>
                <TableCell>{contract.contractType}</TableCell>
                <TableCell>{contract.date}</TableCell>
                <TableCell>{formatCurrency(contract.value)}</TableCell>
                <TableCell>{getStatusBadge(contract.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ContractsList;
