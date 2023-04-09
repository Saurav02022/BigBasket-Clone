import {
  Flex,
  Heading,
  Input,
  Image,
  Button,
  Text,
  HStack,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CardImages } from "./Data/CardImages";
import useShowToast from "../../../CustomHooks/useShowToast";
import { successPayment } from "../../../redux/CartPage/action";
import backgroundColor from "../../../components/backgroundColor";

import { useFormik } from "formik";
import { CreditCardSchema } from "./Schema/CreditCard";

const initialValues = {
  cardNumber: "",
  expiry: "",
  cvv: "",
};

const CreditCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToast] = useShowToast();
  const [loading, setLoading] = useState(false);

  const { totalCartPrice } = useSelector((state) => state.CartReducer);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: CreditCardSchema,
      onSubmit: (value, action) => {
        handleBtn();
        action.resetForm();
      },
    });

  const handleBtn = () => {
    setLoading(true);
    showToast("Payment Successfully", "success", 4000);
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
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="">Card Number</FormLabel>
          <Input
            placeholder="Please fill your Card Number"
            name="cardNumber"
            autoComplete="off"
            type="number"
            value={values.cardNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.cardNumber && touched.cardNumber ? (
            <Text color="red" fontSize="sm">
              {errors.cardNumber}
            </Text>
          ) : null}
        </FormControl>
        <Flex gap="2">
          <FormControl>
            <FormLabel>Expiry</FormLabel>
            <Input
              name="expiry"
              autoComplete="off"
              placeholder="Please Enter your Expiry (MM/YY)"
              type="string"
              value={values.expiry}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.expiry && touched.expiry ? (
              <Text color="red" fontSize="sm">
                {errors.expiry}
              </Text>
            ) : null}
          </FormControl>
          <FormControl>
            <FormLabel>CVV</FormLabel>
            <InputGroup>
              <InputRightElement
                pointerEvents="none"
                children={<InfoIcon color="gray.300" />}
              />
              <Input
                name="cvv"
                autoComplete="off"
                type="number"
                placeholder="Please Enter your CVV"
                value={values.cvv}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.cvv && touched.cvv ? (
                <Text color="red" fontSize="sm">
                  {errors.cvv}
                </Text>
              ) : null}
            </InputGroup>
          </FormControl>
        </Flex>
        <Button
          type="submit"
          marginTop="5"
          color="#FFFFFF"
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="600"
          backgroundColor={backgroundColor}
          _hover={{
            color: "white",
            backgroundColor: { backgroundColor },
          }}
        >
          Pay ₹ {totalCartPrice.toFixed(1)}
        </Button>
      </form>
    </Flex>
  );
};

export default CreditCard;
