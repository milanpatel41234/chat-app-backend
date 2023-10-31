module.exports = (sequelize, Sequelize) => {
    const group = sequelize.define("group", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      adminId: { type: Sequelize.INTEGER, allowNull: false },
    });
    return group;
  };
  