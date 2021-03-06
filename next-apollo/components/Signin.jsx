import { useState, useContext } from "react";
import Link from "next/link";
import Router from "next/router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Cookies from "js-cookie";

import { AuthContext } from "../appState/AuthProvider";

const LOG_IN = gql`
  mutation LOG_IN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
        email
        products {
          id
          description
          imageUrl
          price
        }
        carts {
          id
          product {
            description
            price
            imageUrl
          }
          quantity
        }
      }
      jwt
    }
  }
`;

const Signin = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { setAuthUser } = useContext(AuthContext);

  const [login, { loading, error }] = useMutation(LOG_IN, {
    variables: { ...userInfo },
    onCompleted: (data) => {
      if (data) {
        setAuthUser(data.login.user);
        Cookies.set("jwt", data.login.jwt);
        Router.push("/products");
        setUserInfo({
          email: "",
          password: "",
        });
      }
    },
  });

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await login();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ margin: "100px" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          width: "30%",
        }}
        onSubmit={handleSubmit}
      >
        <input
          style={{ margin: "5px", height: "30px" }}
          type="email"
          name="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={handleChange}
        />
        <input
          style={{ margin: "5px", height: "30px" }}
          type="password"
          name="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={handleChange}
        />
        <button
          style={{
            margin: "5px",
            padding: "10px",
            background: "teal",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
          }}
          type="submit"
          disabled={loading}
        >
          Submit
        </button>
      </form>
      <div style={{ width: "30%", margin: "auto", cursor: "pointer" }}>
        <p>
          Forgot password ?{" "}
          <span onClick={() => Router.push("/signin/requestresetpassword")}>
            Click here
          </span>
        </p>
      </div>
      <div style={{ width: "30%", margin: "auto" }}>
        {error && (
          <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
        )}
      </div>
    </div>
  );
};

export default Signin;
