const connection = require('../db');

const resolvers = {
  Query: {
    products: () => {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM Products', (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        });
      });
    },
  },
};

module.exports = resolvers;
