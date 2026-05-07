# AgroData Engine 🌾🚜

O **AgroData Engine** é uma plataforma de inteligência de dados voltada para o setor agrícola. O sistema automatiza a coleta de preços de commodities (Soja e Milho), processa tendências de mercado através de engenharia de dados e fornece um dashboard moderno para suporte à tomada de decisão.

---

## 🚀 A Solução
No volátil mercado agrícola, o monitoramento de preços é crucial. Este projeto resolve isso através de:
- **Pipeline de Dados Automatizado:** Um worker em Python que extrai, limpa e armazena dados do mercado.
- **Inteligência de Tendências:** Cálculo de médias móveis e volatilidade para identificar oportunidades.
- **API Profissional:** Backend em .NET 8 seguindo os princípios de **Clean Architecture**.
- **Interface Moderna:** Dashboard em React com visualização de dados em tempo real e suporte a modo escuro/claro.

## 🛠️ Tecnologias Utilizadas
- **Linguagens:** C#, Python, TypeScript.
- **Backend:** .NET 8 (Web API, Clean Architecture, JWT, EF Core).
- **Engenharia de Dados:** Python (SQLAlchemy, Pandas).
- **Banco de Dados:** PostgreSQL (Docker / Supabase).
- **Frontend:** React + Tailwind CSS.
- **Infraestrutura:** Docker, GitHub Actions, Render.

## 🏗️ Arquitetura
O projeto foi construído com foco em **manutenibilidade** e **escalabilidade**:
1. **Domain-Driven:** A lógica de negócio principal é isolada de frameworks externos.
2. **Serviços Desacoplados:** O Pipeline de dados em Python funciona de forma independente da Web API.
3. **Conteinerização:** Ambiente totalmente reproduzível utilizando Docker Compose.

---
*Desenvolvido como parte de uma jornada de evolução profissional de tecnologias legadas para uma Stack Moderna.*