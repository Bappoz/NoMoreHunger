import { useState, useEffect } from "react";
import { MapPin, Search, Target, Loader2, Check } from "lucide-react";
import { useGoogleMaps, LocationResult } from "../hooks/useGoogleMaps";

interface LocationSelectorProps {
  onLocationSelect: (location: LocationResult) => void;
  initialLocation?: LocationResult;
  className?: string;
}

const LocationSelector = ({
  onLocationSelect,
  initialLocation,
  className = "",
}: LocationSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState(
    initialLocation?.address || ""
  );
  const [searchResults, setSearchResults] = useState<LocationResult[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationResult | null>(initialLocation || null);
  const [showResults, setShowResults] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { searchLocation, getCurrentLocation, isLoading, error } =
    useGoogleMaps({ apiKey });

  // Carregar localização inicial se fornecida
  useEffect(() => {
    if (initialLocation) {
      setSelectedLocation(initialLocation);
      setSearchQuery(initialLocation.address);
    }
  }, [initialLocation]);

  const handleSearch = async (query: string) => {
    if (!query.trim() || !apiKey) return;

    try {
      const results = await searchLocation(query);
      setSearchResults(results);
      setShowResults(true);
    } catch (err) {
      console.error("Erro ao buscar localização:", err);
      setSearchResults([]);
    }
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);

    // Clear previous timeout
    if (searchTimeout) {
      window.clearTimeout(searchTimeout);
    }

    // Set new timeout for debounced search
    if (value.trim()) {
      const timeout = window.setTimeout(() => {
        handleSearch(value);
      }, 500);
      setSearchTimeout(timeout);
    } else {
      setShowResults(false);
      setSearchResults([]);
    }
  };

  const handleLocationSelect = (location: LocationResult) => {
    setSelectedLocation(location);
    setSearchQuery(location.address);
    setShowResults(false);
    onLocationSelect({
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address,
    });
  };

  const handleGetCurrentLocation = async () => {
    try {
      const location = await getCurrentLocation();
      handleLocationSelect(location);
    } catch (err) {
      console.error("Erro ao obter localização atual:", err);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-700'>
          Localização
        </label>

        {/* Modo de seleção */}
        <div className='flex space-x-2 mb-3'>
          <button
            type='button'
            onClick={() => setSearchQuery("")}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              !apiKey || searchQuery === ""
                ? "bg-blue-100 text-blue-700 border-blue-300"
                : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
            }`}
          >
            Manual
          </button>
          {apiKey && (
            <button
              type='button'
              onClick={() => handleSearchInputChange("buscar")}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                searchQuery !== ""
                  ? "bg-blue-100 text-blue-700 border-blue-300"
                  : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
              }`}
            >
              Buscar Endereço
            </button>
          )}
        </div>

        {/* Search input - só mostra se API key estiver configurada */}
        {apiKey && (
          <div className='relative'>
            <div className='relative'>
              <Search className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                placeholder='Digite o endereço ou nome do local...'
                className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
              />
              {isLoading && (
                <Loader2 className='absolute right-3 top-3 h-5 w-5 text-gray-400 animate-spin' />
              )}
              {selectedLocation && !isLoading && (
                <Check className='absolute right-3 top-3 h-5 w-5 text-green-500' />
              )}
            </div>

            {/* Get current location button */}
            <button
              type='button'
              onClick={handleGetCurrentLocation}
              disabled={isLoading}
              className='mt-2 w-full flex items-center justify-center px-4 py-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Target className='h-4 w-4 mr-2' />
              Usar minha localização atual
            </button>

            {/* Search results */}
            {showResults && searchResults.length > 0 && (
              <div className='absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    type='button'
                    onClick={() => handleLocationSelect(result)}
                    className='w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0'
                  >
                    <div className='flex items-start'>
                      <MapPin className='h-4 w-4 text-gray-400 mt-1 mr-2 flex-shrink-0' />
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-gray-900 truncate'>
                          {result.address}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {result.latitude.toFixed(6)},{" "}
                          {result.longitude.toFixed(6)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className='mt-2 p-3 bg-red-50 border border-red-200 rounded-lg'>
                <p className='text-sm text-red-600'>{error}</p>
              </div>
            )}
          </div>
        )}

        {/* Selected location display */}
        {selectedLocation && (
          <div className='mt-3 p-3 bg-green-50 border border-green-200 rounded-lg'>
            <div className='flex items-start'>
              <MapPin className='h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0' />
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-green-900'>
                  Localização selecionada:
                </p>
                <p className='text-sm text-green-700 truncate'>
                  {selectedLocation.address}
                </p>
                <p className='text-xs text-green-600'>
                  Lat: {selectedLocation.latitude.toFixed(6)}, Lng:{" "}
                  {selectedLocation.longitude.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Manual input fallback message */}
        {!apiKey && (
          <div className='mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg'>
            <p className='text-sm text-yellow-700'>
              <strong>Modo Manual:</strong> Configure a API key do Google Maps
              no arquivo .env.local para habilitar a busca automática de
              endereços.
            </p>
            <p className='text-xs text-yellow-600 mt-1'>
              Você pode inserir as coordenadas manualmente nos campos abaixo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
