'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Relation N:M, relation entre la table User et Message, via Comment.
      models.User.belongsToMany(models.Message,{
        through: models.Comment,
        foreignKey: 'userId',
        otherKey: 'messageId',
      });

      // Relation N:M, relation entre la table User et Message, via Comment.
      models.Message.belongsToMany(models.User,{
        through: models.Comment,
        foreignKey:'messageId',
        otherKey: 'userId',
      });

      // Relation entre les clés étrangères et la table de référence
      models.Comment.belongsTo(models.User,{
        foreignKey:'userId',
        // utilisation d'un Alias
        as: 'user',
      });
      
      // Relation entre les clés étrangères et la table de référence
      models.Comment.belongsTo(models.Message,{
        foreignKey:'messageId',
        // utilisation d'un Alias
        as: 'message',
      });
    };
  };
  Comment.init({
    messageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Message',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    username: DataTypes.STRING,
    comment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};