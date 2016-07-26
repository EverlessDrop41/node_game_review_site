module.exports = {
  isProduction: process.env.IS_PRODUCTION || false,
  isDevelopment: (function () { return !this.isProduction })(),
  port: process.env.PORT || 3000
};