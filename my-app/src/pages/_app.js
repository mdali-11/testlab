import { ChakraProvider } from "@chakra-ui/react";
import "@/styles/globals.css";
import store from "../Redux/store"
import { Provider } from "react-redux";

 function App({ Component, pageProps }) {
  return (
    
      <Provider store={store}>
      <ChakraProvider>
          <Component {...pageProps} />
          </ChakraProvider>
      </Provider>
 
  );
}

export default App;