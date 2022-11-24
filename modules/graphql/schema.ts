import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    _user: User
    characters: [Character]
  }

  type Mutation {
    register(credentials: RegisterMutationInput!): String
    login(credentials: LoginMutationInput!): String
    createCharacter(payload: CharacterCreateInput!): Boolean
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

  input CharacterCreateInput {
    name: String!
    race: String!
    class: String!
    level: Int!
    initiative: Int!
    hitPoints: Int!
    proficiencyBonus: Int!
    speed: Int!
    classArmor: Int!
    picture: String!
    stats: String!
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
