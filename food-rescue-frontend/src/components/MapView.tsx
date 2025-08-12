import { useState, useEffect } from "react";
import { MapPin, Navigation, Filter, Zap, Clock } from "lucide-react";
import { MapOffer, LocationCoordinates } from "../types";

interface MapViewProps {
  offers: MapOffer[];
  userLocation?: LocationCoordinates;
  onOfferSelect: (offer: MapOffer) => void;
}

const MapView = ({ offers, userLocation, onOfferSelect }: MapViewProps) => {
  const [selectedOffer, setSelectedOffer] = useState<MapOffer | null>(null);
  const [filter, setFilter] = useState<"all" | "nearby" | "urgent">("all");
  const [mapLoaded, setMapLoaded] = useState(false);

  // Mock data for demonstration (use props if available)
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
  ];

  useEffect(() => {
    // Simular carregamento do mapa
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredOffers = (offers.length > 0 ? offers : mockOffers).filter(
    (offer) => {
      switch (filter) {
        case "nearby":
          return offer.distance && offer.distance <= 2;
        case "urgent":
          const now = new Date();
          const pickupTime = new Date(offer.pickupBy);
          const hoursUntilPickup =
            (pickupTime.getTime() - now.getTime()) / (1000 * 60 * 60);
          return hoursUntilPickup <= 4;
        default:
          return true;
      }
    }
  );

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

  return (
    <div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden'>
      {/* Header */}
      <div className='px-6 py-4 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-gray-900 flex items-center'>
            <MapPin className='h-6 w-6 mr-2 text-green-600' />
            Mapa de Ofertas
          </h2>

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
              Todas
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
              <Zap className='h-3 w-3 mr-1' />
              Urgentes
            </button>
          </div>
        </div>
      </div>

      <div className='flex h-96'>
        {/* Map Area */}
        <div className='flex-1 relative bg-gray-100'>
          {!mapLoaded ? (
            <div className='flex items-center justify-center h-full'>
              <div className='text-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto'></div>
                <p className='mt-4 text-gray-600'>Carregando mapa...</p>
              </div>
            </div>
          ) : (
            <div className='h-full relative overflow-hidden'>
              {/* Mock Map Background */}
              <div className='absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-green-50'>
                {/* Grid pattern to simulate map */}
                <div className='absolute inset-0 opacity-20'>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className='flex'>
                      {Array.from({ length: 20 }).map((_, j) => (
                        <div
                          key={j}
                          className='w-8 h-8 border border-gray-300'
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* User Location */}
              {userLocation && (
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <div className='bg-blue-600 rounded-full p-2 shadow-lg'>
                    <Navigation className='h-4 w-4 text-white' />
                  </div>
                  <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-blue-600'></div>
                </div>
              )}

              {/* Offer Markers */}
              {filteredOffers.map((offer, index) => (
                <div
                  key={offer.id}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
                    selectedOffer?.id === offer.id ? "scale-110 z-10" : ""
                  }`}
                  style={{
                    top: `${45 + index * 8}%`,
                    left: `${35 + index * 15}%`,
                  }}
                  onClick={() => setSelectedOffer(offer)}
                >
                  <div
                    className={`${getStatusColor(
                      offer.status
                    )} rounded-full p-2 shadow-lg`}
                  >
                    <MapPin className='h-4 w-4 text-white' />
                  </div>
                  <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-l-transparent border-r-transparent border-t-current'></div>

                  {/* Offer preview on hover */}
                  <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap'>
                    <p className='text-xs font-medium'>{offer.donorName}</p>
                    <p className='text-xs text-gray-600'>
                      {offer.portions} porções
                    </p>
                  </div>
                </div>
              ))}

              {/* Map Controls */}
              <div className='absolute top-4 right-4 flex flex-col space-y-2'>
                <button className='bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
                  <Navigation className='h-4 w-4 text-gray-600' />
                </button>
                <button className='bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
                  <Filter className='h-4 w-4 text-gray-600' />
                </button>
              </div>

              {/* Legend */}
              <div className='absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3'>
                <p className='text-xs font-medium text-gray-900 mb-2'>
                  Legenda:
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
            <div className='p-4'>
              <div className='bg-white rounded-lg p-4 shadow-sm'>
                <div className='flex items-start justify-between mb-3'>
                  <h3 className='font-semibold text-gray-900'>
                    {selectedOffer.donorName}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full text-white ${getStatusColor(
                      selectedOffer.status
                    )}`}
                  >
                    {selectedOffer.status}
                  </span>
                </div>

                <p className='text-sm text-gray-600 mb-3'>
                  {selectedOffer.description}
                </p>

                <div className='space-y-2 text-sm'>
                  <div className='flex items-center text-gray-600'>
                    <MapPin className='h-4 w-4 mr-2' />
                    {selectedOffer.distance
                      ? `${selectedOffer.distance}km de distância`
                      : "Localização disponível"}
                  </div>

                  <div className='flex items-center text-gray-600'>
                    <Clock className='h-4 w-4 mr-2' />
                    {formatTimeUntilPickup(selectedOffer.pickupBy)}
                  </div>

                  <div className='flex items-center text-gray-600'>
                    <span className='text-lg mr-2'>🍽️</span>
                    {selectedOffer.portions} porções disponíveis
                  </div>
                </div>

                <div className='mt-4 space-y-2'>
                  <button
                    onClick={() => onOfferSelect(selectedOffer)}
                    className='w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium'
                  >
                    Ver Detalhes
                  </button>

                  <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'>
                    Como Chegar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className='p-8 text-center'>
              <MapPin className='h-12 w-12 text-gray-300 mx-auto mb-4' />
              <p className='text-gray-600 font-medium'>
                Selecione uma oferta no mapa
              </p>
              <p className='text-sm text-gray-500 mt-2'>
                Clique em um marcador para ver os detalhes da oferta
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className='px-6 py-4 border-t border-gray-200 bg-gray-50'>
        <div className='flex items-center justify-between text-sm text-gray-600'>
          <span>
            {filteredOffers.length} ofertas{" "}
            {filter !== "all"
              ? `(${filter === "nearby" ? "próximas" : "urgentes"})`
              : "encontradas"}
          </span>
          <span>Atualizado agora</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
