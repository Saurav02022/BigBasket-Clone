import { StarIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { decrease, increase, removeItem } from "../redux/CartPage/action";

function CartItem({
  img,
  title,
  price,
  rating,
  category,
  quantity,
  productQuantity,
}) {
  const [Quantity, setQuantity] = useState(productQuantity);
  const dispatch = useDispatch();

  const toast = useToast();

  const increaseQuantity = () => {
    setQuantity((pre) => pre + 1);
    dispatch(increase(price));
  };

  const decreaseQuantity = () => {
    if (Quantity === 1) {
      setQuantity(productQuantity);
      return;
    }
    setQuantity((pre) => pre - 1);
    dispatch(decrease(price));
  };

  const RemoveItem = () => {
    dispatch(removeItem(title));
    dispatch(decrease(price));
  };

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      justifyContent={"space-between"}
      gap="10px"
      bg={"white"}
      border="1px solid #ccc"
      boxShadow={"sm"}
      borderRadius="sm"
      paddingY="10px"
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
        textAlign="center"
        paddingBottom={"20px"}
      >
        <Heading
          as={"p"}
          fontSize="14px"
          fontWeight={500}
          letterSpacing="-0.1px"
          lineHeight={"20px"}
          fontFamily={"Inter,Roboto,Arial,sans-serif"}
          mt="1.5"
        >
          {title}
        </Heading>
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
        <Flex gap={"2"} justifyContent="center" alignItems="center">
          <Button onClick={decreaseQuantity}>-</Button>
          <Text>{Quantity}</Text>
          <Button onClick={increaseQuantity}>+</Button>
        </Flex>
        <Box justifyContent="center">
          <Button
            width="50%"
            backgroundColor="red"
            color="white"
            fontSize="md"
            onClick={RemoveItem}
          >
            Remove Item
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default CartItem;
