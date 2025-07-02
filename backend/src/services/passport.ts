import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/user';

// Estrategia local
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return done(null, false, { message: 'Usuario no encontrado' });
    if (!user.password) return done(null, false, { message: 'Usuario sin contraseña' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: 'Contraseña incorrecta' });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Serializar usuario en sesión
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserializar usuario de sesión
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport; 