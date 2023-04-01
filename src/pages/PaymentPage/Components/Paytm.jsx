import { Flex, Heading, Input, Button, useToast } from "@chakra-ui/react";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { successPayment } from "../../../redux/CartPage/action";

const Paytm = () => {
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const showToast = (description, status) => {
    toast({
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  const handleBtn = () => {
    if (number.length !== 10) {
      showToast("Please enter a valid 10 digit mobile number", "warning");
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
        Paytm Wallet
      </Heading>
      <hr />
      <Input
        placeholder="Phone Number"
        type="number"
        isRequired={true}
        onChange={(event) => setNumber(event.target.value)}
      />
      <Button
        onClick={handleBtn}
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
      >
        Link
      </Button>
    </Flex>
  );
};

export default Paytm;
