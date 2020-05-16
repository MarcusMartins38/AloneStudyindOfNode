const { Model, DataTypes } = require('sequelize');
const Note = require('./Note');

class User extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING,
        uf: DataTypes.STRING,
      },
      {
        sequelize: connection, //Conexão com o banco de dados
      },
    );
  }
  static associate(models) {
    this.hasMany(models.Note, { foreignKey: 'user_id', as: 'notes' });
  }
}

module.exports = User;
