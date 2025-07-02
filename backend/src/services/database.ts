import { Sequelize } from 'sequelize';
import path from 'path';

// Inicializar Sequelize con SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: false
});

export default sequelize; 