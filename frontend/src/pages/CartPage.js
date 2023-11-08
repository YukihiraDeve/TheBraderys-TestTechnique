import '../styles/main.css';
import '../styles/CartPage.css'

import { useMutation } from '@apollo/client';
import { ADD_TO_CART_MUTATION } from '../components/graphql/mutations';
import { CartContext } from '../components/CartContext';
import { useContext } from 'react';

const CartPage = () => {
    const { cartItems, addToCart } = useContext(CartContext);
    const [addProductToCart] = useMutation(ADD_TO_CART_MUTATION);

    const handleAddToCart = (productId, quantity) => {
        addProductToCart({ variables: { productId, quantity } })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="background">
            <div className="container">
                <h1 className="title">Votre Panier</h1>
                <button className="place-order-button">Commander</button>
            </div>
        </div>
    );
};


export default CartPage;