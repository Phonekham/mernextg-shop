import { gql } from "apollo-server-express";

const users = [
  {
    id: 1,
    name: "phone",
  },
];

export const resolvers = {
  Query: {
    user: (parent, args, context, info) => {
      const id = args.id;
      const user = users.find((u) => u.id === id);
      return user;
    },
  },
};

export const typeDefs = gql`
  type Query {
    me: User!
    user(id: ID!): User
    users: [User!]!
  }
  type User {
    id: ID!
    name: String!
  }
`;
