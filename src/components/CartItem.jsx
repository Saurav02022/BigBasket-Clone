import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { useDispatch } from "react-redux";
import HandleLoading from "./HandleLoading";
import useShowToast from "../CustomHooks/useShowToast";
import { manageQuantityOfData, removeItem } from "../redux/CartPage/action";

function CartItem({
  index,
  img,
  title,
  price,
  rating,
  category,
  quantity,
  productQuantity,
}) {
  const [showToast] = useShowToast();
  const dispatch = useDispatch();
  const [Quantity, setQuantity] = useState(productQuantity);
  const [deleteItemLoading, setDeleteItemLoading] = useState(false);

  const incrementQuantity = () => {
    setQuantity((pre) => pre + 1);
    dispatch(manageQuantityOfData(index, Quantity + 1));
  };

  const decrementQuantity = () => {
    if (Quantity > 2) {
      setQuantity((pre) => pre - 1);
      dispatch(manageQuantityOfData(index, Quantity - 1));
    } else {
      setQuantity(1);
      dispatch(manageQuantityOfData(index, 1));
    }
  };

  const RemoveItem = () => {
    setDeleteItemLoading(true);
    window.localStorage.setItem("deleteItemLoading", true);
    setTimeout(() => {
      showToast("Remove item Successfully", "success");
      dispatch(removeItem(index));
      setDeleteItemLoading(false);
    }, 500);
  };

  if (deleteItemLoading) {
    return <HandleLoading />;
  }

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
          <Button onClick={decrementQuantity}>-</Button>
          <Text>{productQuantity}</Text>
          <Button onClick={incrementQuantity}>+</Button>
        </Flex>
        <Flex flexDirection="column" alignItems="center" gap="2" marginTop="2">
          <Button
            width="50%"
            backgroundColor="red"
            color="white"
            fontSize="md"
            onClick={RemoveItem}
          >
            Remove Item
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CartItem;
