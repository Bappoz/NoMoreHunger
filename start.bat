@echo off
REM 🚀 NoMoreHunger - Script de Inicialização para Windows
REM Este script configura e inicia todo o ambiente automaticamente

setlocal enabledelayedexpansion

REM Verificar se Docker está instalado
echo [INFO] Verificando Docker...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker não está instalado!
    echo [INFO] Por favor, instale o Docker Desktop: https://docs.docker.com/desktop/windows/
    pause
    exit /b 1
)

REM Verificar se Docker Compose está instalado
echo [INFO] Verificando Docker Compose...
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Compose não está instalado!
    echo [INFO] Por favor, instale o Docker Desktop que inclui Docker Compose
    pause
    exit /b 1
)

echo [SUCCESS] Docker e Docker Compose encontrados!

REM Verificar se Docker está rodando
echo [INFO] Verificando se Docker está rodando...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker não está rodando!
    echo [INFO] Por favor, inicie o Docker Desktop
    pause
    exit /b 1
)

echo [SUCCESS] Docker está rodando!

REM Verificar se arquivo .env existe
if not exist .env (
    echo [WARNING] Arquivo .env não encontrado. Criando a partir do exemplo...
    if exist .env.example (
        copy .env.example .env >nul
        echo [SUCCESS] Arquivo .env criado!
        echo [WARNING] ⚠️ Não esqueça de configurar suas variáveis em .env
    ) else (
        echo [ERROR] Arquivo .env.example não encontrado!
        pause
        exit /b 1
    )
) else (
    echo [SUCCESS] Arquivo .env encontrado!
)

REM Limpar containers antigos
echo [INFO] Limpando containers antigos...
docker-compose down --remove-orphans 2>nul

REM Construir e iniciar serviços
echo [INFO] Construindo e iniciando serviços...
echo [INFO] Isso pode demorar alguns minutos na primeira vez...

docker-compose up --build -d

REM Aguardar serviços iniciarem
echo [INFO] Aguardando serviços iniciarem...
timeout /t 10 /nobreak >nul

REM Verificar status
echo [INFO] Verificando status dos containers...
docker-compose ps

REM Banner de sucesso
echo.
echo ===============================================
echo 🎉 NoMoreHunger iniciado com sucesso!
echo ===============================================
echo.
echo 🌐 SERVIÇOS DISPONÍVEIS:
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8081
echo Nginx:    http://localhost:80
echo.
echo 📊 COMANDOS ÚTEIS:
echo Ver status:     docker-compose ps
echo Ver logs:       docker-compose logs -f
echo Reiniciar:      docker-compose restart
echo Parar:          docker-compose down
echo.

REM Verificar Google Maps
findstr /C:"YOUR_API_KEY_HERE" .env >nul 2>&1
if %errorlevel% equ 0 (
    echo [WARNING] 🗺️ Google Maps API não configurada
    echo Para habilitar busca de endereços:
    echo 1. Obtenha uma API key em: https://console.cloud.google.com/
    echo 2. Edite o arquivo .env e configure GOOGLE_MAPS_API_KEY
    echo 3. Reinicie com: docker-compose restart frontend
    echo.
)

REM Perguntar se deve abrir o browser
set /p open_browser="Deseja abrir o browser automaticamente? (y/N): "
if /i "%open_browser%"=="y" (
    start http://localhost:3000
)

echo.
echo 🚀 Instalação concluída! Aproveite o NoMoreHunger!
echo Juntos, podemos fazer a diferença! 🍽️❤️
echo.
pause
