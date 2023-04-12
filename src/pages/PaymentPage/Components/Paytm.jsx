import { Flex, Heading, Input, Button, Text } from "@chakra-ui/react";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import { PaytmSchema } from "./Schema/Paytm";
import useShowToast from "../../../CustomHooks/useShowToast";
import HandleLoading from "../../../components/HandleLoading";
import { successPayment } from "../../../redux/CartPage/action";
import backgroundColor from "../../../components/backgroundColor";

const initialValues = {
  mobileNumber: "",
};

const Paytm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast] = useShowToast();
  const [loading, setLoading] = useState(false);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: PaytmSchema,
      onSubmit: (value, action) => {
        const flag = confirm("Are you sure you want to payment ?");
        if (flag) {
          handleBtn();
        }
        action.resetForm();
      },
    });

  const handleBtn = () => {
    setLoading(true);
    setTimeout(() => {
      showToast("Payment Successfully", "success", 4000);
      dispatch(successPayment());
      navigate("/user/payment/confirm");
      setLoading(false);
    }, 2100);
  };

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
          Paytm Wallet
        </Heading>
        <hr />
        <Input
          placeholder="Phone Number"
          isRequired={true}
          name="mobileNumber"
          autoComplete="off"
          type="number"
          value={values.mobileNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.mobileNumber && touched.mobileNumber ? (
          <Text color="red" fontSize="sm">
            {errors.mobileNumber}
          </Text>
        ) : null}
        <Button
          type="submit"
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
        >
          Link
        </Button>
      </Flex>
    </form>
  );
};

export default Paytm;
