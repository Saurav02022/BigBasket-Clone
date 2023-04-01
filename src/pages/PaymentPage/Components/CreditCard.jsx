import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Image,
  Button,
  Checkbox,
  Text,
  HStack,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

import { useDispatch, useSelector } from "react-redux";

import { CardImages } from "./Data/CardImages";

import { useNavigate } from "react-router-dom";
import { successPayment } from "../../../redux/CartPage/action";

const CreditCard = () => {
  const [cardNumber, setcardNumber] = useState("");
  const [expiry, setExipry] = useState("");
  const [cvv, setcvv] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { totalCartPrice } = useSelector((state) => state.CartReducer);

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
    if (cardNumber.length !== 16) {
      showToast(
        "card number should be 16 digits without any spaces",
        "warning"
      );
      return;
    }
    if (!expiry.includes("/")) {
      showToast("Expiry should be a valid number", "warning");
      return;
    }

    if (cvv.length !== 3 && typeof Number(cvv) !== Number) {
      showToast("invalid cvv number", "warning");
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
        Credit/Debit Card
      </Heading>
      <hr />
      <Flex gap="2">
        <Text
          ontFamily="Inter"
          fontSize="10px"
          fontWeight="600"
          color="gray.500"
        >
          WE ACCEPT
        </Text>
        <HStack spacing="2">
          {CardImages.map(({ id, src, alt }) => (
            <Image key={id} src={src} width="" height="" alt={alt} />
          ))}
        </HStack>
      </Flex>
      <Input
        placeholder="Card Number"
        type="number"
        isRequired={true}
        onChange={(e) => setcardNumber(e.target.value)}
      />
      <Flex gap="2">
        <Input
          placeholder="Expiry (MM/YY)"
          type="text"
          isRequired={true}
          onChange={(e) => setExipry(e.target.value)}
        />
        <InputGroup>
          <InputRightElement
            pointerEvents="none"
            children={<InfoIcon color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="CVV"
            isRequired={true}
            onChange={(e) => setcvv(e.target.value)}
          />
        </InputGroup>
      </Flex>
      <Flex gap="1">
        <Checkbox colorScheme="pink" isRequired={true}>
          Save this card securely for future
        </Checkbox>
        <Text
          fontFamily="Inter"
          fontSize="12px"
          fontWeight="500"
          color="#388DFF"
          marginTop="1"
        >
          Know more
        </Text>
      </Flex>
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
        onClick={handleBtn}
      >
        Pay ₹ {totalCartPrice.toFixed(1)}
      </Button>
    </Flex>
  );
};

export default CreditCard;
