import { useState, useCallback } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export interface LocationResult {
  latitude: number;
  longitude: number;
  address: string;
  placeId?: string;
}

export interface UseGoogleMapsProps {
  apiKey?: string;
}

export const useGoogleMaps = ({ apiKey }: UseGoogleMapsProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLocation = useCallback(
    async (query: string): Promise<LocationResult[]> => {
      if (!apiKey) {
        throw new Error("Google Maps API key is required");
      }

      setIsLoading(true);
      setError(null);

      try {
        const loader = new Loader({
          apiKey,
          version: "weekly",
          libraries: ["geocoding"],
        });

        await loader.importLibrary("geocoding");

        return new Promise((resolve, reject) => {
          const geocoder = new google.maps.Geocoder();

          geocoder.geocode(
            { address: query },
            (
              results: google.maps.GeocoderResult[] | null,
              status: google.maps.GeocoderStatus
            ) => {
              if (status === "OK" && results) {
                const locations: LocationResult[] = results.map(
                  (result: google.maps.GeocoderResult) => ({
                    latitude: result.geometry.location.lat(),
                    longitude: result.geometry.location.lng(),
                    address: result.formatted_address,
                    placeId: result.place_id,
                  })
                );
                resolve(locations);
              } else {
                reject(new Error(`Geocoding failed: ${status}`));
              }
            }
          );
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao buscar localização";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey]
  );

  const getCurrentLocation = useCallback((): Promise<LocationResult> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalização não é suportada pelo navegador"));
        return;
      }

      setIsLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            if (!apiKey) {
              resolve({
                latitude,
                longitude,
                address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
              });
              return;
            }

            // Reverse geocoding para obter o endereço
            const loader = new Loader({
              apiKey,
              version: "weekly",
              libraries: ["geocoding"],
            });

            await loader.importLibrary("geocoding");
            const geocoder = new google.maps.Geocoder();

            geocoder.geocode(
              { location: { lat: latitude, lng: longitude } },
              (
                results: google.maps.GeocoderResult[] | null,
                status: google.maps.GeocoderStatus
              ) => {
                if (status === "OK" && results && results[0]) {
                  resolve({
                    latitude,
                    longitude,
                    address: results[0].formatted_address,
                    placeId: results[0].place_id,
                  });
                } else {
                  resolve({
                    latitude,
                    longitude,
                    address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
                  });
                }
              }
            );
          } catch (err) {
            const errorMessage =
              err instanceof Error
                ? err.message
                : "Erro ao obter localização atual";
            setError(errorMessage);
            reject(new Error(errorMessage));
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          let errorMessage = "Erro ao obter localização";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Permissão de localização negada";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Localização indisponível";
              break;
            case error.TIMEOUT:
              errorMessage = "Timeout ao obter localização";
              break;
          }
          setError(errorMessage);
          setIsLoading(false);
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000, // 10 minutes
        }
      );
    });
  }, [apiKey]);

  return {
    searchLocation,
    getCurrentLocation,
    isLoading,
    error,
  };
};
