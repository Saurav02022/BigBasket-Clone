import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const PrivateRoute = ({ children }) => {
  const toast = useToast();
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return children;
  } else {
    toast({
      description: "Please Login",
      status: "info",
      duration: 1000,
      isClosable: true,
      position: "top-right",
    });
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
