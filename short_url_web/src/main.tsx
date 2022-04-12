import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
