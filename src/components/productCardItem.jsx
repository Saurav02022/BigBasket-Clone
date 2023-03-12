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
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/CartPage/action";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function ProductCardItem({
  img,
  title,
  price,
  rating,
  category,
  quantity,
  productQuantity,
}) {
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.CartReducer);
  const [visible, setVisible] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const HandleAddtoBag = () => {
    if (!isAuthenticated) {
      toast({
        description: "Please login to use this.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/");
      return;
    }
    const payload = {
      img,
      title,
      price,
      rating,
      category,
      quantity,
      productQuantity,
    };
    const existPayload = data.filter((item) => {
      return item.title === title;
    });
    if (existPayload.length > 0) {
      setVisible(true);
      toast({
        description: "Product already exists in the cart",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    toast({
      description: "Product added successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
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
          backgroundColor="#689f38"
          onClick={HandleAddtoBag}
          isDisabled={visible}
        >
          Add to bag
        </Button>
        {visible && (
          <Text color="red">You can increase quantity at cart Page</Text>
        )}
      </Flex>
    </Box>
  );
}

export default ProductCardItem;
