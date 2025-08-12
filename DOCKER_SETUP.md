# 🐳 NoMoreHunger - Dockerized Setup Guide

## 🚀 Instalação Rápida (1 Comando!)

```bash
git clone https://github.com/Bappoz/NoMoreHunger.git
cd NoMoreHunger
docker-compose up -d
```

**Pronto!** Acesse http://localhost:3000 🎉

---

## 📋 O que você precisa

- **Docker** (versão 20+)
- **Docker Compose** (versão 2+)
- **4GB RAM** disponível
- **2GB** espaço em disco

**Não tem Docker?** [Instalar Docker](https://docs.docker.com/get-docker/)

---

## 🔧 Configuração Detalhada

### 1. Configure o Ambiente

```bash
# Copie as configurações de exemplo
cp .env.example .env

# Edite suas configurações
nano .env
```

### 2. Configurações Importantes

```env
# Google Maps (opcional - para busca de endereços)
GOOGLE_MAPS_API_KEY=sua_api_key_aqui

# Banco de dados
POSTGRES_PASSWORD=senha_super_segura

# Ambiente
NODE_ENV=production
```

### 3. Iniciar Serviços

```bash
# Construir e iniciar (primeira vez)
docker-compose up --build -d

# Apenas iniciar (próximas vezes)
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Ver logs em tempo real
docker-compose logs -f
```

---

## 🌐 Serviços Disponíveis

| Serviço           | URL                   | Descrição       |
| ----------------- | --------------------- | --------------- |
| **🎨 Frontend**   | http://localhost:3000 | Interface React |
| **⚙️ Backend**    | http://localhost:8081 | API Spring Boot |
| **🌐 Nginx**      | http://localhost:80   | Proxy reverso   |
| **🗄️ PostgreSQL** | localhost:5432        | Banco de dados  |
| **🚀 Redis**      | localhost:6379        | Cache           |

---

## 🔍 Verificar se está funcionando

```bash
# Status de todos os containers
docker-compose ps

# Saúde dos serviços
curl http://localhost:8081/actuator/health
curl http://localhost:3000

# Ver logs específicos
docker-compose logs backend
docker-compose logs frontend
```

---

## 🗺️ Configurar Google Maps (Opcional)

### Por que configurar?

- ✅ Busca automática de endereços
- ✅ Localização atual com GPS
- ✅ Autocompletar endereços
- ✅ Melhor experiência do usuário

### Como configurar:

1. **Obter API Key**

   - Acesse [Google Cloud Console](https://console.cloud.google.com/)
   - Crie projeto e ative APIs necessárias
   - Gere uma API Key

2. **Configurar no projeto**

   ```bash
   # Editar arquivo .env
   GOOGLE_MAPS_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxx

   # Reiniciar frontend
   docker-compose restart frontend
   ```

**📖 Guia completo**: [GOOGLE_MAPS_SETUP.md](GOOGLE_MAPS_SETUP.md)

---

## 🛠️ Comandos Úteis

### Gerenciamento de Containers

```bash
# Reconstruir serviços após mudanças
docker-compose up --build

# Reiniciar serviço específico
docker-compose restart backend
docker-compose restart frontend

# Executar comandos dentro do container
docker-compose exec backend bash
docker-compose exec frontend sh

# Ver uso de recursos
docker stats
```

### Backup e Restore

```bash
# Backup do banco
docker-compose exec postgres pg_dump -U fooduser foodrescue > backup.sql

# Restore do banco
docker-compose exec -T postgres psql -U fooduser foodrescue < backup.sql

# Backup dos volumes
docker run --rm -v nomorehunger_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz /data
```

### Monitoramento

```bash
# Ver logs de erro
docker-compose logs --tail=50 -f backend | grep ERROR
docker-compose logs --tail=50 -f frontend | grep ERROR

# Estatísticas em tempo real
watch docker-compose ps

# Espaço usado pelos containers
docker system df
```

---

## 🚨 Solução de Problemas

### Container não inicia

```bash
# Verificar logs detalhados
docker-compose logs backend

# Verificar portas em uso
netstat -tulpn | grep :8081
netstat -tulpn | grep :3000

# Limpar cache do Docker
docker system prune -a
```

### Banco de dados não conecta

```bash
# Verificar se PostgreSQL está rodando
docker-compose ps postgres

# Testar conexão
docker-compose exec postgres psql -U fooduser -d foodrescue -c "SELECT 1;"

# Recriar banco (⚠️ apaga dados)
docker-compose down -v
docker-compose up -d
```

### Frontend não carrega

```bash
# Verificar se build foi bem-sucedido
docker-compose logs frontend

# Reconstruir frontend
docker-compose build --no-cache frontend
docker-compose up -d frontend

# Verificar arquivos estáticos
docker-compose exec frontend ls -la /app/dist
```

### Performance lenta

```bash
# Verificar recursos
docker stats

# Aumentar memória para Docker Desktop
# Settings > Resources > Memory > 4GB+

# Limpar volumes antigos
docker volume prune
```

---

## 🔐 Configurações de Produção

### Variables de Ambiente para Produção

```env
NODE_ENV=production
SPRING_PROFILES_ACTIVE=docker

# Senhas seguras
POSTGRES_PASSWORD=senha_complexa_aqui
JWT_SECRET=chave_jwt_super_segura

# URLs de produção
BACKEND_URL=https://api.seudominio.com
FRONTEND_URL=https://seudominio.com

# SSL (se usar HTTPS)
SSL_CERT_PATH=/etc/nginx/ssl/cert.pem
SSL_KEY_PATH=/etc/nginx/ssl/key.pem
```

### Docker Compose para Produção

```yaml
# docker-compose.prod.yml
version: "3.8"
services:
  nginx:
    restart: always
    environment:
      - SSL_ENABLED=true

  backend:
    restart: always
    environment:
      - SPRING_PROFILES_ACTIVE=production

  frontend:
    restart: always
    environment:
      - NODE_ENV=production
```

---

## 📊 Recursos do Sistema

### Requisitos Mínimos

- **CPU**: 2 cores
- **RAM**: 4GB
- **Disco**: 10GB
- **Rede**: 100Mbps

### Requisitos Recomendados

- **CPU**: 4 cores
- **RAM**: 8GB
- **Disco**: 50GB SSD
- **Rede**: 1Gbps

### Escalabilidade

```bash
# Escalar containers horizontalmente
docker-compose up --scale backend=3 --scale frontend=2

# Usar Docker Swarm para cluster
docker swarm init
docker stack deploy -c docker-compose.yml nomorehunger
```

---

## 🆘 Suporte

### 💬 Comunidade

- **GitHub Issues**: [Reportar problemas](https://github.com/Bappoz/NoMoreHunger/issues)
- **Discord**: [Comunidade NoMoreHunger](https://discord.gg/nomorehunger)
- **Documentação**: [Wiki completa](https://github.com/Bappoz/NoMoreHunger/wiki)

### 📞 Contato Direto

- **Email**: suporte@nomorehunger.org
- **Telegram**: [@nomorehunger_suporte](https://t.me/nomorehunger_suporte)

---

## ✅ Checklist Pós-Instalação

- [ ] Todos os containers estão rodando (`docker-compose ps`)
- [ ] Frontend acessível em http://localhost:3000
- [ ] Backend respondendo em http://localhost:8081/actuator/health
- [ ] Consegue criar uma conta de usuário
- [ ] Consegue criar uma oferta de teste
- [ ] Google Maps configurado (opcional)
- [ ] Backup configurado
- [ ] Monitoramento funcionando

---

**🎉 Parabéns! Seu NoMoreHunger está rodando!**

Acesse http://localhost:3000 e comece a fazer a diferença! 🍽️❤️
