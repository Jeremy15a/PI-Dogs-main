const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    reference_image_id:{
      type: DataTypes.NUMBER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type: DataTypes.NUMBER
    },
    weight:{
      type: DataTypes.NUMBER
    },
    life_span:{
      type: DataTypes.NUMBER
    },
  },
  { timestamps: false }
  );
};