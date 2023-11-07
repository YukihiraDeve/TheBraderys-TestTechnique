const connection = require('../db');

const resolvers = {
    Query: {
        products: () => {
            console.log('Fetching all products');
            return new Promise((resolve, reject) => {
                connection.query('SELECT * FROM Products', (error, results) => {
                    if (error) {
                        console.error('Error fetching products:', error);
                        reject(error);
                    }
                    console.log('Products fetched successfully');
                    resolve(results);
                });
            });
        },
        // Ajoute d'autres requêtes si nécessaire
    },
    Mutation: {
        addToCart: (_, { productId, quantity }) => {
            console.log(`Adding product ${productId} to cart with quantity ${quantity}`);
            return new Promise((resolve, reject) => {
                connection.query('SELECT inventory FROM Products WHERE id = ?', [productId], (error, results) => {
                    if (error) {
                        console.error('Error checking inventory:', error);
                        reject(error);
                    }
                    if (results.length > 0 && results[0].inventory >= quantity) {
                        // Logique pour ajouter au panier (à développer)
                        console.log('Product added to cart');
                        resolve('Produit ajouté au panier');
                    } else {
                        console.log('Insufficient stock for product', productId);
                        resolve('Stock insuffisant');
                    }
                });
            });
        },
        placeOrder: (_, { productId, quantity }) => {
            console.log(`Placing order for product ${productId} with quantity ${quantity}`);
            return new Promise((resolve, reject) => {
                connection.query('SELECT inventory FROM Products WHERE id = ?', [productId], (error, results) => {
                    if (error) {
                        console.error('Error checking inventory:', error);
                        reject(error);
                    }
                    if (results.length > 0 && results[0].inventory >= quantity) {
                        connection.beginTransaction((err) => {
                            if (err) {
                                console.error('Error starting transaction:', err);
                                reject(err);
                            }

                            // Insérer la commande dans la table Orders
                            connection.query('INSERT INTO Orders (productId, quantity) VALUES (?, ?)', [productId, quantity], (insertError) => {
                                if (insertError) {
                                    console.error('Error inserting order:', insertError);
                                    connection.rollback(() => {
                                        reject(insertError);
                                    });
                                }
                            });

                            const newInventory = results[0].inventory - quantity;
                            connection.query('UPDATE Products SET inventory = ? WHERE id = ?', [newInventory, productId], (updateError) => {
                                if (updateError) {
                                    console.error('Error updating inventory:', updateError);
                                    connection.rollback(() => {
                                        reject(updateError);
                                    });
                                } else {
                                    connection.commit((commitError) => {
                                        if (commitError) {
                                            console.error('Error committing transaction:', commitError);
                                            connection.rollback(() => {
                                                reject(commitError);
                                            });
                                        }
                                        console.log('Order placed successfully');
                                        resolve('Commande passée avec succès');
                                    });
                                }
                            });
                        });
                    } else {
                        console.log('Insufficient stock for product', productId);
                        resolve('Stock insuffisant');
                    }
                });
            });
        },
    },
};

module.exports = resolvers;
