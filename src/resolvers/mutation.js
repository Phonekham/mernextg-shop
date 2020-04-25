import bcryptjs from "bcryptjs";

const Mutation = {
  signup: async (parent, args, context, info) => {
    // Check if email already exist
    const email = args.email.trim().toLowerCase();
    const currentUsers = await User.find({});
    const isEmailExist =
      currentUsers.findIndex((user) => user.email === email) > -1;
    if (isEmailExist) {
      throw new Error("Email alread exist");
    }

    //validate password
    if (args.password.trim().length < 6) {
      throw new Error("Password must be atleast 6 chars");
    }

    const password = await bcryptjs.hash(args.password, 10);

    return User.create({ ...args, email, password });
  },
};

export default Mutation;
