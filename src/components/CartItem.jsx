import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Flex, Heading, Image } from "@chakra-ui/react";

import { useDispatch } from "react-redux";

import { decrease, removeItem } from "../redux/CartPage/action";
import useShowToast from "../CustomHooks/useShowToast";

function CartItem({ index, img, title, price, rating, category, quantity }) {
  const [showToast] = useShowToast();
  const dispatch = useDispatch();

  const RemoveItem = () => {
    showToast("Remove item Successfully", "success");
    dispatch(removeItem(index));
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
