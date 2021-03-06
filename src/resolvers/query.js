import User from "../models/user";
import Product from "../models/product";

const Query = {
  user: (parent, args, { userId }, info) => {
    // check if user logged in
    if (!userId) throw new Error("please login");
    return User.findById(userId)
      .populate({
        path: "products",
        options: { sort: { createdAt: "desc" } },
        populate: { path: "user" },
      })
      .populate({ path: "carts", populate: { path: "product" } });
  },
  users: (parent, args, context, info) =>
    User.find({})
      .populate({
        path: "products",
        populate: { path: "user" },
      })
      .populate({ path: "carts", populate: { path: "product" } }),
  product: (parent, args, context, info) =>
    Product.findById(args.id).populate({
      path: "user",
      populate: { path: "products" },
    }),
  products: (parent, args, context, info) =>
    Product.find()
      .populate({
        path: "user",
        populate: { path: "products" },
      })
      .sort({ createdAt: "desc" }),
};

export default Query;
