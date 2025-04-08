
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent';
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock usuários para demonstração
const MOCK_USERS = [
  { 
    id: '1', 
    name: 'Sarah Johnson', 
    email: 'admin@propvue.com', 
    role: 'admin' as const, 
    password: 'admin123' 
  },
  { 
    id: '2', 
    name: 'Carlos Silva', 
    email: 'agente@propvue.com', 
    role: 'agent' as const, 
    password: 'agente123' 
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simula um atraso de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Credenciais inválidas');
      }
      
      // Remover a senha antes de armazenar os dados do usuário
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Armazenar usuário no localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      
      toast({
        title: 'Login realizado com sucesso',
        description: `Bem-vindo(a), ${userWithoutPassword.name}!`,
      });
    } catch (error) {
      toast({
        title: 'Erro de autenticação',
        description: error instanceof Error ? error.message : 'Ocorreu um erro ao fazer login',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: 'Logout realizado',
      description: 'Você saiu da sua conta com sucesso.',
    });
  };
  
  // Verificar se o usuário já está logado ao carregar a aplicação
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};
