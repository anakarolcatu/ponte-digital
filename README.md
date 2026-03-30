# Ponte Digital

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-green?style=for-the-badge)

Plataforma web de inclusão digital que conecta **aprendizes** e **voluntários** em aulas com linguagem acessível, foco em autonomia tecnológica e impacto social.

## Funcionalidades

- Cadastro e login com autenticação via JWT.
- Perfis com dois papéis: `Aprendiz` e `Voluntário`.
- Catálogo de aulas com busca e filtro por categoria.
- Página de detalhes de aula com informações completas.
- Inscrição e cancelamento de inscrição em aulas.
- Área "Minhas aulas":
  - Aprendiz: visualiza aulas em que está inscrito.
  - Voluntário: visualiza turmas ministradas e inscritos.
- Dashboard com visão de impacto do projeto (dados mockados no front até ter quantitativo suficiente para análise).

## Arquitetura

Projeto em monorepo com workspaces npm:

```text
ponte-digital/
├── client/   # Frontend (React + Vite + Tailwind)
└── server/   # Backend (Node.js + Express + MongoDB)
```

## Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router DOM
- Axios

### Backend

- Node.js
- Express 5
- TypeScript
- MongoDB + Mongoose
- JWT + Bcrypt
- CORS + Cookie Parser

## Pré-requisitos

- Node.js 20+
- npm 10+
- MongoDB em execução (local ou remoto)

## Configuração do ambiente

### 1) Clone e instale dependências

```bash
git clone <url-do-repositorio>
cd ponte-digital
npm install
```

### 2) Variáveis de ambiente

Crie o arquivo `server/.env`:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/ponte_digital
JWT_SECRET=troque_por_um_segredo_forte
CLIENT_URL=http://localhost:5173
```

Crie o arquivo `client/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

## Executando o projeto

Rodar frontend e backend juntos:

```bash
npm run dev
```

Ou separadamente:

```bash
npm run dev:server
npm run dev:client
```

Acessos locais:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Health check: `http://localhost:3000/api/health`

## Scripts disponíveis

Na raiz:

- `npm run dev`: inicia workspaces em modo dev.
- `npm run build`: build de client e server.
- `npm run lint`: lint dos workspaces (quando disponível).

No `client`:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

No `server`:

- `npm run dev`
- `npm run build`
- `npm run start`

## Endpoints principais

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (autenticado)

### Aulas

- `GET /api/classes`
- `GET /api/classes/:id`
- `GET /api/classes/teacher/:teacherId`

### Inscrições

- `POST /api/enrollments` (autenticado)
- `DELETE /api/enrollments/:classId` (autenticado)
- `GET /api/enrollments/me` (autenticado)
- `GET /api/enrollments/class/:classId/users` (autenticado)

## Observações

- O frontend espera `VITE_API_URL` obrigatoriamente.
- O backend exige `MONGODB_URI` e `JWT_SECRET`.
- O painel de dashboard usa conteúdo mockado (arquivo `client/src/data/dashboard.ts`).

## Licença

Este projeto está sob licença **ISC** (conforme `package.json`).
