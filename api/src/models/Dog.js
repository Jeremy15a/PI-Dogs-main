const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    image:{
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.STRING,
    },
    weight:{
      type: DataTypes.STRING,
    },
    life_span:{
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
  );
};