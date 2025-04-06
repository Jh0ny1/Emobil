
import React from 'react';
import { LayoutGrid } from '@/components/ui/chart';
import StatCard from './StatCard';
import ChartCard from './ChartCard';
import QuickActionCard from './QuickActionCard';
import { Home, Calendar, FileText, DollarSign, Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data for KPI cards
  const kpiData = [
    { 
      title: 'Total Properties', 
      value: '126', 
      change: { value: 12, trend: 'up' as const }, 
      trend: 'last month',
      icon: Home
    },
    { 
      title: 'Available Properties', 
      value: '79', 
      change: { value: 5, trend: 'up' as const }, 
      trend: 'last month',
      icon: Home
    },
    { 
      title: 'Scheduled Visits', 
      value: '34', 
      change: { value: 2, trend: 'down' as const }, 
      trend: 'last week',
      icon: Calendar
    },
    { 
      title: 'Contracts Closed', 
      value: '17', 
      change: { value: 8, trend: 'up' as const }, 
      trend: 'last month',
      icon: FileText
    },
    { 
      title: 'Total Commissions', 
      value: '$283,546', 
      change: { value: 15, trend: 'up' as const }, 
      trend: 'last month',
      icon: DollarSign
    }
  ];

  // Mock data for charts
  const monthlySalesData = [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 19 },
    { name: 'Mar', value: 15 },
    { name: 'Apr', value: 21 },
    { name: 'May', value: 28 },
    { name: 'Jun', value: 23 },
    { name: 'Jul', value: 31 },
    { name: 'Aug', value: 35 },
    { name: 'Sep', value: 26 },
    { name: 'Oct', value: 29 },
    { name: 'Nov', value: 32 },
    { name: 'Dec', value: 38 }
  ];

  const propertiesStatusData = [
    { name: 'Available', value: 79 },
    { name: 'Sold', value: 47 },
    { name: 'Pending', value: 23 }
  ];

  const commissionsByAgentData = [
    { name: 'John', value: 48500 },
    { name: 'Sarah', value: 63200 },
    { name: 'Mike', value: 42700 },
    { name: 'Lisa', value: 57100 },
    { name: 'David', value: 72000 }
  ];

  // Mock quick actions
  const quickActions = [
    { 
      label: 'Add New Property', 
      icon: Plus, 
      onClick: () => console.log('Add property clicked') 
    },
    { 
      label: "View Today's Visits", 
      icon: Calendar, 
      onClick: () => console.log("View today's visits clicked") 
    },
    { 
      label: 'Register New Contract', 
      icon: FileText, 
      onClick: () => console.log('Register contract clicked') 
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpiData.map((kpi, index) => (
          <StatCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
            icon={kpi.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard
          title="Monthly Sales"
          description="Number of properties sold per month"
          data={monthlySalesData}
          type="area"
        />
        
        <ChartCard
          title="Properties by Status"
          data={propertiesStatusData}
          type="pie"
          colors={['#10b981', '#3b82f6', '#f59e0b']}
        />
        
        <ChartCard
          title="Commissions per Agent"
          description="Total commissions earned by top agents"
          data={commissionsByAgentData}
          type="bar"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickActionCard
          title="Quick Actions"
          description="Common tasks you might want to perform"
          actions={quickActions}
        />

        {/* Additional cards can be added here in the future */}
      </div>
    </div>
  );
};

export default Dashboard;
