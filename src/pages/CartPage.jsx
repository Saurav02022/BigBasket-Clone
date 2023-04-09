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
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "../components/CartItem";
import { Address } from "../redux/CartPage/action";
import useShowToast from "../CustomHooks/useShowToast";
import backgroundColor from "../components/backgroundColor";

import { AddressSchema } from "../Schema";

const initialValue = {
  name: "",
  email: "",
  number: "",
  address: "",
  pincode: "",
};

const Cart = () => {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast] = useShowToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, totalCartPrice } = useSelector((store) => store.CartReducer);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValue,
      validationSchema: AddressSchema,
      onSubmit: (value, action) => {
        Dispatch(Address(value));
        showToast("Address added successfully", "success");
        navigate("/user/payment");
        action.resetForm();
      },
    });

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
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  name="name"
                  autoComplete="off"
                  id="name"
                  type="text"
                  placeholder="Please Enter your Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <Text color="red" fontSize="sm">
                    {errors.name}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  name="email"
                  autoComplete="off"
                  id="email"
                  type="email"
                  placeholder="Please Enter Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <Text color="red" fontSize="sm">
                    {errors.email}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="number">Number</FormLabel>
                <Input
                  name="number"
                  autoComplete="off"
                  id="number"
                  type="text"
                  placeholder="Please Enter your Number"
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.number && touched.number ? (
                  <Text color="red" fontSize="sm">
                    {errors.number}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="address">Address</FormLabel>
                <Textarea
                  name="address"
                  autoComplete="off"
                  id="address"
                  placeholder="Please Enter Your Address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address ? (
                  <Text color="red" fontSize="sm">
                    {errors.address}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="pincode">Pincode</FormLabel>
                <Input
                  name="pincode"
                  autoComplete="off"
                  id="pincode"
                  type="text"
                  placeholder="Please Enter Your Pincode"
                  value={values.pincode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.pincode && touched.pincode ? (
                  <Text color="red" fontSize="sm">
                    {errors.pincode}
                  </Text>
                ) : null}
              </FormControl>
              <Button
                bgColor={backgroundColor}
                color="white"
                type="submit"
                marginTop="2.5"
              >
                Add Delivery Address
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Cart;
