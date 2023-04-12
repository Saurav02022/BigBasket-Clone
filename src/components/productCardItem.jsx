import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

import { useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";

import backgroundColor from "./backgroundColor";
import { addToCart } from "../redux/CartPage/action";
import useShowToast from "../CustomHooks/useShowToast";

function ProductCardItem({
  index,
  img,
  title,
  price,
  rating,
  category,
  quantity,
}) {
  const dispatch = useDispatch();
  const [showToast] = useShowToast();
  const { isAuthenticated } = useAuth0();
  const [visible, setVisible] = useState(false);

  const { data } = useSelector((store) => store.CartReducer);

  const HandleAddtoBag = () => {
    if (!isAuthenticated) {
      showToast("Please login to use add to bag", "info");
      return;
    }
    const payload = {
      index,
      img,
      title,
      price,
      rating,
      category,
      quantity,
      productQuantity: 1,
    };
    const existPayload = data.filter((item) => {
      return item.index === index;
    });
    if (existPayload.length > 0) {
      setVisible(true);
      showToast("Product Item is already in cart", "info");
      return;
    }
    showToast("Product added successfully", "success");
    setVisible(true);
    dispatch(addToCart(payload));
  };

  return (
    <Box
      height={{
        base: "450px",
        "2xl": "600px",
      }}
      display={"flex"}
      flexDirection="column"
      justifyContent={"center"}
      gap="10px"
      bg={"white"}
      border="1px solid #ccc"
      boxShadow={"sm"}
      borderRadius="sm"
    >
      <Box
        _hover={{
          cursor: "pointer",
        }}
        border={"0px solid red"}
        justifyContent="center"
        alignItems={"center"}
      >
        <Image src={img} margin="auto" width="50%" />
      </Box>
      <Flex
        direction={"column"}
        gap="2"
        justifyContent="center"
        textAlign="center"
        paddingBottom={"20px"}
        border="0px solid red"
      >
        <Text fontSize="xs">{title}</Text>
        <Flex gap={"2"} justifyContent="center">
          <Heading
            as={"p"}
            fontSize="14px"
            lineHeight={"20px"}
            fontWeight="normal"
          >
            Category :{" "}
          </Heading>
          <Heading
            as={"p"}
            fontSize="14px"
            lineHeight={"20px"}
            fontWeight="normal"
          >
            {category}
          </Heading>
        </Flex>
        <Flex gap={"2"} justifyContent="center">
          <Heading
            as={"p"}
            fontSize="14px"
            lineHeight={"20px"}
            fontWeight="normal"
          >
            Quantity :{" "}
          </Heading>
          <Heading
            as={"p"}
            fontSize="14px"
            lineHeight={"20px"}
            fontWeight="normal"
          >
            {quantity}
          </Heading>
        </Flex>
        <Flex gap={"2"} justifyContent="center">
          <Heading
            as={"p"}
            fontSize="14px"
            lineHeight={"20px"}
            fontWeight="normal"
          >
            Price :{" "}
          </Heading>
          <Heading
            as={"p"}
            fontSize="14px"
            lineHeight={"20px"}
            fontWeight="normal"
          >
            {price}
          </Heading>
        </Flex>
        <Flex gap={"2"} justifyContent="center">
          <Badge>
            {rating.rate} <StarIcon />
          </Badge>
          <Heading
            as={"p"}
            fontSize="14px"
            lineHeight={"20px"}
            fontWeight="normal"
          >
            {rating.count} Ratings
          </Heading>
        </Flex>
        <Button
          display={!visible ? "block" : "none"}
          margin="auto"
          marginTop="10px"
          width="50%"
          color={"white"}
          backgroundColor={backgroundColor}
          onClick={HandleAddtoBag}
        >
          Add to bag
        </Button>
        {visible && (
          <Text color="red">
            Please Visit Cart to increase/decrease quantity of the product.
          </Text>
        )}
      </Flex>
    </Box>
  );
}

export default ProductCardItem;
