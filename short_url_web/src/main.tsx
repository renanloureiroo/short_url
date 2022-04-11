import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
