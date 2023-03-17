import React, { useState } from "react";
import { Flex, Heading, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { successPayment } from "../../../redux/CartPage/action";

const Cod = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { totalCartPrice } = useSelector((state) => state.CartReducer);
  const toast = useToast();
  const navigate = useNavigate();
  const HandleClick = () => {
    if (totalCartPrice > 0) {
      setLoading(true);
      toast({
        description: "Payment Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      setTimeout(() => {
        dispatch(successPayment());
        navigate("/");
      }, 2500);
    }
  };

  if (loading) {
    return <Heading>loading....</Heading>;
  }
  return (
    <Flex
      gap="2"
      direction="column"
      border="0px solid red"
      width={{
        base: "",
        sm: "",
        md: "20.75rem",
        lg: "18rem",
        xl: "25.75rem",
        "2xl": "25.75rem",
      }}
    >
      <Heading as="h1" fontFamily="Inter" fontSize="20px" fontWeight="600">
        Cash On Delivery
      </Heading>
      <hr />
      <Button
        color="#FFFFFF"
        fontFamily="Inter"
        fontSize="16px"
        fontWeight="600"
        height="49px"
        padding="12px 12px 12px 12px"
        backgroundColor="#689f38"
        _hover={{
          color: "white",
          backgroundColor: "#689f38",
        }}
        onClick={HandleClick}
      >
        Place order
      </Button>
    </Flex>
  );
};

export default Cod;
