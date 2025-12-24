# TravelPlan Web 🚗✈️

Frontend em React + Vite para o sistema de gestão de viagens.

## 🛠️ Tecnologias
- **React 18** + **Vite**
- **Tailwind CSS v4** (Estilização)
- **Axios** (Comunicação com API Spring Boot)

## 🚀 Como Rodar o Projeto
1. **Instalar Dependências:**
   ```bash
   npm install


2. **Configurar Backend:**

Certifique-se de que o Spring Boot está rodando em http://localhost:8080.

Verifique se a anotação @CrossOrigin está ativa no Java.

3. **Iniciar Servidor de Desenvolvimento:**
   ```bash
   npm run dev  

## 📂 Estrutura de Pastas

- src/components: Componentes reutilizáveis (Ex: VehicleCard).
- src/services: Configurações de API e Axios.
- src/assets: Imagens e ícones.

---

### 2. Garantia de Dependências (`package.json`)
Sempre que você instala algo (como fez com o Axios e o Tailwind), o arquivo `package.json` registra isso. 
* **Para retomar o trabalho:** Basta baixar o código e digitar `npm install`. O Node.js lerá esse arquivo e baixará todas as bibliotecas exatamente nas versões que estamos usando agora.

---

### 3. Sincronização Final com o GitHub
Para que nada se perca, você deve "commitar" e "pushar" as alterações:

1.  Abra o **GitHub Desktop**.
2.  No campo **Summary**, digite: `Feat: Configuração inicial do Tailwind v4 e listagem de veículos`.
3.  Clique em **Commit to main**.
4.  Clique em **Push origin**.

Agora, seu código está salvo na nuvem da organização. Se seu computador quebrar hoje, bastará clonar o repositório em outro PC, rodar `npm install` e tudo estará lá.


---

### Dica para o Futuro: Variáveis de Ambiente
Atualmente, sua URL do backend está fixa no código (`localhost:8080`). No futuro, se você hospedar o Java na nuvem, precisaremos usar um arquivo `.env`. Mas, por enquanto, a estrutura atual está perfeita para desenvolvimento local.

**Deseja que eu ajude a criar um "Script de Setup" automático ou a documentação atual já atende o que você precisa para pausar agora?**

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
