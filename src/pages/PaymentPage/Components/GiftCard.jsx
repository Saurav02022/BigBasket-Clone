import { Flex, Heading, Input, Button, Text } from "@chakra-ui/react";

import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { GiftCardSchema } from "./Schema/GiftCard";
import useShowToast from "../../../CustomHooks/useShowToast";
import HandleLoading from "../../../components/HandleLoading";
import { successPayment } from "../../../redux/CartPage/action";
import backgroundColor from "../../../components/backgroundColor";

const initialValues = {
  cardNumber: "",
  pin: "",
};

const GiftCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast] = useShowToast();
  const [loading, setLoading] = useState(false);

  const { totalCartPrice } = useSelector((state) => state.CartReducer);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: GiftCardSchema,
      onSubmit: (value, action) => {
        const flag = confirm("Are you sure you want to purchase ?");
        if (flag) {
          handlebtn();
        }
        action.resetForm();
      },
    });

  function handlebtn() {
    setLoading(true);
    showToast("Payment Successfully", "success", 4000);
    setTimeout(() => {
      dispatch(successPayment());
      navigate("/");
      setLoading(false);
    }, 2100);
  }

  if (loading) {
    return <HandleLoading />;
  }
  return (
    <form onSubmit={handleSubmit}>
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
          name="cardNumber"
          placeholder="Please Enter Your Gift Card Number"
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
        <Flex gap="2">
          <Input
            name="pin"
            placeholder="Please Enter Your PIN"
            autoComplete="off"
            type="number"
            value={values.pin}
            onChange={handleChange}
            onBlur={handleBlur}
            width="50%"
          />
          {errors.pin && touched.pin ? (
            <Text color="red" fontSize="sm">
              {errors.pin}
            </Text>
          ) : null}
          <Button
            width="50%"
            color="#FFFFFF"
            fontFamily="Inter"
            fontSize="16px"
            fontWeight="600"
            height="49px"
            padding="12px 12px 12px 12px"
            backgroundColor={backgroundColor}
            _hover={{
              color: "#FFFFFF",
              backgroundColor: { backgroundColor },
            }}
            type="submit"
          >
            Pay ₹{totalCartPrice.toFixed(1)}
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default GiftCard;
