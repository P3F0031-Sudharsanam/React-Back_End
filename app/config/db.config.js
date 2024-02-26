module.exports = {
  HOST: `${process.env.DB_HOST_NAME}`,
  USER: `${process.env.DB_USERNAME}`,
  PASSWORD: `${process.env.DB_PASSWORD}`,
  DB: `${process.env.DB_NAME}`,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
