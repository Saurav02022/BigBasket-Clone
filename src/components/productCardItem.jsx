import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  useBreakpointValue,
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
  const textSize = useBreakpointValue({
    base: "lg",
    md: "md",
  });

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
        "2xl": "500px",
      }}
      display={"flex"}
      flexDirection="column"
      justifyContent={"center"}
      gap="10px"
      bg={"white"}
      border="1px solid #ccc"
      boxShadow={"sm"}
      borderRadius="sm"
      py="10px"
    >
      <Center
        _hover={{
          cursor: "pointer",
        }}
      >
        <Image src={img} width="50%" alt={category} />
      </Center>
      <Flex
        direction={"column"}
        gap="2"
        justifyContent="center"
        textAlign="center"
        paddingBottom={"20px"}
        border="0px solid red"
      >
        <Center>
          <Text fontSize={textSize} noOfLines={1}>
            {title}
          </Text>
        </Center>
        <Flex gap={"2"} justifyContent="center">
          <Heading
            as={"p"}
            fontSize={textSize}
            lineHeight={"20px"}
            fontWeight="normal"
          >
            Category :{" "}
          </Heading>
          <Heading
            as={"p"}
            fontSize={textSize}
            lineHeight={"20px"}
            fontWeight="normal"
          >
            {category}
          </Heading>
        </Flex>
        <Center>
          <Heading
            as={"p"}
            fontSize={textSize}
            lineHeight={"20px"}
            fontWeight="normal"
          >
            Quantity :{" "}
          </Heading>
          <Heading
            as={"p"}
            fontSize={textSize}
            lineHeight={"20px"}
            fontWeight="normal"
          >
            {quantity}
          </Heading>
        </Center>
        <Flex gap={"2"} justifyContent="center">
          <Heading
            as={"p"}
            fontSize={textSize}
            lineHeight={"20px"}
            fontWeight="normal"
          >
            Price :{" "}
          </Heading>
          <Heading
            as={"p"}
            fontSize={textSize}
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
            fontSize={textSize}
            lineHeight={"20px"}
            fontWeight="normal"
          >
            {rating.count} Ratings
          </Heading>
        </Flex>
        <center>
          <Button
            display={!visible ? "block" : "none"}
            marginTop="10px"
            color={"white"}
            colorScheme="green"
            backgroundColor={backgroundColor}
            onClick={HandleAddtoBag}
            fontSize={textSize}
          >
            Add to bag
          </Button>
        </center>
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
