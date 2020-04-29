import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";
import cookie from "cookie";

import AuthProvider from "../appState/AuthProvider";
import PageLayout from "../components/PageLayout";
import apolloClient from "../apollo/apolloClient";

const QUERY_USER = {
  query: `
    query {
      user {
      id
      name
      email
      carts {
        product {
          id
          description
        }
      }
      products {
        id
        description
      }
    }
  }
  `,
};

function MyApp({ Component, pageProps, apollo, user }) {
  return (
    <ApolloProvider client={apollo}>
      <AuthProvider userData={user}>
        <PageLayout>
          <Component {...pageProps}></Component>
        </PageLayout>
      </AuthProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async ({ ctx, router }) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps;
  }

  const { headers } = ctx.req;
  const cookies = headers && cookie.parse(headers.cookie || "");
  const token = cookies && cookies.jwt;
  // console.log("token-->", token);

  if (!token) {
    if (router.pathname === "/cart") {
      ctx.res.writeHead(302, { location: "/signin" });
      ctx.res.end();
    }
    return null;
  }

  const response = await fetch("http://localhost:4444/graphql", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}` || "",
    },
    body: JSON.stringify(QUERY_USER),
  });

  if (response.ok) {
    const result = await response.json();
    return { user: result.data.user };
  } else {
    return null;
  }

  // const appProps = await App.getInitialProps(appContext);
  // return { ...appProps };
};

export default apolloClient(MyApp);
