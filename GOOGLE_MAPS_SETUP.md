# Configuração do Google Maps API

## Como obter e configurar a API Key do Google Maps

### 1. Acessar o Google Cloud Console

- Acesse: https://console.cloud.google.com/
- Faça login com sua conta Google

### 2. Criar ou selecionar um projeto

- Clique em "Select a project" no topo da página
- Crie um novo projeto ou selecione um existente

### 3. Ativar as APIs necessárias

Ative as seguintes APIs no seu projeto:

- **Maps JavaScript API**
- **Geocoding API**
- **Places API** (opcional, para busca avançada)

Para ativar:

1. No menu lateral, vá em "APIs & Services" > "Library"
2. Busque por cada API e clique em "Enable"

### 4. Criar credenciais

1. Vá em "APIs & Services" > "Credentials"
2. Clique em "Create Credentials" > "API Key"
3. Anote a API Key gerada

### 5. Configurar restrições (recomendado)

1. Clique na API Key criada
2. Em "Application restrictions", selecione "HTTP referrers"
3. Adicione os domínios permitidos:
   - `http://localhost:*/*` (para desenvolvimento)
   - `https://seu-dominio.com/*` (para produção)
4. Em "API restrictions", selecione "Restrict key" e escolha as APIs ativadas

### 6. Configurar no projeto

1. Copie a API Key
2. Cole no arquivo `.env.local`:

```
VITE_GOOGLE_MAPS_API_KEY=sua_api_key_aqui
```

3. Reinicie o servidor de desenvolvimento

## Funcionalidades disponíveis

### Com API Key configurada:

- ✅ Busca de endereços em tempo real
- ✅ Autocompletar endereços
- ✅ Obter localização atual do usuário
- ✅ Conversão automática de endereço para coordenadas
- ✅ Exibição de endereços formatados

### Sem API Key (modo manual):

- ✅ Inserção manual de coordenadas
- ✅ Validação de coordenadas
- ⚠️ Sem busca automática de endereços

## Custos

O Google Maps oferece um crédito mensal gratuito de $200, que cobre:

- Aproximadamente 28.000 geocodificações por mês
- Uso normal de uma aplicação pequena/média

Para mais informações sobre preços: https://cloud.google.com/maps-platform/pricing

## Exemplo de uso

```typescript
// Com API configurada
const location = await searchLocation("Avenida Paulista, São Paulo");
// Retorna: { latitude: -23.5616, longitude: -46.6564, address: "Av. Paulista, São Paulo - SP, Brasil" }

// Localização atual
const currentLocation = await getCurrentLocation();
// Retorna coordenadas + endereço formatado
```

## Troubleshooting

### Erro: "RefererNotAllowedMapError"

- Verifique se o domínio está nas restrições HTTP referrers
- Para desenvolvimento local, adicione `http://localhost:*/*`

### Erro: "ApiNotActivatedMapError"

- Certifique-se de que as APIs estão ativadas no Google Cloud Console
- Aguarde alguns minutos após ativar as APIs

### Busca não funciona

- Verifique se a API Key está correta no arquivo `.env.local`
- Certifique-se de que o servidor foi reiniciado após adicionar a API Key
- Verifique o console do navegador para erros específicos
