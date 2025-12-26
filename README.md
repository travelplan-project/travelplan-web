# TravelPlan Web 🚗✈️

Este é o Frontend do ecossistema **TravelPlan**, desenvolvido em React para gerenciar veículos e viagens de forma integrada ao projeto Backend em Spring Boot. O objetivo é replicar a experiência do App Android em uma interface Web moderna e responsiva.

## 🏛️ Arquitetura e Integração

O sistema opera em uma arquitetura de cliente-servidor:
1.  **Frontend:** SPA (Single Page Application) construída com **React 18**, **Vite** e **Tailwind CSS v4**.
2.  **Backend (API):** Serviço REST em **Java / Spring Boot** que gerencia a lógica de negócio e persistência de dados.
3.  **Comunicação:** Realizada via requisições assíncronas utilizando a biblioteca **Axios**.

---

## 🛠️ Tecnologias e Dependências

- **Vite**: Ferramenta de build e servidor de desenvolvimento ultra-rápido.
- **Tailwind CSS v4**: Estilização baseada em utilitários e variáveis de tema modernas.
- **Axios**: Cliente HTTP para consumo de endpoints.
- **PostCSS**: Processador de CSS para compatibilidade e otimização.

---

## 📂 Estrutura de Pastas

Para manter a organização e escalabilidade, o projeto utiliza a seguinte estrutura:

- `src/components/`: Componentes visuais reutilizáveis (Ex: `VehicleCard.jsx`).
- `src/services/`: Configurações de serviços e conexão com a API (`api.js`).
- `src/assets/`: Recursos estáticos como imagens e ícones.
- `src/pages/`: Telas principais da aplicação (Home, Veículos, Viagens).
- `App.jsx`: Componente principal que gerencia o estado e a renderização.
- `index.css`: Configurações globais e definição do tema visual (Cores Android).

---

## 🚀 Como Retomar o Desenvolvimento

Sempre que precisar configurar o ambiente em uma nova máquina ou retomar o projeto, siga estes passos:

### 1. Pré-requisitos
- Node.js instalado (versão 18 ou superior).
- Projeto Backend (Spring Boot) configurado para aceitar **CORS** da origem `http://localhost:5174`.

### 2. Instalação
No terminal da raiz do projeto, instale todas as dependências listadas no `package.json`:
```bash
npm install
```
### 3. Configuração da API
Verifique se o arquivo src/services/api.js está apontando para o endereço correto do seu servidor local:

```JavaScript
const api = axios.create({
  baseURL: 'http://localhost:8081/api', 
});
```

### 4. Execução
Inicie o servidor de desenvolvimento:

```Bash
npm run dev
```

--- 

## 🔧 Configurações Críticas de Ambiente
**Resolvendo Alertas de CSS no VS Code**
O Tailwind v4 utiliza regras novas como @theme e @layer. Para evitar alertas de "Unknown at rule" no VS Code:

1. Vá em Settings (Ctrl + ,).
2. Pesquise por css.lint.unknownAtRules.
3. Altere para ignore.

**Integração com GitHub**
Este projeto está vinculado à organização travelplan-project. Certifique-se de realizar commits frequentes via GitHub Desktop para manter a sincronia e o backup na nuvem.

---