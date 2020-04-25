import User from "../models/user";
import Mutation from "./mutation";

const Query = {
  user: (parent, args, context, info) => User.findById(args.id),
  users: (parent, args, context, info) => User.find({}),
};

const resolvers = {
  Query,
  Mutation,
};

export default resolvers;
