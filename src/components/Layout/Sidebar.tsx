
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, 
  LayoutDashboard, 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  DollarSign, 
  Map
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigationItems = [
    { name: 'Painel', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Imóveis', icon: Home, path: '/properties' },
    { name: 'Clientes', icon: Users, path: '/clients' },
    { name: 'Visitas', icon: Calendar, path: '/visits' },
    { name: 'Contratos', icon: FileText, path: '/contracts' },
    { name: 'Comissões', icon: DollarSign, path: '/commissions' },
    { name: 'Mapa', icon: Map, path: '/map' },
  ];

  return (
    <aside 
      className={cn(
        "h-full z-20 bg-sidebar transition-all duration-300 flex flex-col border-r relative",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-14 min-h-[3.5rem] border-b flex items-center justify-between px-4">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          {!collapsed && (
            <span className="font-semibold text-lg text-real-600">PropVue</span>
          )}
          {collapsed && (
            <span className="font-bold text-real-600">PV</span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
          aria-label={collapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
        >
          <ChevronLeft className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-sidebar-ring",
                  "text-sidebar-foreground",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
