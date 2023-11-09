import '../styles/main.css';
import '../styles/CartPage.css'
import { useContext } from 'react';
import { CartContext } from '../components/CartContext';

const CartPage = () => {
    const { cartItems } = useContext(CartContext);
    console.log("Articles dans le panier:", cartItems);

    return (
        <div className="background">
            <div className="container">
                <h1 className="title">Votre Panier</h1>
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.price} € - Quantité: {item.quantity || 1}
                        </li>
                    ))}
                </ul>
                <button className="place-order-button">Commander</button>
            </div>
        </div>
    );
};

export default CartPage;
