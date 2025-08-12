import React, { useState } from "react";
import { MapPin, Navigation, Search, Settings } from "lucide-react";
import MapPage from "./pages/MapPage";

const App: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);

  if (showDemo) {
    return <MapPage />;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50'>
      <div className='container mx-auto px-4 py-12'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold text-gray-900 mb-4'>
            🗺️ NoMoreHunger Maps
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Sistema completo de integração com Google Maps para localização
            automática e busca de ofertas de alimentos próximas ao usuário.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
          <div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100'>
            <div className='bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto'>
              <MapPin className='h-8 w-8 text-green-600' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-4 text-center'>
              Localização Automática
            </h3>
            <p className='text-gray-600 text-center'>
              Detecta automaticamente sua localização usando GPS do navegador
              com fallback gracioso para inserção manual.
            </p>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100'>
            <div className='bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto'>
              <Search className='h-8 w-8 text-blue-600' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-4 text-center'>
              Busca Inteligente
            </h3>
            <p className='text-gray-600 text-center'>
              Busque qualquer endereço ou CEP usando a poderosa API de Geocoding
              do Google Maps com sugestões em tempo real.
            </p>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100'>
            <div className='bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto'>
              <Navigation className='h-8 w-8 text-purple-600' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-4 text-center'>
              Mapas Interativos
            </h3>
            <p className='text-gray-600 text-center'>
              Visualize ofertas de alimentos em mapas interativos com filtros
              por proximidade, urgência e tipo de alimento.
            </p>
          </div>
        </div>

        {/* Status Card */}
        <div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Status da Integração
              </h3>
              <p className='text-gray-600'>
                Google Maps API:{" "}
                {import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                  ? "✅ Configurada e funcionando"
                  : "⚠️ Não configurada (modo fallback ativo)"}
              </p>
            </div>
            <Settings className='h-12 w-12 text-gray-400' />
          </div>

          {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
            <div className='mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
              <p className='text-sm text-yellow-800'>
                <strong>💡 Dica:</strong> Para ativar todas as funcionalidades,
                configure{" "}
                <code className='bg-yellow-100 px-1 rounded'>
                  VITE_GOOGLE_MAPS_API_KEY
                </code>{" "}
                no arquivo .env
              </p>
            </div>
          )}
        </div>

        {/* Demo Button */}
        <div className='text-center mb-12'>
          <button
            onClick={() => setShowDemo(true)}
            className='bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200'
          >
            🚀 Ver Demonstração Interativa
          </button>
        </div>

        {/* Implementation Details */}
        <div className='bg-white rounded-xl shadow-lg p-8 border border-gray-100'>
          <h3 className='text-2xl font-bold text-gray-900 mb-6'>
            📁 Implementação Técnica
          </h3>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div>
              <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                Componentes Criados
              </h4>
              <ul className='space-y-2 text-gray-600'>
                <li className='flex items-center'>
                  <span className='text-green-500 mr-2'>✅</span>
                  <code className='bg-gray-100 px-2 py-1 rounded text-sm'>
                    useGoogleMaps.ts
                  </code>
                  <span className='ml-2'>- Hook principal</span>
                </li>
                <li className='flex items-center'>
                  <span className='text-green-500 mr-2'>✅</span>
                  <code className='bg-gray-100 px-2 py-1 rounded text-sm'>
                    LocationSelector.tsx
                  </code>
                  <span className='ml-2'>- Seletor de local</span>
                </li>
                <li className='flex items-center'>
                  <span className='text-green-500 mr-2'>✅</span>
                  <code className='bg-gray-100 px-2 py-1 rounded text-sm'>
                    MapView.tsx
                  </code>
                  <span className='ml-2'>- Vista clássica</span>
                </li>
                <li className='flex items-center'>
                  <span className='text-green-500 mr-2'>✅</span>
                  <code className='bg-gray-100 px-2 py-1 rounded text-sm'>
                    InteractiveMap.tsx
                  </code>
                  <span className='ml-2'>- Mapa avançado</span>
                </li>
                <li className='flex items-center'>
                  <span className='text-green-500 mr-2'>✅</span>
                  <code className='bg-gray-100 px-2 py-1 rounded text-sm'>
                    MapPage.tsx
                  </code>
                  <span className='ml-2'>- Página principal</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                Funcionalidades
              </h4>
              <ul className='space-y-2 text-gray-600'>
                <li className='flex items-center'>
                  <span className='text-green-500 mr-2'>✅</span>
                  Geolocalização automática
                </li>
                <li className='flex items-center'>
                  <span className='text-green-500 mr-2'>✅</span>
                  Busca de endereços por texto
                </li>
                <li className='flex items-center'>
                  <span className='text-green-500 mr-2'>✅</span>
                  Geocodificação reversa
                </li>
                <li className='flex items-center'>
                  <span className='text-green-500 mr-2'>✅</span>
                  Filtros por proximidade
                </li>
                <li className='flex items-center'>
                  <span className='text-green-500 mr-2'>✅</span>
                  Modo fallback sem API
                </li>
                <li className='flex items-center'>
                  <span className='text-green-500 mr-2'>✅</span>
                  Interface responsiva
                </li>
              </ul>
            </div>
          </div>

          <div className='mt-8 p-6 bg-gray-50 rounded-lg'>
            <h4 className='text-lg font-semibold text-gray-900 mb-3'>
              🔧 Como Configurar
            </h4>
            <ol className='list-decimal list-inside text-gray-600 space-y-2'>
              <li>
                Obter chave da API no{" "}
                <a
                  href='https://console.cloud.google.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:underline'
                >
                  Google Cloud Console
                </a>
              </li>
              <li>Ativar APIs: Maps JavaScript API, Geocoding API</li>
              <li>Configurar restrições de segurança</li>
              <li>
                Adicionar no .env:{" "}
                <code className='bg-gray-200 px-1 rounded'>
                  VITE_GOOGLE_MAPS_API_KEY=sua_chave
                </code>
              </li>
              <li>
                Reiniciar servidor:{" "}
                <code className='bg-gray-200 px-1 rounded'>npm run dev</code>
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className='text-center mt-12 text-gray-500'>
          <p>
            Desenvolvido com ❤️ para o projeto NoMoreHunger
            <br />
            Integração Google Maps • React + TypeScript • Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
