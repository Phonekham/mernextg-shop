import { useState, useContext } from "react";
import Link from "next/link";
import Router from "next/router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

// const REQUEST_RESET_PASSWORD = gql`
//   mutation requestResetPassword($email: String!) {
//     requestResetPassword(email: $email) {
//       message
//     }
//   }
// `;

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  //   const [message, setMessage] = useState("");

  //   const [requestResetPassword, { loading, error }] = useMutation(
  //     REQUEST_RESET_PASSWORD,
  //     {
  //       variables: { email },
  //       onCompleted: (data) => {
  //         if (data) {
  //           setMessage(data.requestResetPassword.message);
  //         }
  //       },
  //     }
  //   );

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      //   await requestResetPassword();
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
          //   disabled={loading}
        >
          Submit
        </button>
      </form>
      <div style={{ width: "30%", margin: "auto" }}>
        {/* {message && <p style={{ color: "blue" }}>{message}</p>} */}
      </div>
      {/* <div style={{ width: "30%", margin: "auto" }}>
        {error && (
          <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
        )}
      </div> */}
    </div>
  );
};

export default ResetPassword;
