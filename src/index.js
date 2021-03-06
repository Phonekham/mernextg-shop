import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";

dotenv.config();
import server from "./server";
import { facebookPassportConfig, googlePassportConfig } from "./utils/passport";
import { facebookAuth, googleAuth } from "./utils/socialProvidersAuth";

// const DB_USER = "username"; // use your mongodb cluster username
// const DB_PASSWORD = "password"; // use your mongodb cluster password
// const DB_NAME = "ecommerce";
const { PORT } = process.env;
facebookPassportConfig();
googlePassportConfig();

const createServer = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mernextg-shop", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });

    const app = express();

    app.get(
      "/auth/facebook",
      passport.authenticate("facebook", { scope: ["email"] })
    );

    app.get(
      "/auth/facebook/callback",
      passport.authenticate("facebook", {
        session: false,
        failureRedirect: "http://localhost:3000/signin",
      }),
      // (req, res) => {
      //   const user = req.user;
      //   console.log(user);

      //   res.redirect("http://localhost:3000/products");
      // }
      facebookAuth
    );

    app.get(
      "/auth/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
    );

    app.get(
      "/auth/google/callback",
      passport.authenticate("google", {
        session: false,
        failureRedirect: "http://localhost:3000/signin",
      }),
      googleAuth
    );

    server.applyMiddleware({ app });

    app.listen({ port: PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

createServer();
