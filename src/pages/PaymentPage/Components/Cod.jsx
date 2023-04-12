import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Heading, Button } from "@chakra-ui/react";

import useShowToast from "../../../CustomHooks/useShowToast";
import HandleLoading from "../../../components/HandleLoading";
import { successPayment } from "../../../redux/CartPage/action";
import backgroundColor from "../../../components/backgroundColor";

const Cod = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast] = useShowToast();
  const [loading, setLoading] = useState(false);

  const { totalCartPrice } = useSelector((state) => state.CartReducer);

  const HandleClick = () => {
    const flag = confirm("Are you sure you want to payment ?");
    if (totalCartPrice > 0 && flag === true) {
      setLoading(true);
      setTimeout(() => {
        showToast("Payment Successfully", "success", 4000);
        dispatch(successPayment());
        navigate("/user/payment/confirm");
        setLoading(false);
      }, 2100);
    }
  };

  if (loading) {
    return <HandleLoading />;
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
        backgroundColor={backgroundColor}
        _hover={{
          color: "white",
          backgroundColor: { backgroundColor },
        }}
        onClick={HandleClick}
      >
        Place order
      </Button>
    </Flex>
  );
};

export default Cod;
