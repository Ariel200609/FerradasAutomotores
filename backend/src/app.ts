import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import sequelize from './services/database';
import './services/passport';
import authRoutes from './routes/auth';
import messageRoutes from './routes/messages';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Configuración de CORS para permitir peticiones del frontend
app.use(cors({
  origin: 'http://localhost:5173', // Cambia el puerto si tu frontend corre en otro
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

// Configuración de sesiones con cookies
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecreto',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // Cambia a true si usas HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 día
  }
}));

// Inicializar Passport para autenticación
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación y mensajes
app.use('/api/auth', authRoutes);
app.use('/api/mensajes', messageRoutes);

app.get('/', (req, res) => {
  res.send('Backend de Automotores Ferradas funcionando');
});

// Sincronizar base de datos y arrancar servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
  });
}); 