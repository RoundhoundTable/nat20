import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    _dummy: String
  }
`;

export default typeDefs;
