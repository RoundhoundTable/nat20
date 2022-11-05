import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    _user: User
    characters: [Character]
  }

  type Mutation {
    register(credentials: RegisterMutationInput!): String
    login(credentials: LoginMutationInput!): String
    deleteCharacter(id: String!): Boolean
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

  type Character {
    id: String
    class: String
    classArmor: Int
    hitPoints: Int
    initiative: Int
    level: Int
    name: String
    picture: String
    proficiencyBonus: Int
    speed: Int
    user: User
  }
`;

export default typeDefs;
