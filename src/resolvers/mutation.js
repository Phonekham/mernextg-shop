import bcryptjs from "bcryptjs";

import User from "../models/user";
import Product from "../models/product";
import CartItem from "../models/cartItem";

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
  addToCart: async (parent, args, context, info) => {
    const { id } = args;
    try {
      // find user who perform add to cart --> from login user
      const userId = "5ea50c78dfcce43dd43fe5dd";
      // check if new addToCArt item is already in user carts
      const user = await User.findById(userId).populate({
        path: "carts",
        populate: { path: "product" },
      });

      const findCartItemIndex = user.carts.findIndex(
        (cartItem) => cartItem.product.id === id
      );

      if (findCartItemIndex > -1) {
        // A. The new addToCart item is already in cart
        user.carts[findCartItemIndex].quantity += 1;
        await CartItem.findByIdAndUpdate(user.carts[findCartItemIndex].id, {
          quantity: user.carts[findCartItemIndex].quantity,
        });

        const updatedCartItem = await CartItem.findById(
          user.carts[findCartItemIndex].id
        )
          .populate({ path: "product" })
          .populate({ path: "user" });
        return updatedCartItem;
      } else {
        // B. The new addToCart item is not in cart
        // create new cartItem
        const cartItem = await CartItem.create({
          product: id,
          quantity: 1,
          user: userId,
        });
        // find new cart item
        const newCartItem = await CartItem.findById(cartItem.id)
          .populate({ path: "product" })
          .populate({ path: "user" });
        // update user cart
        await User.findByIdAndUpdate(userId, {
          carts: [...user.carts, newCartItem],
        });
        return newCartItem;
      }
    } catch (err) {
      console.log(err);
    }
  },
};

export default Mutation;
