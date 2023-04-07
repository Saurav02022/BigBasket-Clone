import App from "./App";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";

import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-1dgnkgwm6uqjfe4t.uk.auth0.com"
    clientId="A7LgKUHdbAKosciCrwccMZOiBcHO6oXu"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </Auth0Provider>
);
