import '../styles/main.css';
import '../styles/CartPage.css'
import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import '../styles/CartPage.css'; // Assure-toi que ce fichier contient tous les styles nécessaires

const CartPage = () => {
    const { cartItems, setCartItems } = useContext(CartContext);

    const updateQuantity = (index, newQuantity) => {
        const newCartItems = [...cartItems];
        newCartItems[index].quantity = newQuantity;
        setCartItems(newCartItems);
    };

    return (
        <div className="background">
            <div className="container">
                <h1 className="title">Votre Panier</h1>
                <div class="cart-items-container">
                    {cartItems.map((item, index) => (
                        <div className="cart-item" key={index}>
                            <span className="item-name">{item.name}</span>
                            <div className="quantity-controls">
                                <button onClick={() => updateQuantity(index, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
                            </div>
                            <span className="item-price">{item.price} €</span>
                        </div>
                    ))}
                </div>
                <button className="place-order-button">Commander</button>
            </div>
        </div>
    );
};

export default CartPage;
