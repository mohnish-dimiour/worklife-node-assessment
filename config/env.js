const dotenv = require('dotenv');

module.exports = () => {
  const environment = process.env.NODE_ENV || 'development';

  if (environment === 'production') {
    dotenv.config({ path: '.env.production' });
  } else if (environment === 'development') {
    dotenv.config({ path: '.env.development' });
  }
};
