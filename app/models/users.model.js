module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      // avatar: {
      //   type: Sequelize.BLOB('long'),
      // },
      // createdAt: {
      //   type: Sequelize.DATE,
      // },
      // createdBy: {
      //   type: Sequelize.STRING,
      // },
      // updatedAt: {
      //   type: Sequelize.DATE,
      // },
      // updatedBy: {
      //   type: Sequelize.STRING,
      // },
    },
    {
      timestamps: false,
    }
  );

  return Users;
};
