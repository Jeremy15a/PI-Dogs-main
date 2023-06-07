const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('temperaments', {
    temperaments: { 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true, 
      increment: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });
};
