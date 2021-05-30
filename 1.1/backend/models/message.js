'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Le model actuel.typeDeRelation(models.référence)
      models.Message.belongsTo(models.User,{
        // La clé étrangère ne doit pas être égale à Null.
        foreignKey :{
          allowNull : false
        }
      })
      models.Message.hasMany(models.Like);
      models.Message.hasMany(models.Comment);
    }
  };
  Message.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};