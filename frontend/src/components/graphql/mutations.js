import { gql } from '@apollo/client';

export const ADD_TO_CART_MUTATION = gql`
    mutation AddToCart($productId: ID!, $quantity: Int!) {
        addToCart(productId: $productId, quantity: $quantity) {
            id
            productId
            quantity
        }
    }
`;

export const GET_PRODUCTS_QUERY = gql`
    query GetProducts {
        products {
            id
            name
            price
        }
    }
`;

