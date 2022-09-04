import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    _user: User
  }

  type Mutation {
    register(credentials: RegisterMutationInput!): String
    login(credentials: LoginMutationInput!): String
  }

  type User {
    uid: String
    username: String
  }

  input RegisterMutationInput {
    email: String!
    username: String!
    password: String!
    confirmPassword: String!
  }

  input LoginMutationInput {
    email: String!
    password: String!
  }
`;

export default typeDefs;
