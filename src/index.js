import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();
import server from "./server";

// const DB_USER = "username"; // use your mongodb cluster username
// const DB_PASSWORD = "password"; // use your mongodb cluster password
// const DB_NAME = "ecommerce";
const { PORT } = process.env;

const createServer = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mernextg-shop", {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const app = express();

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
