import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/database';

// Modelo de Usuario
class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'User'
});

export default User; 