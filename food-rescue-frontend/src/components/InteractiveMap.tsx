import React, { useState, useEffect } from "react";
import {
  MapPin,
  Navigation,
  Filter,
  Clock,
  Package,
  AlertCircle,
} from "lucide-react";
import { useGoogleMaps, LocationResult } from "../hooks/useGoogleMaps";
import { MapOffer } from "../types";
import LocationSelector from "./LocationSelector";

interface InteractiveMapProps {
  offers?: MapOffer[];
  onOfferSelect: (offer: MapOffer) => void;
  userLocation?: LocationResult;
  onLocationChange?: (location: LocationResult) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  offers = [],
  onOfferSelect,
  userLocation,
  onLocationChange,
}) => {
  const [selectedOffer, setSelectedOffer] = useState<MapOffer | null>(null);
  const [filter, setFilter] = useState<"all" | "nearby" | "urgent">("all");
  const [currentLocation, setCurrentLocation] = useState<LocationResult | null>(
    userLocation || null
  );
  const [showLocationSelector, setShowLocationSelector] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { getCurrentLocation, isLoading } = useGoogleMaps({ apiKey });

  // Mock data se não houver ofertas
  const mockOffers: MapOffer[] = [
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
  ];

  const displayOffers = offers.length > 0 ? offers : mockOffers;

  useEffect(() => {
    if (!currentLocation && !isLoading) {
      getCurrentLocation()
        .then((location) => {
          setCurrentLocation(location);
          onLocationChange?.(location);
        })
        .catch(console.error);
    }
  }, [currentLocation, isLoading, getCurrentLocation, onLocationChange]);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Raio da Terra em km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const filteredOffers = displayOffers.filter((offer) => {
    switch (filter) {
      case "nearby":
        if (!currentLocation) return true;
        const distance = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          offer.latitude,
          offer.longitude
        );
        return distance <= 3; // 3km radius
      case "urgent":
        const now = new Date();
        const pickupTime = new Date(offer.pickupBy);
        const hoursUntilPickup =
          (pickupTime.getTime() - now.getTime()) / (1000 * 60 * 60);
        return hoursUntilPickup <= 4 || offer.urgency === "HIGH";
      default:
        return true;
    }
  });

  const getStatusColor = (status: MapOffer["status"]) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-500";
      case "RESERVED":
        return "bg-yellow-500";
      case "IN_TRANSIT":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getUrgencyColor = (urgency: MapOffer["urgency"]) => {
    switch (urgency) {
      case "HIGH":
        return "border-red-400 shadow-red-100";
      case "MEDIUM":
        return "border-yellow-400 shadow-yellow-100";
      default:
        return "border-green-400 shadow-green-100";
    }
  };

  const formatTimeUntilPickup = (pickupBy: string) => {
    const now = new Date();
    const pickup = new Date(pickupBy);
    const diffInHours = Math.ceil(
      (pickup.getTime() - now.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours <= 0) return "Expirado";
    if (diffInHours <= 1) return "Menos de 1h";
    if (diffInHours <= 24) return `${diffInHours}h restantes`;

    const days = Math.ceil(diffInHours / 24);
    return `${days} dias`;
  };

  const handleLocationSelect = (location: LocationResult) => {
    setCurrentLocation(location);
    setShowLocationSelector(false);
    onLocationChange?.(location);
  };

  return (
    <div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden'>
      {/* Header */}
      <div className='px-6 py-4 border-b border-gray-200'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold text-gray-900 flex items-center'>
            <MapPin className='h-6 w-6 mr-2 text-green-600' />
            Mapa de Ofertas
          </h2>

          <button
            onClick={() => setShowLocationSelector(!showLocationSelector)}
            className='flex items-center space-x-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm'
          >
            <Navigation className='h-4 w-4' />
            <span>Alterar Localização</span>
          </button>
        </div>

        {/* Location Selector */}
        {showLocationSelector && (
          <div className='mb-4'>
            <LocationSelector
              onLocationSelect={handleLocationSelect}
              initialLocation={currentLocation || undefined}
              className='w-full'
            />
          </div>
        )}

        {/* Current Location Display */}
        {currentLocation && (
          <div className='mb-4 p-3 bg-blue-50 rounded-lg'>
            <div className='flex items-center text-sm text-blue-700'>
              <Navigation className='h-4 w-4 mr-2' />
              <span className='font-medium'>Sua localização:</span>
              <span className='ml-2 truncate'>{currentLocation.address}</span>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className='flex items-center space-x-2'>
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              filter === "all"
                ? "bg-green-100 text-green-700 border-green-300"
                : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
            }`}
          >
            Todas ({displayOffers.length})
          </button>
          <button
            onClick={() => setFilter("nearby")}
            className={`px-3 py-1 text-sm rounded-full border transition-colors flex items-center ${
              filter === "nearby"
                ? "bg-blue-100 text-blue-700 border-blue-300"
                : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
            }`}
          >
            <Navigation className='h-3 w-3 mr-1' />
            Próximas
          </button>
          <button
            onClick={() => setFilter("urgent")}
            className={`px-3 py-1 text-sm rounded-full border transition-colors flex items-center ${
              filter === "urgent"
                ? "bg-red-100 text-red-700 border-red-300"
                : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
            }`}
          >
            <AlertCircle className='h-3 w-3 mr-1' />
            Urgentes
          </button>
        </div>
      </div>

      <div className='flex h-96'>
        {/* Map Area */}
        <div className='flex-1 relative bg-gradient-to-br from-green-50 via-blue-25 to-green-25'>
          {isLoading ? (
            <div className='flex items-center justify-center h-full'>
              <div className='text-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto'></div>
                <p className='mt-4 text-gray-600'>Carregando localização...</p>
              </div>
            </div>
          ) : (
            <div className='h-full relative overflow-hidden'>
              {/* Mock Map Background */}
              <div className='absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-green-50'>
                {/* Grid pattern */}
                <div className='absolute inset-0 opacity-10'>
                  <div className='grid grid-cols-20 grid-rows-20 h-full w-full'>
                    {Array.from({ length: 400 }).map((_, i) => (
                      <div key={i} className='border border-gray-300' />
                    ))}
                  </div>
                </div>
              </div>

              {/* User Location */}
              {currentLocation && (
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20'>
                  <div className='bg-blue-600 rounded-full p-3 shadow-lg border-2 border-white'>
                    <Navigation className='h-5 w-5 text-white' />
                  </div>
                  <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-l-transparent border-r-transparent border-t-blue-600'></div>

                  {/* User location label */}
                  <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap'>
                    Você está aqui
                  </div>
                </div>
              )}

              {/* Offer Markers */}
              {filteredOffers.map((offer, index) => {
                const isSelected = selectedOffer?.id === offer.id;
                return (
                  <div
                    key={offer.id}
                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 z-10 ${
                      isSelected ? "scale-110 z-30" : ""
                    }`}
                    style={{
                      top: `${30 + (index % 3) * 25}%`,
                      left: `${25 + (index % 4) * 20}%`,
                    }}
                    onClick={() => setSelectedOffer(offer)}
                  >
                    <div
                      className={`${getStatusColor(
                        offer.status
                      )} rounded-full p-2 shadow-lg border-2 ${
                        isSelected
                          ? "border-white shadow-xl"
                          : "border-gray-200"
                      } ${getUrgencyColor(offer.urgency)}`}
                    >
                      <Package className='h-4 w-4 text-white' />
                    </div>

                    {/* Urgency indicator */}
                    {offer.urgency === "HIGH" && (
                      <div className='absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3 animate-pulse'></div>
                    )}

                    {/* Quick preview on hover */}
                    <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-40'>
                      <p className='text-xs font-medium'>{offer.donorName}</p>
                      <p className='text-xs text-gray-600'>
                        {offer.portions} porções
                      </p>
                      <p className='text-xs text-gray-500'>{offer.foodType}</p>
                    </div>
                  </div>
                );
              })}

              {/* Map Controls */}
              <div className='absolute top-4 right-4 flex flex-col space-y-2 z-20'>
                <button className='bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
                  <Filter className='h-4 w-4 text-gray-600' />
                </button>
              </div>

              {/* Legend */}
              <div className='absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 z-20'>
                <p className='text-xs font-medium text-gray-900 mb-2'>
                  Status:
                </p>
                <div className='space-y-1'>
                  <div className='flex items-center'>
                    <div className='w-3 h-3 bg-green-500 rounded-full mr-2'></div>
                    <span className='text-xs text-gray-600'>Disponível</span>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-3 h-3 bg-yellow-500 rounded-full mr-2'></div>
                    <span className='text-xs text-gray-600'>Reservado</span>
                  </div>
                  <div className='flex items-center'>
                    <div className='w-3 h-3 bg-blue-500 rounded-full mr-2'></div>
                    <span className='text-xs text-gray-600'>Em trânsito</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Offer Details Sidebar */}
        <div className='w-80 border-l border-gray-200 bg-gray-50'>
          {selectedOffer ? (
            <div className='p-4 h-full overflow-y-auto'>
              <div className='bg-white rounded-lg p-4 shadow-sm'>
                <div className='flex items-start justify-between mb-3'>
                  <h3 className='font-semibold text-gray-900'>
                    {selectedOffer.donorName}
                  </h3>
                  <div className='flex items-center space-x-2'>
                    <span
                      className={`px-2 py-1 text-xs rounded-full text-white ${getStatusColor(
                        selectedOffer.status
                      )}`}
                    >
                      {selectedOffer.status}
                    </span>
                    {selectedOffer.urgency === "HIGH" && (
                      <span className='px-2 py-1 text-xs rounded-full bg-red-100 text-red-700'>
                        Urgente
                      </span>
                    )}
                  </div>
                </div>

                <p className='text-sm text-gray-600 mb-4'>
                  {selectedOffer.description}
                </p>

                <div className='space-y-3 text-sm'>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-600'>Tipo de alimento:</span>
                    <span className='font-medium'>
                      {selectedOffer.foodType}
                    </span>
                  </div>

                  <div className='flex items-center justify-between'>
                    <span className='text-gray-600'>Porções:</span>
                    <span className='font-medium'>
                      {selectedOffer.portions}
                    </span>
                  </div>

                  {selectedOffer.distance && (
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-600'>Distância:</span>
                      <span className='font-medium'>
                        {selectedOffer.distance.toFixed(1)}km
                      </span>
                    </div>
                  )}

                  <div className='flex items-center justify-between'>
                    <span className='text-gray-600'>Retirar até:</span>
                    <span className='font-medium flex items-center'>
                      <Clock className='h-4 w-4 mr-1' />
                      {formatTimeUntilPickup(selectedOffer.pickupBy)}
                    </span>
                  </div>
                </div>

                <div className='mt-6 space-y-2'>
                  <button
                    onClick={() => onOfferSelect(selectedOffer)}
                    className='w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium'
                  >
                    Ver Detalhes Completos
                  </button>

                  <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'>
                    Como Chegar
                  </button>

                  {selectedOffer.status === "AVAILABLE" && (
                    <button className='w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium'>
                      Reservar Agora
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className='p-8 text-center h-full flex flex-col justify-center'>
              <MapPin className='h-12 w-12 text-gray-300 mx-auto mb-4' />
              <p className='text-gray-600 font-medium'>
                Selecione uma oferta no mapa
              </p>
              <p className='text-sm text-gray-500 mt-2'>
                Clique em um marcador para ver os detalhes da oferta
              </p>

              {filteredOffers.length === 0 && (
                <div className='mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
                  <p className='text-sm text-yellow-700'>
                    Nenhuma oferta encontrada com os filtros atuais
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className='px-6 py-4 border-t border-gray-200 bg-gray-50'>
        <div className='flex items-center justify-between text-sm text-gray-600'>
          <span>
            {filteredOffers.length} ofertas
            {filter !== "all" &&
              ` (${filter === "nearby" ? "próximas" : "urgentes"})`}{" "}
            encontradas
          </span>
          <div className='flex items-center space-x-4'>
            <span>Atualizado agora</span>
            {!apiKey && (
              <span className='text-amber-600'>
                ⚠️ Google Maps não configurado
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
