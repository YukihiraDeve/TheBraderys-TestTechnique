import '../styles/main.css';
import '../styles/CartPage.css'
import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const navigate = useNavigate();


    const updateQuantity = (index, newQuantity) => {
        const item = cartItems[index];
        // Vérifier s'il y a suffisamment de stock
        if (newQuantity > item.inventory) {
            alert("Désolé, il n'y a pas assez de stock pour cet article.");
            return;
        }

        if (newQuantity < 1) {
            // Si la quantité est inférieure à 1, supprimer l'article du panier
            const newCartItems = [...cartItems];
            newCartItems.splice(index, 1);
            setCartItems(newCartItems);
            console.log("newCartItems", newCartItems)
        } else {
            // Sinon, mettre à jour la quantité de l'article
            const newCartItems = [...cartItems];
            newCartItems[index] = {
                ...item,
                quantity: newQuantity
            };
            setCartItems(newCartItems);
        }
    };

    const goToProductsPage = () => {
        navigate('/');
    };

    const goToPayementPage = () => {
        navigate('/payment');
    };


    const handleDecreaseQuantity = (index) => {
        updateQuantity(index, cartItems[index].quantity - 1);
    };

    const handleIncreaseQuantity = (index) => {
        updateQuantity(index, cartItems[index].quantity + 1);
    };

    const isOrderable = cartItems.every((item) => item.quantity <= item.inventory);

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
                                <button onClick={() => handleIncreaseQuantity(index)} disabled={item.quantity >= item.inventory}>+</button>
                            </div>
                            <span className="item-price">{(item.price * item.quantity).toFixed(2)} €</span>
                        </div>
                    ))}
                </div>
                <button className="place-order-button" disabled={!isOrderable} onClick={goToPayementPage}>Commander</button>
                <button className="back-to-products-button" onClick={goToProductsPage}>
                    Retour aux articles
                </button>
            </div>
        </div>
    );
};

export default CartPage;
