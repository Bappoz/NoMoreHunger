import React, { useState } from "react";
import { Map, List, Grid, Filter } from "lucide-react";
import InteractiveMap from "../components/InteractiveMap";
import MapView from "../components/MapView";
import { LocationResult } from "../hooks/useGoogleMaps";
import { MapOffer } from "../types";

const MapPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"interactive" | "classic">(
    "interactive"
  );
  const [selectedOffer, setSelectedOffer] = useState<MapOffer | null>(null);
  const [userLocation, setUserLocation] = useState<LocationResult | null>(null);

  // Sample offers data
  const offers: MapOffer[] = [
    {
      id: "1",
      donorName: "Restaurante Central",
      description: "15 marmitas prontas para retirada",
      portions: 15,
      latitude: -23.5505,
      longitude: -46.6333,
      distance: 1.2,
      pickupBy: "2024-01-15T18:00:00",
      status: "AVAILABLE",
      foodType: "Refeições prontas",
      urgency: "HIGH",
    },
    {
      id: "2",
      donorName: "Padaria do Bairro",
      description: "30 pães franceses e doces",
      portions: 30,
      latitude: -23.5515,
      longitude: -46.6343,
      distance: 0.8,
      pickupBy: "2024-01-15T16:00:00",
      status: "AVAILABLE",
      foodType: "Panificados",
      urgency: "MEDIUM",
    },
    {
      id: "3",
      donorName: "Supermercado Verde",
      description: "Frutas e verduras frescas",
      portions: 25,
      latitude: -23.5495,
      longitude: -46.6323,
      distance: 1.5,
      pickupBy: "2024-01-15T20:00:00",
      status: "RESERVED",
      foodType: "Hortifruti",
      urgency: "LOW",
    },
    {
      id: "4",
      donorName: "Cafeteria Moderna",
      description: "Salgados e bebidas quentes",
      portions: 12,
      latitude: -23.5525,
      longitude: -46.6353,
      distance: 2.1,
      pickupBy: "2024-01-15T15:30:00",
      status: "AVAILABLE",
      foodType: "Lanches",
      urgency: "HIGH",
    },
    {
      id: "5",
      donorName: "Pizzaria Família",
      description: "Pizzas inteiras e fatias",
      portions: 8,
      latitude: -23.5485,
      longitude: -46.6313,
      distance: 1.8,
      pickupBy: "2024-01-15T21:00:00",
      status: "AVAILABLE",
      foodType: "Pizza",
      urgency: "MEDIUM",
    },
  ];

  const handleOfferSelect = (offer: MapOffer) => {
    setSelectedOffer(offer);
    // Aqui você pode navegar para a página de detalhes da oferta
    console.log("Oferta selecionada:", offer);
  };

  const handleLocationChange = (location: LocationResult) => {
    setUserLocation(location);
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Ofertas de Alimentos
          </h1>
          <p className='text-gray-600'>
            Encontre ofertas de alimentos disponíveis próximas à sua localização
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className='mb-6 flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='bg-white rounded-lg p-1 shadow-sm border border-gray-200'>
              <button
                onClick={() => setViewMode("interactive")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "interactive"
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Map className='h-4 w-4' />
                <span>Mapa Interativo</span>
              </button>
            </div>

            <div className='bg-white rounded-lg p-1 shadow-sm border border-gray-200'>
              <button
                onClick={() => setViewMode("classic")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "classic"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Grid className='h-4 w-4' />
                <span>Vista Clássica</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className='flex items-center space-x-6 text-sm text-gray-600'>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-green-500 rounded-full'></div>
              <span>
                {offers.filter((o) => o.status === "AVAILABLE").length}{" "}
                Disponíveis
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
              <span>
                {offers.filter((o) => o.status === "RESERVED").length}{" "}
                Reservadas
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-red-500 rounded-full'></div>
              <span>
                {offers.filter((o) => o.urgency === "HIGH").length} Urgentes
              </span>
            </div>
          </div>
        </div>

        {/* Current Location Display */}
        {userLocation && (
          <div className='mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
            <div className='flex items-center space-x-3'>
              <div className='bg-blue-100 rounded-full p-2'>
                <Map className='h-5 w-5 text-blue-600' />
              </div>
              <div>
                <p className='text-sm font-medium text-gray-900'>
                  Localização atual:
                </p>
                <p className='text-sm text-gray-600'>{userLocation.address}</p>
              </div>
            </div>
          </div>
        )}

        {/* Map Component */}
        <div className='mb-8'>
          {viewMode === "interactive" ? (
            <InteractiveMap
              offers={offers}
              userLocation={userLocation || undefined}
              onOfferSelect={handleOfferSelect}
              onLocationChange={handleLocationChange}
            />
          ) : (
            <MapView
              offers={offers}
              userLocation={
                userLocation
                  ? {
                      latitude: userLocation.latitude,
                      longitude: userLocation.longitude,
                    }
                  : undefined
              }
              onOfferSelect={handleOfferSelect}
            />
          )}
        </div>

        {/* Quick Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Total de Porções
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {offers.reduce((sum, offer) => sum + offer.portions, 0)}
                </p>
              </div>
              <div className='bg-green-100 rounded-full p-3'>
                <List className='h-6 w-6 text-green-600' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Ofertas Disponíveis
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {offers.filter((o) => o.status === "AVAILABLE").length}
                </p>
              </div>
              <div className='bg-blue-100 rounded-full p-3'>
                <Filter className='h-6 w-6 text-blue-600' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Próximas (3km)
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {userLocation
                    ? offers.filter((o) => (o.distance || 0) <= 3).length
                    : "-"}
                </p>
              </div>
              <div className='bg-purple-100 rounded-full p-3'>
                <Map className='h-6 w-6 text-purple-600' />
              </div>
            </div>
          </div>
        </div>

        {/* Selected Offer Details */}
        {selectedOffer && (
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Oferta Selecionada
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <h4 className='font-medium text-gray-900 mb-2'>
                  {selectedOffer.donorName}
                </h4>
                <p className='text-gray-600 mb-4'>
                  {selectedOffer.description}
                </p>

                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Porções:</span>
                    <span className='font-medium'>
                      {selectedOffer.portions}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Tipo:</span>
                    <span className='font-medium'>
                      {selectedOffer.foodType}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Status:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        selectedOffer.status === "AVAILABLE"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {selectedOffer.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className='flex flex-col justify-center space-y-3'>
                <button className='bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors'>
                  Ver Detalhes Completos
                </button>
                <button className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors'>
                  Como Chegar
                </button>
                {selectedOffer.status === "AVAILABLE" && (
                  <button className='bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors'>
                    Reservar Agora
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;
