import { useState } from "react";
import { MapPin, Navigation, Search, AlertCircle } from "lucide-react";

interface FallbackLocationSelectorProps {
  onLocationSelect: (location: {
    latitude: number;
    longitude: number;
    address?: string;
  }) => void;
  className?: string;
}

const FallbackLocationSelector = ({
  onLocationSelect,
  className = "",
}: FallbackLocationSelectorProps) => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const getCurrentLocation = () => {
    setUseCurrentLocation(true);

    if (!navigator.geolocation) {
      alert("Geolocalização não é suportada pelo seu navegador");
      setUseCurrentLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        });
        setAddress(
          `Localização atual: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        );
        onLocationSelect({
          latitude,
          longitude,
          address: `Localização atual: ${latitude.toFixed(
            6
          )}, ${longitude.toFixed(6)}`,
        });
        setUseCurrentLocation(false);
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        alert(
          "Não foi possível obter sua localização. Por favor, insira as coordenadas manualmente."
        );
        setUseCurrentLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000,
      }
    );
  };

  const handleCoordinateChange = (
    field: "latitude" | "longitude",
    value: string
  ) => {
    const newCoordinates = { ...coordinates, [field]: value };
    setCoordinates(newCoordinates);

    if (newCoordinates.latitude && newCoordinates.longitude) {
      const lat = parseFloat(newCoordinates.latitude);
      const lng = parseFloat(newCoordinates.longitude);

      if (!isNaN(lat) && !isNaN(lng)) {
        onLocationSelect({
          latitude: lat,
          longitude: lng,
          address: address || `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
        });
      }
    }
  };

  const searchAddress = () => {
    // Simulação de busca (sem API real)
    if (address.trim()) {
      alert(
        `Busca por "${address}" - Para funcionalidade completa, configure a API do Google Maps`
      );
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className='border border-yellow-200 bg-yellow-50 rounded-lg p-4'>
        <div className='flex items-start'>
          <AlertCircle className='h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0' />
          <div>
            <h4 className='text-sm font-medium text-yellow-800'>
              Modo de Demonstração
            </h4>
            <p className='text-sm text-yellow-700 mt-1'>
              Para habilitar a busca automática de endereços, configure a API
              key do Google Maps no arquivo .env.local
            </p>
          </div>
        </div>
      </div>

      {/* Busca de endereço (demo) */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Buscar Endereço (Demo)
        </label>
        <div className='flex space-x-2'>
          <div className='flex-1 relative'>
            <Search className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
            <input
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Digite o endereço...'
              className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
            />
          </div>
          <button
            type='button'
            onClick={searchAddress}
            className='px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Localização atual */}
      <div>
        <button
          type='button'
          onClick={getCurrentLocation}
          disabled={useCurrentLocation}
          className='w-full flex items-center justify-center px-4 py-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <Navigation className='h-4 w-4 mr-2' />
          {useCurrentLocation
            ? "Obtendo localização..."
            : "Usar minha localização atual"}
        </button>
      </div>

      {/* Coordenadas manuais */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Ou insira as coordenadas manualmente:
        </label>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-xs font-medium text-gray-600 mb-1'>
              Latitude *
            </label>
            <input
              type='number'
              step='any'
              value={coordinates.latitude}
              onChange={(e) =>
                handleCoordinateChange("latitude", e.target.value)
              }
              placeholder='Ex: -23.5505'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm'
            />
          </div>
          <div>
            <label className='block text-xs font-medium text-gray-600 mb-1'>
              Longitude *
            </label>
            <input
              type='number'
              step='any'
              value={coordinates.longitude}
              onChange={(e) =>
                handleCoordinateChange("longitude", e.target.value)
              }
              placeholder='Ex: -46.6333'
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm'
            />
          </div>
        </div>
      </div>

      {/* Preview da localização */}
      {coordinates.latitude && coordinates.longitude && (
        <div className='mt-3 p-3 bg-green-50 border border-green-200 rounded-lg'>
          <div className='flex items-start'>
            <MapPin className='h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0' />
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-green-900'>
                Localização configurada:
              </p>
              <p className='text-sm text-green-700'>
                {address || `${coordinates.latitude}, ${coordinates.longitude}`}
              </p>
              <p className='text-xs text-green-600'>
                Lat: {coordinates.latitude}, Lng: {coordinates.longitude}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dica para obter coordenadas */}
      <div className='text-xs text-gray-500 bg-gray-50 p-3 rounded-lg'>
        <strong>💡 Dica:</strong> Para obter coordenadas precisas:
        <br />
        1. Acesse o Google Maps
        <br />
        2. Clique com o botão direito no local desejado
        <br />
        3. Clique nas coordenadas que aparecem
        <br />
        4. Copie e cole aqui
      </div>
    </div>
  );
};

export default FallbackLocationSelector;
