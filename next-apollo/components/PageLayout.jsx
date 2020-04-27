import React from "react";
import Head from "next/head";

import Nav from "./Nav";

const PageLayout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>My shop</title>
        <link href="icon" href="/favicon.ico"></link>
      </Head>
      <Nav />
      {children}
    </div>
  );
};

export default PageLayout;
