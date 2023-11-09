import '../styles/main.css';
import '../styles/CartPage.css'
import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const navigate = useNavigate();


    const updateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) {
            // Si la quantité est inférieure à 1, supprimer l'article du panier
            const newCartItems = [...cartItems];
            newCartItems.splice(index, 1); // Supprime l'article à l'index spécifié
            setCartItems(newCartItems);
        } else {
            // Sinon, mettre à jour la quantité de l'article
            const newCartItems = [...cartItems];
            newCartItems[index] = {
                ...newCartItems[index],
                quantity: newQuantity
            };
            setCartItems(newCartItems);
        }
    };

    const goToProductsPage = () => {
        navigate('/product'); // Utilise la méthode push pour naviguer vers la page des produits
    };


    const handleDecreaseQuantity = (index) => {
        updateQuantity(index, cartItems[index].quantity - 1);
    };

    const handleIncreaseQuantity = (index) => {
        updateQuantity(index, cartItems[index].quantity + 1);
    };

    return (
        <div className="background">
            <div className="container">
                <h1 className="title">Votre Panier</h1>
                <div className="cart-items-container">
                    {cartItems.map((item, index) => (
                        <div className="cart-item" key={item.id}>
                            <span className="item-name">{item.name}</span>
                            <div className="quantity-controls">
                                <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleIncreaseQuantity(index)}>+</button>
                            </div>
                            <span className="item-price">{(item.price * item.quantity).toFixed(2)} €</span>
                        </div>
                    ))}
                </div>
                <button className="place-order-button">Commander</button>
                <button className="back-to-products-button" onClick={goToProductsPage}>
                    Retour aux articles
                </button>
            </div>
        </div>
    );
};

export default CartPage;
