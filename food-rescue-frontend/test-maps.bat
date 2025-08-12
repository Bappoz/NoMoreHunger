@echo off
:: Script para testar a integração do Google Maps
:: NoMoreHunger - Maps Integration Test

echo 🗺️  NoMoreHunger - Teste de Integração Google Maps
echo ==================================================
echo.

:: Verificar se estamos no diretório correto
if not exist "package.json" (
    echo ❌ Erro: Execute este script no diretório do frontend (food-rescue-frontend)
    pause
    exit /b 1
)

:: Verificar se o arquivo .env existe
if not exist ".env" (
    echo ⚠️  Arquivo .env não encontrado
    echo    Criando arquivo .env.example...
    
    (
        echo # Google Maps API Configuration
        echo VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
        echo.
        echo # Para obter uma chave:
        echo # 1. Acesse: https://console.cloud.google.com/
        echo # 2. Ative as APIs: Maps JavaScript API, Geocoding API
        echo # 3. Crie uma chave em "Credentials"
        echo # 4. Configure restrições de segurança
        echo # 5. Copie a chave para este arquivo como .env
    ) > .env.example
    
    echo ✅ Arquivo .env.example criado
    echo    Copie para .env e configure sua chave da API
    set API_CONFIGURED=false
) else (
    :: Verificar se a chave está configurada
    findstr /C:"VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here" .env >nul
    if not errorlevel 1 (
        echo ⚠️  Google Maps API key não configurada no .env
        echo    O sistema funcionará em modo fallback
        set API_CONFIGURED=false
    ) else (
        findstr /C:"VITE_GOOGLE_MAPS_API_KEY=" .env >nul
        if not errorlevel 1 (
            echo ✅ Google Maps API key encontrada no .env
            set API_CONFIGURED=true
        ) else (
            echo ⚠️  Google Maps API key não encontrada no .env
            set API_CONFIGURED=false
        )
    )
)

echo.

:: Verificar dependências
echo 🔍 Verificando dependências...

:: Verificar se node_modules existe
if not exist "node_modules" (
    echo 📦 Instalando dependências...
    call npm install
)

:: Verificar dependências específicas (simplificado para Windows)
echo 📦 Verificando dependências específicas...
call npm list @googlemaps/js-api-loader >nul 2>&1
if errorlevel 1 (
    echo 📦 Instalando @googlemaps/js-api-loader...
    call npm install @googlemaps/js-api-loader
)

call npm list lucide-react >nul 2>&1
if errorlevel 1 (
    echo 📦 Instalando lucide-react...
    call npm install lucide-react
)

echo ✅ Dependências verificadas
echo.

:: Verificar estrutura de arquivos
echo 📁 Verificando estrutura de arquivos...

set ALL_FILES_EXIST=true

if exist "src\hooks\useGoogleMaps.ts" (
    echo ✅ src\hooks\useGoogleMaps.ts
) else (
    echo ❌ src\hooks\useGoogleMaps.ts - AUSENTE
    set ALL_FILES_EXIST=false
)

if exist "src\components\LocationSelector.tsx" (
    echo ✅ src\components\LocationSelector.tsx
) else (
    echo ❌ src\components\LocationSelector.tsx - AUSENTE
    set ALL_FILES_EXIST=false
)

if exist "src\components\MapView.tsx" (
    echo ✅ src\components\MapView.tsx
) else (
    echo ❌ src\components\MapView.tsx - AUSENTE
    set ALL_FILES_EXIST=false
)

if exist "src\components\InteractiveMap.tsx" (
    echo ✅ src\components\InteractiveMap.tsx
) else (
    echo ❌ src\components\InteractiveMap.tsx - AUSENTE
    set ALL_FILES_EXIST=false
)

if exist "src\pages\MapPage.tsx" (
    echo ✅ src\pages\MapPage.tsx
) else (
    echo ❌ src\pages\MapPage.tsx - AUSENTE
    set ALL_FILES_EXIST=false
)

if exist "src\types\index.ts" (
    echo ✅ src\types\index.ts
) else (
    echo ❌ src\types\index.ts - AUSENTE
    set ALL_FILES_EXIST=false
)

if exist "src\examples\MapExample.tsx" (
    echo ✅ src\examples\MapExample.tsx
) else (
    echo ❌ src\examples\MapExample.tsx - AUSENTE
    set ALL_FILES_EXIST=false
)

echo.

if "%ALL_FILES_EXIST%"=="true" (
    echo ✅ Todos os arquivos de integração estão presentes
) else (
    echo ⚠️  Alguns arquivos estão ausentes
    echo    Execute o comando de geração dos componentes novamente
)

echo.

:: Verificar compilação TypeScript
echo 🔨 Verificando compilação TypeScript...

call npm run type-check >nul 2>&1
if not errorlevel 1 (
    echo ✅ Compilação TypeScript OK
) else (
    echo ⚠️  Problemas na compilação TypeScript
    echo    Execute 'npm run type-check' para ver detalhes
)

echo.

:: Verificar se o servidor pode iniciar
echo 🚀 Verificando se o servidor pode iniciar...

call npm run build >nul 2>&1
if not errorlevel 1 (
    echo ✅ Build do projeto OK
) else (
    echo ⚠️  Problemas no build do projeto
    echo    Execute 'npm run build' para ver detalhes
)

echo.

:: Relatório final
echo 📋 RELATÓRIO FINAL
echo ==================

if "%API_CONFIGURED%"=="true" (
    echo ✅ Google Maps API: Configurada
    echo    🎯 Funcionalidades completas disponíveis:
    echo       - Busca de endereços por texto
    echo       - Geocodificação reversa
    echo       - Mapas reais do Google
    echo       - Geolocalização automática
) else (
    echo ⚠️  Google Maps API: Não configurada
    echo    🔄 Modo fallback ativo:
    echo       - Geolocalização básica (HTML5)
    echo       - Interface de mapa simulada
    echo       - Inserção manual de coordenadas
    echo.
    echo    Para ativar funcionalidades completas:
    echo    1. Obtenha uma chave em: https://console.cloud.google.com/
    echo    2. Configure no arquivo .env: VITE_GOOGLE_MAPS_API_KEY=sua_chave
    echo    3. Reinicie o servidor: npm run dev
)

echo.

if "%ALL_FILES_EXIST%"=="true" (
    echo ✅ Estrutura de arquivos: Completa
) else (
    echo ❌ Estrutura de arquivos: Incompleta
)

echo.
echo 🌐 URLs para teste:
echo    - Desenvolvimento: http://localhost:5173
echo    - Demo de mapas: http://localhost:5173/maps-demo.html
echo    - Componente exemplo: /src/examples/MapExample.tsx

echo.
echo 📚 Documentação:
echo    - Integração: MAPS_INTEGRATION.md
echo    - Setup Google Maps: GOOGLE_MAPS_SETUP.md
echo    - Demo HTML: public/maps-demo.html

echo.

:: Opção para iniciar o servidor
set /p "start_server=🚀 Deseja iniciar o servidor de desenvolvimento? (y/n): "
if /i "%start_server%"=="y" (
    echo.
    echo 🎬 Iniciando servidor de desenvolvimento...
    echo    Acesse: http://localhost:5173
    echo    Demo: http://localhost:5173/maps-demo.html
    echo.
    call npm run dev
) else (
    echo.
    echo ✨ Para iniciar manualmente:
    echo    npm run dev
    echo.
    echo 🎯 Para testar os mapas:
    echo    1. Inicie o servidor: npm run dev
    echo    2. Acesse: http://localhost:5173/maps-demo.html
    echo    3. Ou importe MapPage em seu App.tsx
)

echo.
echo ✨ Teste concluído!
pause
