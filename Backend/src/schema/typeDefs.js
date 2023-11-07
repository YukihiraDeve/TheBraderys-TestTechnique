// src/schema/typeDefs.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    inventory: Int!
  }

  type Query {
    products: [Product]
  }
`;

module.exports = typeDefs;
