# Backend - Automotores Ferradas

Este backend está construido con Node.js, Express, Sequelize y SQLite. Soporta autenticación local (email y contraseña), manejo de sesiones con cookies y almacenamiento de mensajes de clientes.

## Estructura

- `src/models/` - Modelos de base de datos (Usuario, Mensaje)
- `src/controllers/` - Lógica de negocio (autenticación, mensajes)
- `src/routes/` - Rutas de la API
- `src/services/` - Servicios auxiliares (base de datos, passport)
- `src/config/` - Configuración adicional
- `app.ts` - Entrada principal del servidor

## Variables de entorno
Crea un archivo `.env` en la raíz de `backend/` con:

```
SESSION_SECRET=supersecreto
```

## Comandos útiles

- `npm run dev` - Inicia el servidor en modo desarrollo (TypeScript)
- `npm run build` - Compila el código TypeScript a JavaScript
- `npm start` - Ejecuta el servidor compilado

## Dependencias principales
- express
- express-session
- passport (local)
- bcryptjs
- sequelize + sqlite3
- cors
- dotenv
- typescript

## Notas
- El frontend debe correr en `http://localhost:5173` para desarrollo (ajusta CORS si usas otro puerto).
- Los mensajes de clientes solo pueden ser enviados por usuarios autenticados.
- El backend crea automáticamente la base de datos SQLite en la primera ejecución. 