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
        // Ajoute ici d'autres requêtes si nécessaire
    },
    Mutation: {
        addToCart: (_, { productId, quantity }) => {
            // Cette fonction devrait idéalement vérifier le stock et mettre à jour une table de panier
            return new Promise((resolve, reject) => {
                connection.query('SELECT inventory FROM Products WHERE id = ?', [productId], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results.length > 0 && results[0].inventory >= quantity) {
                        // Ici, tu pourrais insérer ou mettre à jour la table Carts
                        // Exemple : connection.query('INSERT INTO Carts ...', callback);
                        resolve('Produit ajouté au panier');
                    } else {
                        resolve('Stock insuffisant');
                    }
                });
            });
        },
        placeOrder: (_, { productId, quantity }) => {
            return new Promise((resolve, reject) => {
                connection.query('SELECT inventory FROM Products WHERE id = ?', [productId], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    if (results.length > 0 && results[0].inventory >= quantity) {
                        connection.beginTransaction((err) => {
                            if (err) { reject(err); return; }

                            connection.query('INSERT INTO Orders (productId, quantity) VALUES (?, ?)', [productId, quantity], (insertError) => {
                                if (insertError) {
                                    connection.rollback(() => {
                                        reject(insertError);
                                    });
                                    return;
                                }

                                const newInventory = results[0].inventory - quantity;
                                connection.query('UPDATE Products SET inventory = ? WHERE id = ?', [newInventory, productId], (updateError) => {
                                    if (updateError) {
                                        connection.rollback(() => {
                                            reject(updateError);
                                        });
                                        return;
                                    }

                                    connection.commit((commitError) => {
                                        if (commitError) {
                                            connection.rollback(() => {
                                                reject(commitError);
                                            });
                                            return;
                                        }
                                        resolve('Commande passée avec succès');
                                    });
                                });
                            });
                        });
                    } else {
                        resolve('Stock insuffisant');
                    }
                });
            });
        },
    },
};

module.exports = resolvers;
