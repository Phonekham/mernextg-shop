// import { ApolloProvider } from "@apollo/react-hooks";

import PageLayout from "../components/PageLayout";

// function MyApp({ Component, pageProps, apollo }) {
//   return (
//     <ApolloProvider client={apollo}>
//       <PageLayout>
//         <Component {...pageProps}></Component>
//       </PageLayout>
//     </ApolloProvider>
//   );
// }

function MyApp({ Component, pageProps }) {
  return (
    <PageLayout>
      <Component {...pageProps}></Component>
    </PageLayout>
  );
}

export default MyApp;
