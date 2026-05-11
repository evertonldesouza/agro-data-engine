# Agro Data Engine 🌿🚜

Plataforma fullstack de monitoramento de commodities (Milho e Soja) em tempo real. O projeto demonstra a integração entre Engenharia de Dados (Python), Backend escalável (.NET) e uma interface reativa (React).

## 🏛️ Arquitetura do Sistema
O sistema foi desenhado seguindo os princípios de **Clean Architecture**, garantindo que as regras de negócio sejam independentes de frameworks e bancos de dados.

- **AgroData.Domain:** Entidades de negócio e interfaces de repositório.
- **AgroData.Application:** DTOs, Mappers e lógica de serviços.
- **AgroData.Infrastructure:** Implementação do Data Context (EF Core) e Repositórios.
- **AgroData.API:** Endpoints REST e configuração de injeção de dependência.

## 🛠️ Tecnologias Utilizadas
- **Linguagens:** C# (Backend), Python (Data Engine), JavaScript (Frontend).
- **Banco de Dados:** PostgreSQL via Docker.
- **Estilização:** Tailwind CSS v4.
- **Visualização:** Recharts para gráficos de tendência.

## 🚀 Como Executar
1. Suba o banco via Docker: `docker-compose up -d`
2. Inicie a API: `cd src/backend/AgroData.API && dotnet run`
3. Inicie o Frontend: `cd src/frontend && npm run dev`

---
*Desenvolvido como parte de uma jornada de evolução profissional de tecnologias legadas para uma Stack Moderna.*