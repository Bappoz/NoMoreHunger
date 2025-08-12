#!/bin/bash

# Script para testar a integração do Google Maps
# NoMoreHunger - Maps Integration Test

echo "🗺️  NoMoreHunger - Teste de Integração Google Maps"
echo "=================================================="
echo ""

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script no diretório do frontend (food-rescue-frontend)"
    exit 1
fi

# Verificar se o arquivo .env existe
if [ ! -f ".env" ]; then
    echo "⚠️  Arquivo .env não encontrado"
    echo "   Criando arquivo .env.example..."
    
    cat > .env.example << EOF
# Google Maps API Configuration
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Para obter uma chave:
# 1. Acesse: https://console.cloud.google.com/
# 2. Ative as APIs: Maps JavaScript API, Geocoding API
# 3. Crie uma chave em "Credentials"
# 4. Configure restrições de segurança
# 5. Copie a chave para este arquivo como .env
EOF
    
    echo "✅ Arquivo .env.example criado"
    echo "   Copie para .env e configure sua chave da API"
fi

# Verificar se a chave está configurada
if [ -f ".env" ]; then
    if grep -q "VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here" .env || ! grep -q "VITE_GOOGLE_MAPS_API_KEY=" .env; then
        echo "⚠️  Google Maps API key não configurada no .env"
        echo "   O sistema funcionará em modo fallback"
        API_CONFIGURED=false
    else
        echo "✅ Google Maps API key encontrada no .env"
        API_CONFIGURED=true
    fi
else
    echo "⚠️  Arquivo .env não encontrado"
    API_CONFIGURED=false
fi

echo ""

# Verificar dependências
echo "🔍 Verificando dependências..."

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Verificar dependências específicas
REQUIRED_DEPS=("@googlemaps/js-api-loader" "lucide-react")
MISSING_DEPS=()

for dep in "${REQUIRED_DEPS[@]}"; do
    if ! npm list "$dep" > /dev/null 2>&1; then
        MISSING_DEPS+=("$dep")
    fi
done

if [ ${#MISSING_DEPS[@]} -gt 0 ]; then
    echo "📦 Instalando dependências em falta: ${MISSING_DEPS[*]}"
    npm install "${MISSING_DEPS[@]}"
fi

echo "✅ Dependências verificadas"
echo ""

# Verificar estrutura de arquivos
echo "📁 Verificando estrutura de arquivos..."

FILES_TO_CHECK=(
    "src/hooks/useGoogleMaps.ts"
    "src/components/LocationSelector.tsx"
    "src/components/MapView.tsx"
    "src/components/InteractiveMap.tsx"
    "src/pages/MapPage.tsx"
    "src/types/index.ts"
    "src/examples/MapExample.tsx"
)

ALL_FILES_EXIST=true

for file in "${FILES_TO_CHECK[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - AUSENTE"
        ALL_FILES_EXIST=false
    fi
done

echo ""

if [ "$ALL_FILES_EXIST" = true ]; then
    echo "✅ Todos os arquivos de integração estão presentes"
else
    echo "⚠️  Alguns arquivos estão ausentes"
    echo "   Execute o comando de geração dos componentes novamente"
fi

echo ""

# Verificar compilação TypeScript
echo "🔨 Verificando compilação TypeScript..."

if npm run type-check > /dev/null 2>&1; then
    echo "✅ Compilação TypeScript OK"
else
    echo "⚠️  Problemas na compilação TypeScript"
    echo "   Execute 'npm run type-check' para ver detalhes"
fi

echo ""

# Verificar se o servidor pode iniciar
echo "🚀 Verificando se o servidor pode iniciar..."

# Tentar buildar o projeto
if npm run build > /dev/null 2>&1; then
    echo "✅ Build do projeto OK"
else
    echo "⚠️  Problemas no build do projeto"
    echo "   Execute 'npm run build' para ver detalhes"
fi

echo ""

# Relatório final
echo "📋 RELATÓRIO FINAL"
echo "=================="

if [ "$API_CONFIGURED" = true ]; then
    echo "✅ Google Maps API: Configurada"
    echo "   🎯 Funcionalidades completas disponíveis:"
    echo "      - Busca de endereços por texto"
    echo "      - Geocodificação reversa"
    echo "      - Mapas reais do Google"
    echo "      - Geolocalização automática"
else
    echo "⚠️  Google Maps API: Não configurada"
    echo "   🔄 Modo fallback ativo:"
    echo "      - Geolocalização básica (HTML5)"
    echo "      - Interface de mapa simulada"
    echo "      - Inserção manual de coordenadas"
    echo ""
    echo "   Para ativar funcionalidades completas:"
    echo "   1. Obtenha uma chave em: https://console.cloud.google.com/"
    echo "   2. Configure no arquivo .env: VITE_GOOGLE_MAPS_API_KEY=sua_chave"
    echo "   3. Reinicie o servidor: npm run dev"
fi

echo ""

if [ "$ALL_FILES_EXIST" = true ]; then
    echo "✅ Estrutura de arquivos: Completa"
else
    echo "❌ Estrutura de arquivos: Incompleta"
fi

echo ""
echo "🌐 URLs para teste:"
echo "   - Desenvolvimento: http://localhost:5173"
echo "   - Demo de mapas: http://localhost:5173/maps-demo.html"
echo "   - Componente exemplo: /src/examples/MapExample.tsx"

echo ""
echo "📚 Documentação:"
echo "   - Integração: MAPS_INTEGRATION.md"
echo "   - Setup Google Maps: GOOGLE_MAPS_SETUP.md"
echo "   - Demo HTML: public/maps-demo.html"

echo ""

# Opção para iniciar o servidor
read -p "🚀 Deseja iniciar o servidor de desenvolvimento? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🎬 Iniciando servidor de desenvolvimento..."
    echo "   Acesse: http://localhost:5173"
    echo "   Demo: http://localhost:5173/maps-demo.html"
    echo ""
    npm run dev
else
    echo ""
    echo "✨ Para iniciar manualmente:"
    echo "   npm run dev"
    echo ""
    echo "🎯 Para testar os mapas:"
    echo "   1. Inicie o servidor: npm run dev"
    echo "   2. Acesse: http://localhost:5173/maps-demo.html"
    echo "   3. Ou importe MapPage em seu App.tsx"
fi

echo ""
echo "✨ Teste concluído!"
