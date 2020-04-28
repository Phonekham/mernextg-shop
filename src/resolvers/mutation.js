import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

import User from "../models/user";
import Product from "../models/product";
import CartItem from "../models/cartItem";

const Mutation = {
  login: async (parent, args, context, info) => {
    const { email, password } = args;
    // find user in DB
    const user = await User.findOne({ email })
      .populate({
        path: "products",
        populate: { path: "user" },
      })
      .populate({ path: "carts", populate: { path: "product" } });
    if (!user) throw new Error("Email not found, please signup");
    // check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid email or password");
    const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
      expiresIn: "30days",
    });
    return { user, jwt: token };
  },
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

    const password = await bcrypt.hash(args.password, 10);

    return User.create({ ...args, email, password });
  }, // ********************** End Signup  ***************************
  requestResetPassword: async (parent, { email }, context, info) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Email not found");
    const resetPasswordToken = randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() * 30 * 60 * 10;
    await User.findByIdAndUpdate(user.id, {
      resetPasswordToken,
      resetTokenExpiry,
    });

    return { message: "Please check your email to proceed to reset password" };
  },
  createProduct: async (parent, args, { userId }, info) => {
    if (!userId) throw new Error("please login");
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
  }, //************************ End createProduct *************************/
  updateProduct: async (parent, args, { userId }, info) => {
    const { id, description, price, imageUrl } = args;
    // Check if user logged in
    if (!userId) throw new Error("please login");

    const product = await Product.findById(id);

    // Check if user is owner
    if (userId !== product.user.toString()) {
      throw new Error("You are not authorized");
    }

    // form update information
    const updateInfo = {
      description: !!description ? description : product.description,
      price: !!price ? price : product.price,
      imageUrl: !!imageUrl ? imageUrl : product.imageUrl,
    };
    // update product in database
    await Product.findByIdAndUpdate(id, updateInfo);
    // find the updated product
    const updatedProduct = await Product.findById(id).populate({
      path: "user",
    });
    return updatedProduct;
  }, //************************ End updateProduct *************************/
  addToCart: async (parent, args, { userId }, info) => {
    const { id } = args;
    if (!userId) throw new Error("please login");
    try {
      // find user who perform add to cart --> from login user
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
  }, //************************ End addToCart *************************/
  deleteCart: async (parent, args, { userId }, info) => {
    const { id } = args; //cartItem id
    const cart = await CartItem.findById(id);

    //  check if user is logged in
    if (!userId) throw new Error("please login");
    const user = await User.findById(userId);

    // check owner of the cart
    if (cart.user.toString() !== userId) {
      throw new Error("Not authorized");
    }
    // Delete cart
    const deleteCart = await CartItem.findOneAndRemove(id);
    const updatedUserCart = user.carts.filter(
      (cartId) => cartId.toString() !== deleteCart.id.toString()
    );
    await User.findByIdAndUpdate(userId, { carts: updatedUserCart });
    return deleteCart;
  },
};

export default Mutation;
