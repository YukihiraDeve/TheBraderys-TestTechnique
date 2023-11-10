import React, { useEffect, useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_QUERY } from '../components/graphql/queries';
import { CartContext } from '../components/CartContext';

const ProductsPage = () => {
    const { data, loading, error } = useQuery(GET_PRODUCTS_QUERY);
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (product) => {
        console.log(product.inventory)
        addToCart(product);
    };

    useEffect(() => {
        if (data) {
            setProducts(data.products);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <h1>Produits</h1>
            <ul>
            {products.map(product => (
            <li key={product.id}>
                {product.name} - {product.price} €
                <button onClick={() => handleAddToCart(product)}>Ajouter au Panier</button>
            </li>
        ))}
            </ul>
        </div>
    );
};

export default ProductsPage;
