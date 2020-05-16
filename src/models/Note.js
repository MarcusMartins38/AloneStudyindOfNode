const { Model, DataTypes } = require('sequelize');
const User = require('./User');

class Note extends Model {
  static init(connection) {
    super.init(
      {
        case_title: DataTypes.STRING,
        description: DataTypes.STRING,
        help: DataTypes.STRING,
      },
      {
        sequelize: connection, //Conexão com o banco de dados
      },
    );
  }
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Note;
