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

export const PROCESS_PAYMENT_MUTATION = gql`
    mutation ProcessPayment($name: String!, $number: String!, $date: String!, $security: String!) {
        processPayment(name: $name, number: $number, date: $date, security: $security) {
            success
            message
        }
    }
`;


