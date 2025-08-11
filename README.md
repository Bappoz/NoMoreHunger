# NoMoreHunger - Sistema de Resgate de Alimentos

## 🍽️ Sobre o Projeto

O NoMoreHunger é uma plataforma completa para conectar doadores de alimentos com voluntários, reduzindo o desperdício e combatendo a fome. O sistema permite que restaurantes, supermercados e indivíduos ofereçam alimentos que seriam descartados para pessoas em situação de vulnerabilidade.

## ✨ Funcionalidades

### 🎯 Dashboard Interativo

- Estatísticas em tempo real de ofertas e entregas
- Visualização de métricas de impacto social
- Progresso visual das ações realizadas

### 📍 Localização Inteligente

- **Busca automática de endereços** via Google Maps API
- **Localização atual automática** usando GPS do dispositivo
- **Modo manual** para inserção de coordenadas
- **Fallback inteligente** quando API não está configurada

### 🍕 Gestão de Ofertas

- Criação de ofertas com descrição detalhada
- Sistema de status (Disponível → Reservado → Em Trânsito → Entregue)
- Controle de porções e prazo de retirada
- Informações de contato do doador

### 👥 Interface do Usuário

- Design moderno e responsivo
- Interface intuitiva e acessível
- Feedback visual em todas as ações
- Suporte a dispositivos móveis

## 🛠️ Tecnologias Utilizadas

### Backend

- **Spring Boot 3.2.0** - Framework principal
- **Spring Data JPA** - Persistência de dados
- **H2 Database** - Banco de dados em memória
- **Hibernate** - ORM
- **Bean Validation** - Validação de dados
- **Maven** - Gerenciamento de dependências

### Frontend

- **React 18** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS** - Framework de CSS
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones

### Integrações

- **Google Maps API** - Geocodificação e busca de endereços
- **Geolocation API** - Localização atual do usuário

## 🚀 Como Executar

### Pré-requisitos

- Java 17+
- Node.js 18+
- Maven ou Maven Daemon (mvnd)

### 1. Clone o repositório

```bash
git clone https://github.com/Bappoz/NoMoreHunger.git
cd NoMoreHunger
```

### 2. Configure o Backend

```bash
cd food-rescue
mvnd spring-boot:run
```

O backend estará disponível em: http://localhost:8081

### 3. Configure o Frontend

```bash
cd food-rescue-frontend
npm install
npm run dev
```

O frontend estará disponível em: http://localhost:3000

### 4. Configure Google Maps (Opcional)

Para habilitar a busca automática de endereços:

1. Obtenha uma API key do Google Maps (veja [GOOGLE_MAPS_SETUP.md](GOOGLE_MAPS_SETUP.md))
2. Crie o arquivo `.env.local` no diretório `food-rescue-frontend`:

```
VITE_GOOGLE_MAPS_API_KEY=sua_api_key_aqui
```

3. Reinicie o servidor frontend

## 📋 Funcionalidades de Localização

### Com Google Maps API Configurada

- ✅ Busca de endereços em tempo real
- ✅ Autocompletar com sugestões
- ✅ Localização atual automática
- ✅ Conversão endereço ↔ coordenadas
- ✅ Endereços formatados

### Sem Google Maps API (Modo Manual)

- ✅ Inserção manual de coordenadas
- ✅ Localização atual via GPS
- ✅ Validação de coordenadas
- ✅ Instruções para obter coordenadas

## 🎮 Como Usar

### Para Doadores

1. Acesse a página "Criar Oferta"
2. Preencha as informações do doador
3. Descreva os alimentos disponíveis
4. Configure a localização:
   - **Com API**: Busque o endereço ou use localização atual
   - **Sem API**: Insira coordenadas ou use localização atual
5. Defina prazo de retirada
6. Submeta a oferta

### Para Voluntários

1. Acesse o dashboard para ver estatísticas
2. Visualize ofertas disponíveis
3. Reserve uma oferta clicando em "Reservar"
4. Atualize status para "Em Trânsito" ao sair para buscar
5. Marque como "Entregue" após completar a entrega

## 📊 API Endpoints

### Ofertas

- `GET /api/offers` - Listar todas as ofertas
- `POST /api/offers` - Criar nova oferta
- `PUT /api/offers/{id}/reserve` - Reservar oferta
- `PUT /api/offers/{id}/in-transit` - Marcar em trânsito
- `PUT /api/offers/{id}/delivered` - Marcar como entregue
- `PUT /api/offers/{id}/cancel` - Cancelar oferta
- `GET /api/offers/statistics` - Estatísticas gerais

### Console H2

- Acesse: http://localhost:8081/h2-console
- JDBC URL: `jdbc:h2:mem:foodrescue`
- Usuário: `sa`
- Senha: (vazio)

## 🔧 Configuração Avançada

### Personalizar Porta do Backend

```properties
# application.properties
server.port=8082
```

### Configurar CORS

```java
// WebConfig.java
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
        .allowedOrigins("http://localhost:3000", "https://seu-dominio.com")
        .allowedMethods("*");
}
```

## 🌟 Próximas Funcionalidades

- [ ] Autenticação de usuários
- [ ] Notificações em tempo real
- [ ] Mapa interativo com ofertas
- [ ] Sistema de avaliações
- [ ] Relatórios detalhados
- [ ] App mobile nativo
- [ ] Integração com redes sociais

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Desenvolvedores

- **Backend**: Spring Boot, JPA, H2 Database
- **Frontend**: React, TypeScript, Tailwind CSS
- **Integração**: Google Maps API, Geolocation API

---

### 🎯 Missão

_Conectar pessoas, reduzir desperdício, combater a fome._

**NoMoreHunger** - Porque cada refeição importa! 🍽️❤️
