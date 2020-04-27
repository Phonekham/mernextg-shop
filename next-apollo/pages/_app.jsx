import PageLayout from "../components/PageLayout";

function MyApp({ Component, pageProps }) {
  return (
    <PageLayout>
      <Component {...pageProps}></Component>
    </PageLayout>
  );
}

export default MyApp;
