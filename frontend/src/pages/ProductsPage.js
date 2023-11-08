
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_QUERY } from '../components/graphql/mutations';

const ProductsPage = () => {
    const { data, loading, error } = useQuery(GET_PRODUCTS_QUERY);
    const [products, setProducts] = useState([]);

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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsPage;
