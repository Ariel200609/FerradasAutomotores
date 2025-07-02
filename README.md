# Automotores Ferradas - Fullstack

Este proyecto es una aplicación web fullstack con frontend en React (TypeScript) y backend en Node.js (Express, TypeScript, Sequelize, SQLite). Permite autenticación local (email y contraseña), y los clientes pueden dejar mensajes que se almacenan en la base de datos.

## Estructura del proyecto

```
AutomotoresFerradas/
│
├── backend/      # Servidor Express, base de datos y API
├── frontend/     # Aplicación React (cliente)
└── README.md     # Este archivo
```

## Requisitos previos
- Node.js >= 16
- npm

## Instalación y ejecución

### 1. Backend
```bash
cd backend
npm install
# Configura el archivo .env según backend/README.md
npm run dev
```
El backend corre por defecto en http://localhost:4000

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
El frontend corre por defecto en http://localhost:5173

## Flujo de uso
1. El usuario se registra o inicia sesión (email y contraseña).
2. Una vez autenticado, puede enviar mensajes desde la sección "Envíanos tu mensaje".
3. Los mensajes quedan almacenados en la base de datos del backend.

## Notas
- El backend y el frontend deben estar corriendo al mismo tiempo para el funcionamiento completo.
- El backend crea automáticamente la base de datos SQLite en la primera ejecución.
- El frontend está organizado en vistas, controladores y servicios para facilitar el mantenimiento.

---

Para más detalles sobre cada parte, revisa los README en `backend/` y `frontend/`. 