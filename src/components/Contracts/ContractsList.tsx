import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { FileText, Plus, ExternalLink, Download, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface ContractType {
  id: string;
  propertyId: string;
  propertyTitle: string;
  clientName: string;
  contractType: string;
  date: string;
  status: string;
  value: number;
  documentUrl?: string;
}

const mockContracts: ContractType[] = [
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

interface ContractFormValues {
  propertyTitle: string;
  clientName: string;
  contractType: string;
  value: number;
  status: string;
  document?: FileList;
}

const ContractsList: React.FC = () => {
  const [contracts, setContracts] = useState<ContractType[]>(mockContracts);
  const [open, setOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const form = useForm<ContractFormValues>({
    defaultValues: {
      propertyTitle: '',
      clientName: '',
      contractType: 'Venda',
      value: 0,
      status: 'active'
    }
  });

  const uploadForm = useForm<{document: FileList | null}>({
    defaultValues: {
      document: null
    }
  });

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
  
  const onSubmit = (data: ContractFormValues) => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    
    const newContract: ContractType = {
      id: (contracts.length + 1).toString(),
      propertyId: (contracts.length + 1).toString(),
      ...data,
      date: formattedDate
    };
    
    if (data.document && data.document.length > 0) {
      const file = data.document[0];
      newContract.documentUrl = URL.createObjectURL(file);
    }
    
    setContracts([newContract, ...contracts]);
    setOpen(false);
    form.reset();
    
    toast({
      title: "Contrato adicionado",
      description: "O contrato foi adicionado com sucesso."
    });
  };

  const handleUploadClick = (contractId: string) => {
    setSelectedContractId(contractId);
    setUploadDialogOpen(true);
  };

  const handleDocumentUpload = (data: {document: FileList | null}) => {
    if (selectedContractId && data.document && data.document.length > 0) {
      const file = data.document[0];
      
      if (file.type !== 'application/pdf') {
        toast({
          title: "Erro ao fazer upload",
          description: "Por favor, selecione um arquivo PDF.",
          variant: "destructive",
        });
        return;
      }
      
      const documentUrl = URL.createObjectURL(file);
      
      setContracts(contracts.map(contract => 
        contract.id === selectedContractId 
          ? { ...contract, documentUrl } 
          : contract
      ));
      
      setUploadDialogOpen(false);
      uploadForm.reset();
      
      toast({
        title: "Documento anexado",
        description: `O arquivo "${file.name}" foi anexado ao contrato.`
      });
    }
  };

  const handleDownload = (contract: ContractType) => {
    if (contract.documentUrl) {
      window.open(contract.documentUrl, '_blank');
    } else {
      toast({
        title: "Documento não disponível",
        description: "Este contrato não possui um documento anexado.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Contratos</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Novo Contrato
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Contrato</DialogTitle>
              <DialogDescription>
                Preencha os detalhes do contrato. Você pode anexar um documento PDF opcional.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  name="contractType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Contrato</FormLabel>
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
                          <SelectItem value="Venda">Venda</SelectItem>
                          <SelectItem value="Aluguel">Aluguel</SelectItem>
                        </SelectContent>
                      </Select>
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
                          placeholder="Valor do contrato" 
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
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="expired">Expirado</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="document"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Documento (PDF)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => {
                            onChange(e.target.files);
                          }}
                          {...fieldProps}
                        />
                      </FormControl>
                      <FormDescription>
                        Selecione um arquivo PDF do contrato (opcional).
                      </FormDescription>
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

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Anexar Documento</DialogTitle>
            <DialogDescription>
              Selecione um arquivo PDF para anexar a este contrato.
            </DialogDescription>
          </DialogHeader>
          <Form {...uploadForm}>
            <form onSubmit={uploadForm.handleSubmit(handleDocumentUpload)} className="space-y-4">
              <FormField
                control={uploadForm.control}
                name="document"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Documento (PDF)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf"
                        ref={fileInputRef}
                        onChange={(e) => {
                          onChange(e.target.files);
                        }}
                        {...fieldProps}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="pt-4">
                <Button type="submit">Anexar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

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
            {contracts.map((contract) => (
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
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDownload(contract)}
                      className={!contract.documentUrl ? "text-muted-foreground" : ""}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleUploadClick(contract.id)}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
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
