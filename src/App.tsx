
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
import MapView from "./components/Map/MapView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Rotas do painel */}
          <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/properties" element={<MainLayout><PropertiesList /></MainLayout>} />
          <Route path="/properties/:id" element={<MainLayout><PropertyDetails /></MainLayout>} />
          <Route path="/clients" element={<MainLayout><ClientsList /></MainLayout>} />
          <Route path="/visits" element={<MainLayout><VisitsList /></MainLayout>} />
          <Route path="/map" element={<MainLayout><MapView /></MainLayout>} />
          
          {/* Rota de captura */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
