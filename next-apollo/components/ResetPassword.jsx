import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const RESET_PASSWORD = gql`
  mutation resetPassword($password: String!, $token: String!) {
    resetPassword(password: $password, token: $token) {
      message
    }
  }
`;

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD, {
    variables: { password, token: router && router.query.resetToken },
    onCompleted: (data) => {
      if (data) {
        setMessage(data.resetPassword.message);
      }
    },
  });

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await resetPassword();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ margin: "100px" }}>
      <p style={{ margin: "auto", width: "30%" }}>
        please enter your new password below
      </p>
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
          type="password"
          name="password"
          placeholder="your new passsword"
          value={password}
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
      <div style={{ width: "30%", margin: "auto" }}>
        {message && <p style={{ color: "blue" }}>{message}</p>}
      </div>
      <div style={{ width: "30%", margin: "auto" }}>
        {error && (
          <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
