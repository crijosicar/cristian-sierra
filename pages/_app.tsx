import "../styles/globals.css";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./components/layout";
import theme from "./theme";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
