import { Flex, Heading, Input, Button, useToast } from "@chakra-ui/react";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { successPayment } from "../../../redux/CartPage/action";

const GiftCard = () => {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setcardNumber] = useState(0);
  const [pin, setPin] = useState(0);

  const { totalCartPrice } = useSelector((state) => state.CartReducer);

  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showToast = (description, status) => {
    toast({
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  const handlebtn = () => {
    if (cardNumber.length !== 11) {
      showToast("Please enter a vaild 11 digit card number", "warning");
      return;
    }
    if (pin.length !== 4) {
      showToast("Please enter a valid 4 digit pin number", "warning");
      return;
    }
    setLoading(true);
    showToast("Payment Successfully", "success");
    setTimeout(() => {
      dispatch(successPayment());
      navigate("/");
      setLoading(false);
    }, 2100);
  };

  if (loading) {
    return <Heading textAlign={"center"}>loading....</Heading>;
  }
  return (
    <Flex
      gap="2"
      direction="column"
      border="px solid red"
      width={{
        base: "",
        sm: "",
        md: "",
        lg: "25.75rem",
        xl: "25.75rem",
        "2xl": "25.75rem",
      }}
    >
      <Heading as="h1" fontFamily="Inter" fontSize="20px" fontWeight="600">
        Gift Card
      </Heading>
      <hr />
      <Input
        placeholder="Gift Card Number"
        type="number"
        isRequired={true}
        onChange={(event) => setcardNumber(event.target.value)}
      />
      <Flex gap="2">
        <Input
          placeholder="PIN"
          type="number"
          required
          width="40%"
          isRequired={true}
          onChange={(event) => setPin(event.target.value)}
        />
        <Button
          width="60%"
          color="#FFFFFF"
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="600"
          height="49px"
          padding="12px 12px 12px 12px"
          backgroundColor="#689f38"
          _hover={{
            color: "#FFFFFF",
            backgroundColor: "#689f38",
          }}
          onClick={handlebtn}
        >
          Pay ₹{totalCartPrice.toFixed(1)}
        </Button>
      </Flex>
    </Flex>
  );
};

export default GiftCard;
