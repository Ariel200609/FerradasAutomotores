# Guía de Desarrollo - Ferradas Automotores

## Instalación y Primeros Pasos

1. **Instala las dependencias:**
   ```bash
   cd frontend
   npm install
   ```
2. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
3. **Accede a la app:**
   - Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## Estructura de Carpetas

- `frontend/src/components/` — Componentes reutilizables (Header, Footer, VehicleGrid, etc.)
- `frontend/src/views/` — Vistas principales (HomeView, otras páginas si las agregas)
- `frontend/src/AppRoutes.tsx` — Definición de rutas principales
- `frontend/src/main.tsx` — Entry point de la app

---

## Buenas Prácticas

- **Mantén los componentes reutilizables en `components/` y las vistas en `views/`.**
- **Usa rutas absolutas o relativas claras en los imports.**
- **No dupliques archivos ni carpetas.**
- **Usa Tailwind para estilos rápidos y consistentes.**
- **Para nuevas páginas, crea un componente en `views/` y agrégalo a `AppRoutes.tsx`.**
- **Para navegación entre secciones, usa anchors (`/#seccion`) o React Router según corresponda.**
- **Haz commit frecuente y con mensajes claros.**

---

## Tips de Desarrollo

- Si agregas un nuevo modelo de auto, crea un nuevo componente de detalle en `components/` y una ruta en `AppRoutes.tsx`.
- Si el scroll o navegación no funciona como esperas, revisa los IDs y los imports.
- Si ves una pantalla en blanco, revisa la consola del navegador y la terminal para errores de importación o rutas.
- Para cambios globales de estilos, edita `index.css` o la configuración de Tailwind.

---

## Scripts útiles

- `npm run dev` — Inicia el servidor de desarrollo
- `npm run build` — Compila la app para producción
- `npm run preview` — Previsualiza la app compilada

---

## Contacto

Para dudas o mejoras, contacta al equipo de desarrollo o revisa este archivo antes de hacer cambios grandes. 