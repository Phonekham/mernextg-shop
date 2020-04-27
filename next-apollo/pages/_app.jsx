import { ApolloProvider } from "@apollo/react-hooks";

import PageLayout from "../components/PageLayout";
import apolloClient from "../apollo/apolloClient";

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <PageLayout>
        <Component {...pageProps}></Component>
      </PageLayout>
    </ApolloProvider>
  );
}

export default apolloClient(MyApp);
