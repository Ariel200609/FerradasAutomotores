# Frontend - Automotores Ferradas

Este frontend está construido con React y TypeScript, usando TailwindCSS para estilos. Está organizado siguiendo el patrón Modelo-Vista-Controlador (MVC) para facilitar el mantenimiento y la escalabilidad.

## Estructura

- `src/views/` - Vistas principales de la aplicación (Home, Vehículos, Servicios, Contacto, Auth)
- `src/controllers/` - Lógica de negocio y manejo de eventos (autenticación, mensajes, etc)
- `src/services/` - Servicios para interactuar con la API del backend
- `App.tsx` - Composición principal de la app (irá quedando más limpia)
- `main.tsx` - Punto de entrada de React

## Instalación y ejecución

```bash
cd frontend
npm install
npm run dev
```

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