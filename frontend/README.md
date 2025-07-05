<<<<<<< HEAD
# Frontend - Automotores Ferradas

Este frontend está construido con React y TypeScript, usando TailwindCSS para estilos. Está organizado siguiendo el patrón Modelo-Vista-Controlador (MVC) para facilitar el mantenimiento y la escalabilidad.

## Estructura

- `src/views/` - Vistas principales de la aplicación (Home, Vehículos, Servicios, Contacto, Auth)
- `src/controllers/` - Lógica de negocio y manejo de eventos (autenticación, mensajes, etc)
- `src/services/` - Servicios para interactuar con la API del backend
- `App.tsx` - Composición principal de la app (irá quedando más limpia)
- `main.tsx` - Punto de entrada de React

## Instalación y ejecución

=======
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
>>>>>>> a3a13c3554dd23bb90b5384f1fd2b1d879a2ae1b
```bash
cd frontend
npm install
npm run dev
```
<<<<<<< HEAD

El frontend corre por defecto en http://localhost:5173

## Notas
- Debes tener el backend corriendo en http://localhost:4000 para que la app funcione correctamente.
- El login y registro usan cookies para mantener la sesión.
- El formulario de contacto requiere que el usuario esté autenticado.

## Proximos cambios

-Agregar un carrousel a la pantalla inicial,donde se pasen las fotos solas
-Modificar las tarjetas de los autos 
-terminar los carruseles de los autos 
-Modificar Informacion de toda la pagina
-agregar carrusel automatico sobre Nuestros Clientes y unidades Vendidas
-sacar el envianos tu mensaje y rellenar con mas informacion para contactarnos
-agregar animaciones al scroll 
-agregar animaciones a la hora de entrar a la pagina.

---

Para más detalles sobre la API y la base de datos, revisa el README en `../backend/`. 
=======
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
>>>>>>> a3a13c3554dd23bb90b5384f1fd2b1d879a2ae1b
