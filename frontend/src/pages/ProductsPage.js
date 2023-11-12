import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_QUERY } from '../components/graphql/queries';
import { CartContext } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';


import "../styles/ProductsPage.css"
import panier from "../assets/cart.png"

const ProductsPage = () => {
    const { data, loading, error } = useQuery(GET_PRODUCTS_QUERY);
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const goToCartPage = () => {
        navigate('/cart');
    };

    useEffect(() => {
        if (data) {
            setProducts(data.products);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="products-container">
            <button className="cart-button">
            <img src={panier} alt="Panier" onClick={goToCartPage} />
            {/* Ajoute ici d'autres éléments si nécessaire */}
            </button>
            <h1>Produits</h1>
            <ul className="products-list">
                {products.map(product => (
                    <li key={product.id} className="product-item">
                        <span className="product-name">{product.name}</span>
                        <span className="product-price">{product.price} €</span>
                        <button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
                            Ajouter au Panier
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsPage;
