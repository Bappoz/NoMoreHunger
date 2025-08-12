import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateOfferRequest } from "../types";
import { offerService } from "../services/api";
import { Send, MapPin, Users, Clock, Phone, User } from "lucide-react";
import LocationSelector from "./LocationSelector";
import FallbackLocationSelector from "./FallbackLocationSelector";

interface CreateOfferFormProps {
  onOfferCreated: () => void;
}

const CreateOfferForm = ({ onOfferCreated }: CreateOfferFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [useLocationSelector, setUseLocationSelector] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateOfferRequest>();

  const watchedLatitude = watch("latitude");
  const watchedLongitude = watch("longitude");

  const handleLocationSelect = (location: {
    latitude: number;
    longitude: number;
    address?: string;
  }) => {
    setValue("latitude", location.latitude);
    setValue("longitude", location.longitude);
  };

  const handleModeToggle = (manual: boolean) => {
    setUseLocationSelector(!manual);
    if (manual) {
      // Limpar valores quando mudar para manual
      setValue("latitude", 0);
      setValue("longitude", 0);
    }
  };

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const hasApiKey = apiKey && apiKey !== "YOUR_API_KEY_HERE";

  const onSubmit = async (data: CreateOfferRequest) => {
    setIsSubmitting(true);
    setSuccess(false);

    try {
      await offerService.createOffer(data);
      setSuccess(true);
      reset();
      setTimeout(() => {
        onOfferCreated();
      }, 1500);
    } catch (error) {
      console.error("Error creating offer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className='bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center'>
        <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
          <svg
            className='w-8 h-8 text-green-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 13l4 4L19 7'
            />
          </svg>
        </div>
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>
          Oferta criada com sucesso!
        </h3>
        <p className='text-gray-600'>
          Sua oferta foi registrada e está disponível para voluntários.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white rounded-xl shadow-lg border border-gray-200 p-8'
    >
      <div className='space-y-6'>
        {/* Donor Information */}
        <div className='border-b border-gray-200 pb-6'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
            <User className='h-5 w-5 mr-2' />
            Informações do Doador
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Nome do Doador *
              </label>
              <input
                type='text'
                {...register("donorName", {
                  required: "Nome do doador é obrigatório",
                })}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                placeholder='Seu nome ou da organização'
              />
              {errors.donorName && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.donorName.message}
                </p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Contato *
              </label>
              <div className='relative'>
                <Phone className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                <input
                  type='tel'
                  {...register("donorContact", {
                    required: "Contato é obrigatório",
                  })}
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                  placeholder='(11) 99999-9999'
                />
              </div>
              {errors.donorContact && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.donorContact.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Offer Details */}
        <div className='border-b border-gray-200 pb-6'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Detalhes da Oferta
          </h3>

          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Descrição do Alimento *
              </label>
              <textarea
                {...register("description", {
                  required: "Descrição é obrigatória",
                })}
                rows={3}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                placeholder='Descreva os alimentos disponíveis (ex: 20 marmitas prontas, frutas variadas, pães...)'
              />
              {errors.description && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Número de Porções *
                </label>
                <div className='relative'>
                  <Users className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                  <input
                    type='number'
                    min='1'
                    {...register("portions", {
                      required: "Número de porções é obrigatório",
                      min: {
                        value: 1,
                        message: "Deve ter pelo menos 1 porção",
                      },
                    })}
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    placeholder='Ex: 10'
                  />
                </div>
                {errors.portions && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.portions.message}
                  </p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Retirar Até *
                </label>
                <div className='relative'>
                  <Clock className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                  <input
                    type='datetime-local'
                    {...register("pickupBy", {
                      required: "Data de retirada é obrigatória",
                    })}
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                  />
                </div>
                {errors.pickupBy && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.pickupBy.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
            <MapPin className='h-5 w-5 mr-2' />
            Localização
          </h3>

          {/* Location Selector ou campos manuais */}
          {hasApiKey ? (
            <>
              {/* Selector de modo */}
              <div className='flex space-x-2 mb-4'>
                <button
                  type='button'
                  onClick={() => handleModeToggle(false)}
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                    useLocationSelector
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  Buscar Endereço
                </button>
                <button
                  type='button'
                  onClick={() => handleModeToggle(true)}
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                    !useLocationSelector
                      ? "bg-green-100 text-green-700 border-green-300"
                      : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  Inserir Coordenadas
                </button>
              </div>

              {useLocationSelector ? (
                <LocationSelector
                  onLocationSelect={handleLocationSelect}
                  initialLocation={{
                    latitude: watchedLatitude,
                    longitude: watchedLongitude,
                    address: "",
                  }}
                />
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Latitude *
                    </label>
                    <input
                      type='number'
                      step='any'
                      {...register("latitude", {
                        required: "Latitude é obrigatória",
                        min: {
                          value: -90,
                          message: "Latitude deve estar entre -90 e 90",
                        },
                        max: {
                          value: 90,
                          message: "Latitude deve estar entre -90 e 90",
                        },
                      })}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                      placeholder='Ex: -23.5505'
                    />
                    {errors.latitude && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.latitude.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Longitude *
                    </label>
                    <input
                      type='number'
                      step='any'
                      {...register("longitude", {
                        required: "Longitude é obrigatória",
                        min: {
                          value: -180,
                          message: "Longitude deve estar entre -180 e 180",
                        },
                        max: {
                          value: 180,
                          message: "Longitude deve estar entre -180 e 180",
                        },
                      })}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                      placeholder='Ex: -46.6333'
                    />
                    {errors.longitude && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.longitude.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <FallbackLocationSelector onLocationSelect={handleLocationSelect} />
          )}

          {!useLocationSelector && hasApiKey && (
            <div className='mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
              <p className='text-sm text-blue-700'>
                💡 <strong>Dica:</strong> Use o Google Maps para obter as
                coordenadas exatas. Clique com o botão direito no local desejado
                e selecione as coordenadas.
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className='pt-6'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center'
          >
            {isSubmitting ? (
              <>
                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                Criando oferta...
              </>
            ) : (
              <>
                <Send className='h-5 w-5 mr-2' />
                Criar Oferta
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateOfferForm;
