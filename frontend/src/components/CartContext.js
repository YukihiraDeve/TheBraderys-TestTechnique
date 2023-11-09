import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        // Vérifier si le produit est déjà dans le panier
        const productIndex = cartItems.findIndex((item) => item.id === product.id);

        if (productIndex !== -1) {
            // Si le produit est déjà dans le panier, mettre à jour sa quantité
            const newCartItems = [...cartItems];
            newCartItems[productIndex] = {
                ...newCartItems[productIndex],
                quantity: newCartItems[productIndex].quantity + 1,
            };
            setCartItems(newCartItems);
        } else {
            // Si le produit n'est pas dans le panier, l'ajouter avec une quantité de 1
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems,addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
