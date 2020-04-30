import { useContext } from "react";

import { AuthContext } from "../appState/AuthProvider";
import CartItem from "./CartItem";

const Carts = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ width: "70%", margin: "auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 2fr",
          widht: "100%",
        }}
      >
        <h3 style={{ margin: "auto" }}>Description</h3>
        <h3 style={{ margin: "auto" }}>Picture</h3>
        <h3 style={{ margin: "auto" }}>Price</h3>
        <h3 style={{ margin: "auto" }}>Quantity</h3>
        <h3 style={{ margin: "auto" }}>Amount</h3>
        <h3 style={{ margin: "auto" }}>Actions</h3>
      </div>
      {/* Body */}
      {user &&
        user &&
        user.carts.length > 0 &&
        user.carts.map((cart) => (
          <CartItem cart={cart} key={cart.id}></CartItem>
        ))}
    </div>
  );
};

export default Carts;
