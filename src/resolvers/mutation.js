import bcryptjs from "bcryptjs";

import User from "../models/user";
import Product from "../models/product";

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
  }, // ********************** End Signup  ***************************
  createProduct: async (parent, args, context, info) => {
    const userId = "5ea50c78dfcce43dd43fe5dd";

    if (!args.description || !args.price || !args.imageUrl) {
      throw new Error("Please provide all required fields");
    }

    const product = await Product.create({ ...args, user: userId });
    const user = await User.findById(userId);

    if (!user.products) {
      user.products = [product];
    } else {
      user.products.push(product);
    }

    await user.save();
    return Product.findById(product.id).populate({
      path: "user",
      populate: { path: "products" },
    });
  },
};

export default Mutation;
