
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';

type Profile = {
  id: string;
  name: string;
  role: 'admin' | 'agent';
};

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string, role?: 'admin' | 'agent') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  
  // Função para buscar o perfil do usuário
  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }
    
    return data as Profile;
  };
  
  // Atualizar o estado de autenticação
  useEffect(() => {
    const setupAuth = async () => {
      // Primeiro configuramos o listener para mudanças de auth
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, newSession) => {
          setSession(newSession);
          setUser(newSession?.user ?? null);
          
          if (newSession?.user) {
            // Usando setTimeout para evitar deadlock
            setTimeout(async () => {
              const userProfile = await fetchProfile(newSession.user.id);
              setProfile(userProfile);
            }, 0);
          } else {
            setProfile(null);
          }
        }
      );
      
      // Depois verificamos se já existe uma sessão
      const { data: initialSession } = await supabase.auth.getSession();
      setSession(initialSession.session);
      setUser(initialSession.session?.user ?? null);
      
      if (initialSession.session?.user) {
        const userProfile = await fetchProfile(initialSession.session.user.id);
        setProfile(userProfile);
      }
      
      setIsLoading(false);
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    };
    
    setupAuth();
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // O perfil é buscado automaticamente pelo listener de auth
      
      toast({
        title: 'Login realizado com sucesso',
        description: 'Bem-vindo(a) de volta!',
      });
    } catch (error: any) {
      toast({
        title: 'Erro de autenticação',
        description: error.message || 'Ocorreu um erro ao fazer login',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (email: string, password: string, name: string, role: 'admin' | 'agent' = 'agent') => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      });
      
      if (error) throw error;
      
      toast({
        title: 'Cadastro realizado com sucesso',
        description: 'Sua conta foi criada com sucesso.',
      });
    } catch (error: any) {
      toast({
        title: 'Erro no cadastro',
        description: error.message || 'Ocorreu um erro ao criar sua conta',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      
      toast({
        title: 'Logout realizado',
        description: 'Você saiu da sua conta com sucesso.',
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao fazer logout',
        description: error.message || 'Ocorreu um erro ao fazer logout',
        variant: 'destructive',
      });
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        isLoading,
        session,
        login,
        logout,
        register,
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
