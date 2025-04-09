
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import PropertiesList from "./components/Properties/PropertiesList";
import PropertyDetails from "./components/Properties/PropertyDetails";
import ClientsList from "./components/Clients/ClientsList";
import VisitsList from "./components/Visits/VisitsList";
import ContractsList from "./components/Contracts/ContractsList";
import CommissionsList from "./components/Commissions/CommissionsList";
import MapView from "./components/Map/MapView";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";

// Componente para proteger rotas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      
      {/* Rotas protegidas */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <MainLayout><Dashboard /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/properties" element={
        <ProtectedRoute>
          <MainLayout><PropertiesList /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/properties/:id" element={
        <ProtectedRoute>
          <MainLayout><PropertyDetails /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/clients" element={
        <ProtectedRoute>
          <MainLayout><ClientsList /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/visits" element={
        <ProtectedRoute>
          <MainLayout><VisitsList /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/contracts" element={
        <ProtectedRoute>
          <MainLayout><ContractsList /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/commissions" element={
        <ProtectedRoute>
          <MainLayout><CommissionsList /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/map" element={
        <ProtectedRoute>
          <MainLayout><MapView /></MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Rota de captura */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  // Create the QueryClient inside the component function
  const queryClient = new QueryClient();
  
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
