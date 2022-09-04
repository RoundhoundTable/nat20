import { gql } from "apollo-server-micro";

// TODO: Add more complex typing and fields (purse, death_throws, equipment, etc)

const typeDefs = gql`
  type Query {
    _user: User
    campaigns: [Campaign]
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

  type Character {
    uid: String
    class: String
    classArmor: Int
    hitPoints: Int
    initiative: Int
    level: Int
    name: String
    picture: String
    proficiencyBonus: Int
    speed: Int
    spells: [String]
    user: User
  }

  type CampaignCharacter {
    uid: String
    character: Character
    hit_points: Int
    is_dead: Boolean
  }

  type Campaign {
    uid: String
    dungeon_master: User
    password: String
    title: String
    characters: [CampaignCharacter]
  }
`;

export default typeDefs;
