
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { PropertyType } from '../Properties/PropertyCard';
import PropertyMapCard from './PropertyMapCard';

interface PropertyMapProps {
  properties: PropertyType[];
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties }) => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyType | null>(null);

  // In a real implementation, this would be a proper map using Mapbox or Google Maps
  // For this demo, we're creating a simulated map view
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Property Map</h1>
      
      <Card className="relative p-0 h-[70vh] overflow-hidden bg-gray-100">
        {/* This is a placeholder for a real map */}
        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-73.97,40.77,11,0/1200x900?access_token=pk.eyJ1IjoicGxhY2Vob2xkZXJtYXAiLCJhIjoiY2s5dmZwenRmMDJpZzNmbzFneGYyaHlidiJ9.kCQmX8ICgLGMzJXg85Eb9Q')] bg-cover bg-center">
          {/* Property markers */}
          {properties.map((property) => {
            // Simulate random positions on the map
            const left = Math.floor(Math.random() * 80) + 10;
            const top = Math.floor(Math.random() * 80) + 10;
            
            const markerColor = 
              property.status === 'available' ? 'bg-green-500' :
              property.status === 'sold' ? 'bg-blue-500' : 'bg-amber-500';
            
            return (
              <div 
                key={property.id}
                className={`absolute w-6 h-6 ${markerColor} rounded-full flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform duration-200 border-2 border-white shadow-md`}
                style={{ left: `${left}%`, top: `${top}%` }}
                onClick={() => setSelectedProperty(property)}
                aria-label={property.title}
              >
                <span className="text-white text-xs font-bold">
                  {property.id}
                </span>
              </div>
            );
          })}
          
          {/* Selected property popup */}
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
        </div>
        
        {/* Map controls - in a real implementation these would control the map */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-700"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          </button>
          <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-700"><path d="M5 12h14"/></svg>
          </button>
        </div>
        
        {/* Map legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-md shadow-md p-3 flex flex-col gap-2">
          <div className="text-sm font-medium mb-1">Legend</div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-sm">Sold</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
            <span className="text-sm">Pending</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PropertyMap;
