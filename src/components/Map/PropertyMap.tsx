
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { PropertyType } from '../Properties/PropertyCard';
import PropertyMapCard from './PropertyMapCard';
import { Info, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PropertyMapProps {
  properties: PropertyType[];
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyType | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);

  // Função para inicializar o mapa do Google
  const initGoogleMap = () => {
    if (!window.google || !mapRef.current) return;

    try {
      // Centralize o mapa no Brasil
      const mapOptions = {
        center: { lat: -15.77972, lng: -47.92972 }, // Coordenadas de Brasília
        zoom: 4,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        styles: [
          {
            featureType: 'administrative',
            elementType: 'geometry',
            stylers: [{ visibility: 'simplified' }]
          }
        ]
      };

      // Crie o mapa
      googleMapRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
      
      // Adicione marcadores para cada propriedade
      addMarkers();
      
      setMapLoaded(true);
    } catch (err) {
      console.error("Erro ao inicializar o mapa:", err);
      setError(true);
    }
  };

  // Função para adicionar marcadores para cada propriedade
  const addMarkers = () => {
    if (!googleMapRef.current) return;
    
    try {
      // Remova marcadores existentes
      markers.current.forEach(marker => marker.setMap(null));
      markers.current = [];
      
      // Limites para centralizar o mapa
      const bounds = new window.google.maps.LatLngBounds();
      
      // Adicione novos marcadores
      properties.forEach((property) => {
        // Simulando coordenadas para cada propriedade
        // Em um cenário real, você usaria geocodificação ou coordenadas armazenadas
        const lat = -23.55 + Math.random() * 20;
        const lng = -46.63 + Math.random() * 20;
        const position = { lat, lng };
        
        // Defina a cor do ícone com base no status
        const pinColor = 
          property.status === 'available' ? '#10b981' :
          property.status === 'sold' ? '#3b82f6' : '#f59e0b';
        
        // Crie um marcador personalizado
        const marker = new window.google.maps.Marker({
          position,
          map: googleMapRef.current,
          title: property.title,
          label: {
            text: property.id,
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: pinColor,
            fillOpacity: 1,
            strokeColor: 'white',
            strokeWeight: 2,
            scale: 15,
          }
        });
        
        // Adicione evento de clique
        marker.addListener('click', () => {
          setSelectedProperty(property);
        });
        
        // Adicione a posição aos limites
        bounds.extend(position);
        
        // Armazene o marcador
        markers.current.push(marker);
      });
      
      // Ajuste o mapa para mostrar todos os marcadores
      googleMapRef.current.fitBounds(bounds);
      
      // Não dê zoom demais
      const listener = googleMapRef.current.addListener('idle', () => {
        if (googleMapRef.current && googleMapRef.current.getZoom() > 12) {
          googleMapRef.current.setZoom(12);
        }
        window.google.maps.event.removeListener(listener);
      });
    } catch (err) {
      console.error("Erro ao adicionar marcadores:", err);
    }
  };

  const loadGoogleMapsScript = (key: string) => {
    if (window.google) {
      initGoogleMap();
      return;
    }

    try {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initGoogleMap();
        // Salvar API key para uso futuro (apenas sessão)
        sessionStorage.setItem('google_maps_api_key', key);
        setShowApiInput(false);
      };
      script.onerror = () => {
        console.error("Erro ao carregar o script do Google Maps");
        setError(true);
      };
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    } catch (err) {
      console.error("Erro ao carregar o script do Google Maps:", err);
      setError(true);
    }
  };

  // Verificar se já temos uma API key salva na sessão
  useEffect(() => {
    const savedApiKey = sessionStorage.getItem('google_maps_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiInput(false);
      loadGoogleMapsScript(savedApiKey);
    }
  }, []);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      loadGoogleMapsScript(apiKey.trim());
    }
  };

  return (
    <div className="space-y-6">
      <Card className="relative p-0 h-[70vh] overflow-hidden bg-gray-100">
        {showApiInput && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10 bg-white/95">
            <Info className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Configuração do Mapa</h3>
            <p className="text-center text-muted-foreground mb-4">
              Para exibir o mapa, é necessário uma chave de API válida do Google Maps.
            </p>
            <form onSubmit={handleApiKeySubmit} className="w-full max-w-md space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="apiKey" className="text-sm font-medium">
                  Chave de API do Google Maps
                </label>
                <Input
                  id="apiKey"
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Insira sua chave de API"
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Carregar Mapa
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              Você pode obter uma chave de API no <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Console do Google Cloud</a>.
            </p>
          </div>
        )}
        
        {error && !showApiInput && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <Info className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Erro ao carregar o mapa</h3>
            <p className="text-center text-muted-foreground mb-4">
              Ocorreu um erro ao carregar o mapa do Google Maps.
            </p>
            <Button onClick={() => setShowApiInput(true)}>
              Tentar novamente
            </Button>
          </div>
        )}
        
        {!mapLoaded && !error && !showApiInput && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Carregando mapa...</span>
          </div>
        )}
        
        <div 
          ref={mapRef} 
          className="absolute inset-0"
          style={{ display: error || showApiInput ? 'none' : 'block' }}
        ></div>
        
        {/* Popup da propriedade selecionada */}
        {selectedProperty && (
          <div 
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80"
            style={{ zIndex: 1000 }}
          >
            <PropertyMapCard 
              property={selectedProperty} 
              onClose={() => setSelectedProperty(null)}
            />
          </div>
        )}
        
        {/* Legenda do mapa */}
        {mapLoaded && (
          <div className="absolute bottom-4 left-4 bg-white rounded-md shadow-md p-3 flex flex-col gap-2 z-10">
            <div className="text-sm font-medium mb-1">Legenda</div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm">Disponível</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Vendido</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
              <span className="text-sm">Pendente</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PropertyMap;
