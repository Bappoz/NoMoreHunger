import React from "react";
import MapPage from "../pages/MapPage";

const MapExample: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto py-8'>
        <div className='mb-8 text-center'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            NoMoreHunger - Sistema de Mapas
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Demonstração completa do sistema de mapas integrado com Google Maps
            API para localização automática e busca de ofertas de alimentos.
          </p>
        </div>

        {/* Status da API */}
        <div className='mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-lg font-medium text-gray-900'>
                Status da Integração
              </h3>
              <p className='text-sm text-gray-600'>
                Google Maps API:{" "}
                {import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                  ? "✅ Configurada"
                  : "⚠️ Não configurada (modo fallback)"}
              </p>
            </div>

            {/* Instruções rápidas */}
            {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
              <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-3'>
                <p className='text-xs text-yellow-700'>
                  Para ativar todas as funcionalidades, configure
                  VITE_GOOGLE_MAPS_API_KEY no .env
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Funcionalidades Disponíveis */}
        <div className='mb-8 grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
            <div className='flex items-center mb-3'>
              <div className='bg-green-100 rounded-full p-2 mr-3'>
                <svg
                  className='h-5 w-5 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              </div>
              <h4 className='font-medium text-gray-900'>
                Localização Automática
              </h4>
            </div>
            <p className='text-sm text-gray-600'>
              Detecta automaticamente sua localização usando GPS do navegador
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
            <div className='flex items-center mb-3'>
              <div className='bg-blue-100 rounded-full p-2 mr-3'>
                <svg
                  className='h-5 w-5 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
              <h4 className='font-medium text-gray-900'>Busca de Endereços</h4>
            </div>
            <p className='text-sm text-gray-600'>
              Busque qualquer endereço ou CEP usando a API do Google Maps
            </p>
          </div>

          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
            <div className='flex items-center mb-3'>
              <div className='bg-purple-100 rounded-full p-2 mr-3'>
                <svg
                  className='h-5 w-5 text-purple-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
                  />
                </svg>
              </div>
              <h4 className='font-medium text-gray-900'>Mapa Interativo</h4>
            </div>
            <p className='text-sm text-gray-600'>
              Visualize ofertas de alimentos em um mapa interativo com filtros
            </p>
          </div>
        </div>

        {/* Componente Principal */}
        <MapPage />

        {/* Informações Técnicas */}
        <div className='mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <h3 className='text-lg font-medium text-gray-900 mb-4'>
            Informações Técnicas
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h4 className='font-medium text-gray-900 mb-2'>
                Componentes Implementados
              </h4>
              <ul className='text-sm text-gray-600 space-y-1'>
                <li>✅ useGoogleMaps - Hook para integração com API</li>
                <li>✅ LocationSelector - Componente de seleção de local</li>
                <li>✅ MapView - Vista clássica do mapa</li>
                <li>✅ InteractiveMap - Mapa interativo avançado</li>
                <li>✅ MapPage - Página principal integrada</li>
              </ul>
            </div>

            <div>
              <h4 className='font-medium text-gray-900 mb-2'>
                Funcionalidades
              </h4>
              <ul className='text-sm text-gray-600 space-y-1'>
                <li>✅ Geolocalização automática</li>
                <li>✅ Busca de endereços por texto</li>
                <li>✅ Geocodificação reversa</li>
                <li>✅ Filtros de ofertas (proximidade, urgência)</li>
                <li>✅ Modo fallback sem API key</li>
                <li>✅ Interface responsiva</li>
              </ul>
            </div>
          </div>

          <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
            <h4 className='font-medium text-gray-900 mb-2'>Como Configurar</h4>
            <ol className='text-sm text-gray-600 space-y-1 list-decimal list-inside'>
              <li>
                Obtenha uma chave da API do Google Maps no Google Cloud Console
              </li>
              <li>Ative as APIs: Maps JavaScript API, Geocoding API</li>
              <li>Configure as restrições de segurança</li>
              <li>
                Adicione a chave no arquivo .env:{" "}
                <code className='bg-gray-200 px-1 rounded'>
                  VITE_GOOGLE_MAPS_API_KEY=sua_chave
                </code>
              </li>
              <li>Reinicie o servidor de desenvolvimento</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapExample;
