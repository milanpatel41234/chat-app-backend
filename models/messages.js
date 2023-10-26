module.exports = (sequelize, Sequelize) => {
    const message = sequelize.define("message", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      text: { type: Sequelize.STRING, allowNull: false },
    });
    return message;
  };
  