import { DataTypes, Model } from 'sequelize';
import sequelize from '../services/database';
import User from './user';

// Modelo de Mensaje
class Message extends Model {
  public id!: number;
  public content!: string;
  public userId!: number;
}

Message.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Message'
});

// Relación: Un usuario tiene muchos mensajes
User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });

export default Message; 