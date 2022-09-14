const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("temperamento", {
    /*     type_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }, */
    temperament: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
/* 
ID
Nombre */
