
import React from 'react';
import { Search, LogOut, UserCircle } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, profile, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center w-full max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar imóveis, clientes..."
              className="pl-10 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
            aria-label={theme === 'light' ? 'Mudar para modo escuro' : 'Mudar para modo claro'}
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            )}
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium">{profile?.name || user?.email || 'Usuário'}</p>
              <p className="text-xs text-muted-foreground">{profile?.role === 'admin' ? 'Administrador' : 'Corretor de Imóveis'}</p>
            </div>
            <UserCircle className="h-8 w-8 text-muted-foreground" />
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={logout} 
            className="text-muted-foreground hover:text-destructive"
            aria-label="Sair do sistema"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
