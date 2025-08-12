#!/bin/bash

# 🚀 NoMoreHunger - Script de Inicialização Automática
# Este script configura e inicia todo o ambiente automaticamente

set -e  # Parar em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para print colorido
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Banner
echo -e "${GREEN}"
echo "  _   _       __  __                 _   _                             "
echo " | \ | |     |  \/  |               | | | |                            "
echo " |  \| | ___ | .  . | ___  _ __ ___  | |_| |_   _ _ __   __ _  ___ _ __  "
echo " | . \` |/ _ \| |\/| |/ _ \| '__/ _ \ |  _  | | | | '_ \ / _\` |/ _ \ '__| "
echo " | |\  | (_) | |  | | (_) | | |  __/ | | | | |_| | | | | (_| |  __/ |    "
echo " \_| \_/\___/\_|  |_/\___/|_|  \___| \_| |_/\__,_|_| |_|\__, |\___|_|    "
echo "                                                         __/ |          "
echo "                                                        |___/           "
echo -e "${NC}"
echo -e "${BLUE}Plataforma de Resgate de Alimentos${NC}"
echo -e "${YELLOW}Conectando pessoas, reduzindo desperdício, combatendo a fome.${NC}"
echo ""

# Verificar se Docker está instalado
print_status "Verificando Docker..."
if ! command -v docker &> /dev/null; then
    print_error "Docker não está instalado!"
    print_status "Por favor, instale o Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

# Verificar se Docker Compose está instalado
print_status "Verificando Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose não está instalado!"
    print_status "Por favor, instale o Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi

print_success "Docker e Docker Compose encontrados!"

# Verificar se Docker está rodando
print_status "Verificando se Docker está rodando..."
if ! docker info &> /dev/null; then
    print_error "Docker não está rodando!"
    print_status "Por favor, inicie o Docker Desktop ou o serviço Docker"
    exit 1
fi

print_success "Docker está rodando!"

# Verificar se arquivo .env existe
if [ ! -f .env ]; then
    print_warning "Arquivo .env não encontrado. Criando a partir do exemplo..."
    if [ -f .env.example ]; then
        cp .env.example .env
        print_success "Arquivo .env criado!"
        print_warning "⚠️ Não esqueça de configurar suas variáveis em .env"
    else
        print_error "Arquivo .env.example não encontrado!"
        exit 1
    fi
else
    print_success "Arquivo .env encontrado!"
fi

# Verificar portas disponíveis
print_status "Verificando portas disponíveis..."

check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        print_warning "Porta $1 está em uso!"
        return 1
    else
        return 0
    fi
}

PORTS_OK=true
if ! check_port 3000; then
    print_error "Porta 3000 (Frontend) está em uso!"
    PORTS_OK=false
fi

if ! check_port 8081; then
    print_error "Porta 8081 (Backend) está em uso!"
    PORTS_OK=false
fi

if ! check_port 5432; then
    print_warning "Porta 5432 (PostgreSQL) está em uso. Isso pode ser normal se você já tem PostgreSQL rodando."
fi

if [ "$PORTS_OK" = false ]; then
    print_error "Algumas portas necessárias estão em uso. Por favor, libere as portas ou pare os serviços conflitantes."
    exit 1
fi

print_success "Portas necessárias estão disponíveis!"

# Limpar containers antigos se existirem
print_status "Limpando containers antigos..."
docker-compose down --remove-orphans 2>/dev/null || true

# Construir e iniciar serviços
print_status "Construindo e iniciando serviços..."
print_status "Isso pode demorar alguns minutos na primeira vez..."

# Mostrar progresso
docker-compose up --build -d

# Aguardar serviços iniciarem
print_status "Aguardando serviços iniciarem..."
sleep 10

# Verificar status dos containers
print_status "Verificando status dos containers..."
if docker-compose ps | grep -q "Exit"; then
    print_error "Alguns containers falharam ao iniciar!"
    print_status "Verificando logs..."
    docker-compose logs --tail=20
    exit 1
fi

# Verificar health checks
print_status "Verificando saúde dos serviços..."

# Aguardar backend estar pronto
BACKEND_READY=false
for i in {1..30}; do
    if curl -s http://localhost:8081/actuator/health > /dev/null 2>&1; then
        BACKEND_READY=true
        break
    fi
    print_status "Aguardando backend... (tentativa $i/30)"
    sleep 2
done

if [ "$BACKEND_READY" = false ]; then
    print_error "Backend não respondeu a tempo!"
    print_status "Verificando logs do backend..."
    docker-compose logs backend --tail=20
    exit 1
fi

# Aguardar frontend estar pronto
FRONTEND_READY=false
for i in {1..30}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        FRONTEND_READY=true
        break
    fi
    print_status "Aguardando frontend... (tentativa $i/30)"
    sleep 2
done

if [ "$FRONTEND_READY" = false ]; then
    print_error "Frontend não respondeu a tempo!"
    print_status "Verificando logs do frontend..."
    docker-compose logs frontend --tail=20
    exit 1
fi

# Sucesso!
print_success "🎉 NoMoreHunger iniciado com sucesso!"
echo ""
echo -e "${GREEN}===============================================${NC}"
echo -e "${GREEN}🌐 SERVIÇOS DISPONÍVEIS:${NC}"
echo -e "${BLUE}Frontend:${NC} http://localhost:3000"
echo -e "${BLUE}Backend:${NC}  http://localhost:8081"
echo -e "${BLUE}API Docs:${NC} http://localhost:8081/swagger-ui.html"
echo -e "${BLUE}Nginx:${NC}    http://localhost:80"
echo -e "${GREEN}===============================================${NC}"
echo ""

# Verificar Google Maps
if grep -q "YOUR_API_KEY_HERE" .env 2>/dev/null; then
    print_warning "🗺️ Google Maps API não configurada"
    echo -e "${YELLOW}Para habilitar busca de endereços:${NC}"
    echo "1. Obtenha uma API key em: https://console.cloud.google.com/"
    echo "2. Edite o arquivo .env e configure GOOGLE_MAPS_API_KEY"
    echo "3. Reinicie com: docker-compose restart frontend"
    echo ""
fi

# Comandos úteis
echo -e "${BLUE}COMANDOS ÚTEIS:${NC}"
echo "📊 Ver status:     docker-compose ps"
echo "📋 Ver logs:       docker-compose logs -f"
echo "🔄 Reiniciar:      docker-compose restart"
echo "🛑 Parar:          docker-compose down"
echo "🧹 Limpar tudo:    docker-compose down -v"
echo ""

# Abrir browser automaticamente (opcional)
read -p "Deseja abrir o browser automaticamente? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Abrindo browser..."
    if command -v xdg-open > /dev/null; then
        xdg-open http://localhost:3000
    elif command -v open > /dev/null; then
        open http://localhost:3000
    else
        print_warning "Não foi possível abrir o browser automaticamente"
        print_status "Acesse manualmente: http://localhost:3000"
    fi
fi

print_success "🚀 Instalação concluída! Aproveite o NoMoreHunger!"
echo -e "${YELLOW}Juntos, podemos fazer a diferença! 🍽️❤️${NC}"
