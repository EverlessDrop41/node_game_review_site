module.exports = {
  isProduction: process.env.IS_PRODUCTION || false,
  isDevelopment: (function () { return !this.isProduction })(),
  port: process.env.PORT || 3000,
  db_username: process.env.DB_USERNAME || 'dev',
  db_password: process.env.DB_PASSWORD || 'password',
  db_host: process.env.DB_HOST || 'localhost',
  db_dialect: process.env.DB_DIALECT || 'mysql'
};