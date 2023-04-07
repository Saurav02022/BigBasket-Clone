import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

import React, { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "../components/CartItem";
import { Address } from "../redux/CartPage/action";
import useShowToast from "../CustomHooks/useShowToast";
import backgroundColor from "../components/backgroundColor";
import { AddressReducer, initialState } from "./Reducer/AddAddress";

const Cart = () => {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast] = useShowToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, dispatch] = useReducer(AddressReducer, initialState);

  const { data, totalCartPrice } = useSelector((store) => store.CartReducer);

  const AddAddress = () => {
    if (!state.name) {
      showToast("Please Enter a name", "warning");
      return;
    }
    if (!state.email) {
      showToast("Please Enter a email address", "warning");
      return;
    }
    if (!state.email.includes("@")) {
      showToast("invalid email address", "warning");
      return;
    }
    if (!state.number) {
      showToast("Please Enter a phone number", "warning");
      return;
    }
    if (state.number.length !== 10) {
      showToast("invalid phone Number", "warning");
      return;
    }
    if (!state.address) {
      showToast("Please Enter Your Delivery Address", "warning");
      return;
    }
    if (!state.pincode) {
      showToast("Please Enter Your pincode", "warning");
      return;
    }
    if (state.pincode.length !== 6) {
      showToast("invalid pincode", "warning");
      return;
    }
    Dispatch(Address(state));
    showToast("Address added successfully", "success");
    navigate("/user/payment");
  };

  return (
    <Box flexDirection="column">
      <Box
        display="grid"
        width="90%"
        margin="auto"
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
          xl: `repeat(4,1fr)`,
        }}
        gap="20px"
        marginTop="50px"
        marginBottom="50px"
      >
        {data.length > 0 &&
          data.map((item, index) => <CartItem {...item} key={index} />)}
      </Box>
      {data.length === 0 && (
        <Box
          border="1px solid #ccc"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="20px"
          padding="25px"
          width="90%"
          margin="auto"
        >
          <Heading as="h1" fontSize="xx-large" fontFamily="sans-serif">
            Your shopping cart is Empty
          </Heading>
          <Link to="/product">
            <Button bgColor={backgroundColor} color="white">
              Start shopping
            </Button>
          </Link>
        </Box>
      )}
      <Divider orientation="horizontal" color="#ccc" />
      <Box
        border="1px solid #ccc"
        justifyContent="center"
        width="90%"
        margin="auto"
        padding="30px"
        marginTop="2rem"
        marginBottom="2rem"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Heading
            as="h2"
            fontSize="xx-large"
            fontFamily="sans-serif"
            fontWeight="500"
          >
            Total
          </Heading>
          <Text fontSize="large">₹ {totalCartPrice.toFixed(2)}</Text>
        </Flex>
        <Text>*Food Coupons are not accepted for this order</Text>
        <Divider color="black" marginTop="30px" />
        <Flex justifyContent="flex-end">
          <Button
            marginTop="20px"
            bgColor={backgroundColor}
            color="white"
            onClick={onOpen}
            isDisabled={totalCartPrice > 0 ? false : true}
          >
            Checkout
          </Button>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Delivery Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" gap="10px">
              <Input
                type="text"
                placeholder="Please Enter Name"
                onChange={(e) =>
                  dispatch({ type: "name", payload: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="Please Enter Email"
                onChange={(e) =>
                  dispatch({ type: "email", payload: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Please Enter Number"
                onChange={(e) =>
                  dispatch({ type: "number", payload: e.target.value })
                }
              />
              <Textarea
                placeholder="Please Enter Your Address"
                onChange={(e) =>
                  dispatch({ type: "address", payload: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Please Enter Your Pincode"
                onChange={(e) =>
                  dispatch({ type: "pincode", payload: e.target.value })
                }
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              bgColor={backgroundColor}
              color="white"
              onClick={AddAddress}
            >
              Add Delivery Address
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Cart;
