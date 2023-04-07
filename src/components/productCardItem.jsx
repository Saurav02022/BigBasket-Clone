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
      showToast("Please login", "info");
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
    };
    const existPayload = data.filter((item) => {
      return item.index === index;
    });
    if (existPayload.length > 0) {
      setVisible(true);
      showToast("Please Visit again to buy more", "info");
      return;
    }
    showToast("Product added successfully", "success");
    setVisible(true);
    dispatch(addToCart(payload));
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
        <Button
          margin="auto"
          marginTop="10px"
          width="50%"
          color={"white"}
          backgroundColor={backgroundColor}
          onClick={HandleAddtoBag}
          isDisabled={visible}
        >
          Add to bag
        </Button>
        {visible && <Text color="red">You can buy only One at a time.</Text>}
      </Flex>
    </Box>
  );
}

export default ProductCardItem;
