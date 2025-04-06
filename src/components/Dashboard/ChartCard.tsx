
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';

type ChartType = 'area' | 'bar' | 'pie';

interface ChartCardProps {
  title: string;
  description?: string;
  data: any[];
  type: ChartType;
  colors?: string[];
  dataKey?: string;
  nameKey?: string;
  categories?: string[];
}

const defaultColors = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  description, 
  data, 
  type, 
  colors = defaultColors,
  dataKey = 'value',
  nameKey = 'name',
  categories = []
}) => {
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
              <XAxis 
                dataKey={nameKey} 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: '#888' }}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: '#888' }}
              />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={colors[0]} 
                fill={colors[0]} 
                fillOpacity={0.2} 
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
              <XAxis 
                dataKey={nameKey} 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: '#888' }}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: '#888' }}
              />
              <Tooltip />
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <Bar 
                    key={category}
                    dataKey={category} 
                    fill={colors[index % colors.length]} 
                    radius={[4, 4, 0, 0]}
                  />
                ))
              ) : (
                <Bar 
                  dataKey={dataKey} 
                  fill={colors[0]} 
                  radius={[4, 4, 0, 0]}
                />
              )}
              {categories.length > 0 && <Legend />}
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey={dataKey}
                nameKey={nameKey}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
