# 🗺️ Integração Google Maps - NoMoreHunger

## Visão Geral

Este documento descreve a implementação completa da integração com Google Maps API no sistema NoMoreHunger, permitindo localização automática e busca de ofertas de alimentos baseada em coordenadas geográficas.

## ✨ Funcionalidades Implementadas

### 🔍 Localização Automática

- **Geolocalização HTML5**: Detecta automaticamente a localização do usuário
- **Fallback Gracioso**: Interface manual quando GPS não está disponível
- **Tratamento de Erros**: Mensagens informativas para problemas de permissão

### 📍 Busca de Endereços

- **Geocoding API**: Conversão de endereço para coordenadas
- **Reverse Geocoding**: Conversão de coordenadas para endereço legível
- **Busca em Tempo Real**: Sugestões instantâneas durante a digitação

### 🗺️ Visualização Interativa

- **Mapa Clássico**: Vista tradicional com marcadores
- **Mapa Interativo**: Interface avançada com filtros e detalhes
- **Filtros Dinâmicos**: Por proximidade, urgência e tipo de alimento

## 📁 Estrutura dos Arquivos

```
src/
├── hooks/
│   └── useGoogleMaps.ts          # Hook principal para Google Maps API
├── components/
│   ├── LocationSelector.tsx      # Componente de seleção de localização
│   ├── MapView.tsx              # Vista clássica do mapa
│   └── InteractiveMap.tsx       # Mapa interativo avançado
├── pages/
│   └── MapPage.tsx              # Página principal integrando todos os componentes
├── types/
│   └── index.ts                 # Tipos TypeScript para mapas e localização
└── examples/
    └── MapExample.tsx           # Exemplo de uso dos componentes
```

## 🔧 Configuração

### 1. Obter Chave da API

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie/selecione um projeto
3. Ative as APIs necessárias:
   - Maps JavaScript API
   - Geocoding API
   - Places API (opcional)

### 2. Configurar Segurança

```javascript
// Restrições recomendadas no Google Cloud Console
HTTP referrers:
- localhost:* (desenvolvimento)
- seudominio.com/* (produção)

APIs permitidas:
- Maps JavaScript API
- Geocoding API
```

### 3. Variáveis de Ambiente

```bash
# .env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here

# .env.example
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

## 🚀 Como Usar

### Hook useGoogleMaps

```typescript
import { useGoogleMaps } from "../hooks/useGoogleMaps";

const MyComponent = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { searchLocation, getCurrentLocation, isLoading, error } =
    useGoogleMaps({ apiKey });

  const handleSearch = async () => {
    try {
      const results = await searchLocation("São Paulo, SP");
      console.log(results);
    } catch (err) {
      console.error("Erro na busca:", err);
    }
  };

  const handleCurrentLocation = async () => {
    try {
      const location = await getCurrentLocation();
      console.log(location);
    } catch (err) {
      console.error("Erro na localização:", err);
    }
  };
};
```

### Componente LocationSelector

```typescript
import LocationSelector from "../components/LocationSelector";
import { LocationResult } from "../hooks/useGoogleMaps";

const MyPage = () => {
  const handleLocationSelect = (location: LocationResult) => {
    console.log("Local selecionado:", location);
    // { latitude: -23.5505, longitude: -46.6333, address: "São Paulo, SP" }
  };

  return (
    <LocationSelector
      onLocationSelect={handleLocationSelect}
      placeholder='Digite seu endereço'
      showCurrentLocation={true}
    />
  );
};
```

### Componente InteractiveMap

```typescript
import InteractiveMap from "../components/InteractiveMap";
import { MapOffer } from "../types";

const MapPage = () => {
  const offers: MapOffer[] = [
    {
      id: "1",
      donorName: "Restaurante Central",
      description: "15 marmitas prontas",
      portions: 15,
      latitude: -23.5505,
      longitude: -46.6333,
      foodType: "Refeições prontas",
      urgency: "HIGH",
      status: "AVAILABLE",
      pickupBy: "2024-01-15T18:00:00",
    },
  ];

  const handleOfferSelect = (offer: MapOffer) => {
    console.log("Oferta selecionada:", offer);
  };

  return (
    <InteractiveMap
      offers={offers}
      onOfferSelect={handleOfferSelect}
      showFilters={true}
    />
  );
};
```

## 📊 Tipos TypeScript

### LocationResult

```typescript
interface LocationResult {
  latitude: number;
  longitude: number;
  address: string;
  placeId?: string;
}
```

### MapOffer

```typescript
interface MapOffer {
  id: string;
  donorName: string;
  description: string;
  portions: number;
  latitude: number;
  longitude: number;
  distance?: number;
  pickupBy: string;
  status: "AVAILABLE" | "RESERVED" | "IN_TRANSIT" | "DELIVERED";
  foodType: string;
  urgency: "LOW" | "MEDIUM" | "HIGH";
}
```

## 🔄 Modo Fallback

O sistema funciona mesmo sem a chave da API do Google Maps:

### ✅ Funcionalidades Disponíveis:

- Geolocalização básica do navegador
- Inserção manual de coordenadas
- Interface de mapa simulada
- Todos os componentes visuais

### ❌ Funcionalidades Limitadas:

- Busca de endereços por texto
- Geocodificação reversa
- Mapas reais do Google

### 💡 Experiência do Usuário:

- Avisos informativos quando API não está configurada
- Interface adaptada graciosamente
- Funcionalidades essenciais preservadas

## 🐛 Solução de Problemas

### Erro: "This API key is not authorized"

```bash
# Soluções:
1. Verificar se as APIs estão ativadas no Google Cloud Console
2. Confirmar restrições de HTTP referrer
3. Aguardar até 5 minutos para propagação das configurações
```

### Erro: "RefererNotAllowedMapError"

```bash
# Soluções:
1. Adicionar domínio às restrições de referrer
2. Para localhost: usar 'localhost:*'
3. Verificar se não há espaços extras na configuração
```

### Geolocalização não funciona

```bash
# Soluções:
1. Verificar se está em HTTPS (produção)
2. Confirmar permissões do navegador
3. Testar fallback manual
4. Verificar console do navegador para erros
```

## 📈 Monitoramento e Limites

### Quotas Gratuitas (Google Maps):

- **Maps JavaScript API**: 28.000 carregamentos/dia
- **Geocoding API**: 40.000 solicitações/dia
- **Places API**: 17.000 solicitações/dia

### Otimizações Implementadas:

- ✅ Cache de resultados de busca
- ✅ Debounce em buscas de texto
- ✅ Reutilização de instâncias do Google Maps
- ✅ Carregamento lazy da API

## 🔒 Segurança

### Boas Práticas Implementadas:

- ✅ Chaves de API com restrições
- ✅ Variáveis de ambiente para chaves
- ✅ Validação de entrada do usuário
- ✅ Tratamento seguro de erros
- ✅ Sanitização de dados de localização

### Restrições Recomendadas:

```javascript
// Desenvolvimento
HTTP referrers: localhost:*, 127.0.0.1:*

// Produção
HTTP referrers: seudominio.com/*, *.seudominio.com/*
APIs: Maps JavaScript API, Geocoding API
```

## 🚀 Deploy

### Variáveis de Ambiente em Produção:

#### Vercel:

```bash
vercel env add VITE_GOOGLE_MAPS_API_KEY
# Cole sua chave quando solicitado
```

#### Netlify:

```bash
netlify env:set VITE_GOOGLE_MAPS_API_KEY sua_chave_aqui
```

#### Docker:

```dockerfile
# Dockerfile
ARG VITE_GOOGLE_MAPS_API_KEY
ENV VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY
```

## 📱 Responsividade

### Breakpoints Suportados:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Adaptações por Dispositivo:

- **Mobile**: Mapa em tela cheia, controles simplificados
- **Tablet**: Layout híbrido, sidebar colapsável
- **Desktop**: Interface completa com todos os painéis

## 🧪 Testes

### Cenários de Teste:

1. **Com API Key configurada**:

   - ✅ Busca de endereços
   - ✅ Geolocalização automática
   - ✅ Geocodificação reversa

2. **Sem API Key (Fallback)**:

   - ✅ Geolocalização básica
   - ✅ Interface simulada
   - ✅ Inserção manual

3. **Casos de Erro**:
   - ✅ Permissão negada
   - ✅ Rede indisponível
   - ✅ API key inválida

## 📚 Recursos Adicionais

- [Documentação Google Maps API](https://developers.google.com/maps/documentation)
- [Preços Google Maps Platform](https://mapsplatform.google.com/pricing/)
- [Melhores Práticas API Key](https://developers.google.com/maps/api-key-best-practices)
- [Guia de Solução de Problemas](https://developers.google.com/maps/documentation/javascript/error-messages)

## 🎯 Próximas Funcionalidades

### Melhorias Planejadas:

- [ ] Integração com routing API para direções
- [ ] Clustering de marcadores para muitas ofertas
- [ ] Modo offline com mapas em cache
- [ ] Histórico de localizações favoritas
- [ ] Notificações baseadas em proximidade

### Otimizações Futuras:

- [ ] Service Worker para cache de mapas
- [ ] Lazy loading de componentes de mapa
- [ ] Compressão de imagens de marcadores
- [ ] Análise de uso para otimização de quotas

---

## 📞 Suporte

Para dúvidas sobre a implementação dos mapas:

1. **Documentação**: Consulte este README
2. **Código**: Examine os componentes em `src/components/`
3. **Exemplos**: Veja `src/examples/MapExample.tsx`
4. **Demo**: Acesse `/maps-demo.html` no navegador

---

_Desenvolvido com ❤️ para o projeto NoMoreHunger_
