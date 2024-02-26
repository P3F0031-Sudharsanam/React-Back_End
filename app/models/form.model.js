module.exports = (sequelize, Sequelize) => {
  const Form = sequelize.define(
    "forms",
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
      status: {
        type: Sequelize.BOOLEAN,
      },
      formData: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      createdBy: {
        type: Sequelize.STRING,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      updatedBy: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Form;
};
