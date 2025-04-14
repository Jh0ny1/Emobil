
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from './StatCard';
import ChartCard from './ChartCard';
import QuickActionCard from './QuickActionCard';
import { Home, Calendar, FileText, DollarSign, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Dados de exemplo para os cartões KPI
  const kpiData = [
    { 
      title: 'Total de Imóveis', 
      value: '126', 
      change: { value: 12, trend: 'up' as const }, 
      trend: 'último mês',
      icon: Home
    },
    { 
      title: 'Imóveis Disponíveis', 
      value: '79', 
      change: { value: 5, trend: 'up' as const }, 
      trend: 'último mês',
      icon: Home
    },
    { 
      title: 'Visitas Agendadas', 
      value: '34', 
      change: { value: 2, trend: 'down' as const }, 
      trend: 'última semana',
      icon: Calendar
    },
    { 
      title: 'Contratos Fechados', 
      value: '17', 
      change: { value: 8, trend: 'up' as const }, 
      trend: 'último mês',
      icon: FileText
    },
    { 
      title: 'Total de Comissões', 
      value: 'R$ 283.546', 
      change: { value: 15, trend: 'up' as const }, 
      trend: 'último mês',
      icon: DollarSign
    }
  ];

  // Dados de exemplo para gráficos
  const monthlySalesData = [
    { name: 'Jan', value: 12 },
    { name: 'Fev', value: 19 },
    { name: 'Mar', value: 15 },
    { name: 'Abr', value: 21 },
    { name: 'Mai', value: 28 },
    { name: 'Jun', value: 23 },
    { name: 'Jul', value: 31 },
    { name: 'Ago', value: 35 },
    { name: 'Set', value: 26 },
    { name: 'Out', value: 29 },
    { name: 'Nov', value: 32 },
    { name: 'Dez', value: 38 }
  ];

  const propertiesStatusData = [
    { name: 'Disponível', value: 79 },
    { name: 'Vendido', value: 47 },
    { name: 'Pendente', value: 23 }
  ];

  const commissionsByAgentData = [
    { name: 'João', value: 48500 },
    { name: 'Sara', value: 63200 },
    { name: 'Miguel', value: 42700 },
    { name: 'Luísa', value: 57100 },
    { name: 'Davi', value: 72000 }
  ];

  // Ações rápidas com funcionalidades reais
  const quickActions = [
    { 
      label: 'Adicionar Imóvel', 
      icon: Plus, 
      onClick: () => navigate('/properties')
    },
    { 
      label: "Ver Visitas de Hoje", 
      icon: Calendar, 
      onClick: () => navigate('/visits')
    },
    { 
      label: 'Registrar Novo Contrato', 
      icon: FileText, 
      onClick: () => navigate('/contracts')
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

      {/* Visualização para dispositivos mobile */}
      <div className="block md:hidden">
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
            <TabsTrigger value="charts">Gráficos</TabsTrigger>
            <TabsTrigger value="actions">Ações</TabsTrigger>
          </TabsList>
          <TabsContent value="stats" className="space-y-4 mt-4">
            {kpiData.map((kpi, index) => (
              <StatCard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                trend={kpi.trend}
                icon={kpi.icon}
                className="h-full"
              />
            ))}
          </TabsContent>
          <TabsContent value="charts" className="space-y-4 mt-4">
            <ChartCard
              title="Vendas Mensais"
              description="Número de imóveis vendidos por mês"
              data={monthlySalesData}
              type="area"
            />
            
            <ChartCard
              title="Imóveis por Status"
              data={propertiesStatusData}
              type="pie"
              colors={['#10b981', '#3b82f6', '#f59e0b']}
            />
            
            <ChartCard
              title="Comissões por Corretor"
              description="Total de comissões ganhas pelos principais corretores"
              data={commissionsByAgentData}
              type="bar"
            />
          </TabsContent>
          <TabsContent value="actions" className="mt-4">
            <QuickActionCard
              title="Ações Rápidas"
              description="Tarefas comuns que você pode querer realizar"
              actions={quickActions}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Visualização para tablets e desktops */}
      <div className="hidden md:block">
        {/* Modificação para melhorar o espaçamento dos cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {kpiData.map((kpi, index) => (
            <StatCard
              key={index}
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              trend={kpi.trend}
              icon={kpi.icon}
              className="h-full"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <ChartCard
            title="Vendas Mensais"
            description="Número de imóveis vendidos por mês"
            data={monthlySalesData}
            type="area"
          />
          
          {/* Removendo a propriedade className que estava causando erro */}
          <ChartCard
            title="Imóveis por Status"
            data={propertiesStatusData}
            type="pie"
            colors={['#10b981', '#3b82f6', '#f59e0b']}
          />
          
          <ChartCard
            title="Comissões por Corretor"
            description="Total de comissões ganhas pelos principais corretores"
            data={commissionsByAgentData}
            type="bar"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <QuickActionCard
            title="Ações Rápidas"
            description="Tarefas comuns que você pode querer realizar"
            actions={quickActions}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
