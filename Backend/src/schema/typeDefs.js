// src/schema/typeDefs.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    inventory: Int!
  }

  type Order {
    id: ID!
    productId: ID!
    quantity: Int!
  }

  type Query {
    products: [Product]
    orders: [Order]
  }

  type Mutation {
    addToCart(productId: ID!, quantity: Int!): String
    placeOrder(productId: ID!, quantity: Int!): String
  }
`;

module.exports = typeDefs;
