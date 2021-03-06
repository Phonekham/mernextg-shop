import { useContext } from "react";

import UserProductItem from "./UserProductItem";
import { AuthContext } from "../appState/AuthProvider";

const UserProducts = () => {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ width: "70%", margin: "auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 2fr 1fr 2fr",
          widht: "100%",
        }}
      >
        <h3 style={{ margin: "auto" }}>Description</h3>
        <h3 style={{ margin: "auto" }}>Picture</h3>
        <h3 style={{ margin: "auto" }}>Price</h3>
        <h3 style={{ margin: "auto" }}>Actions</h3>
      </div>
      {/* Body */}
      {user &&
        user &&
        user.products.length > 0 &&
        user.products.map((product) => (
          <UserProductItem product={product} key={product.id}></UserProductItem>
        ))}
    </div>
  );
};

export default UserProducts;
