import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/cart">
            <a>Cart</a>
          </Link>
        </li>
        <li>
          <Link href="/signin">
            <a>Signin</a>
          </Link>
        </li>
        <li>
          <Link href="signup">
            <a>Signup</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
