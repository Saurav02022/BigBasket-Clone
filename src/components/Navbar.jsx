import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Image,
  Button,
  Badge,
  Text,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { HiShoppingCart } from "react-icons/hi";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useMemo,useEffect } from "react";

const Links = ["Home", "Products"];

const backgroundColor = "#689f38";
const NavLink = ({ children }) => (
  <Link
    to={children === Links[0] ? "/" : children === Links[1] ? "/product" : null}
  >
    <Box
      color="white"
      cursor="pointer"
      fontSize="large"
      _hover={{
        textDecoration: "underline",
        color: "black",
      }}
    >
      {children}
    </Box>
  </Link>
);

function Navbar() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ItemCount } = useSelector((store) => store.CartReducer);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const showToast = (description, status) => {
    toast({
      description: description,
      status: status,
      duration: 4000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  // useMemo(() => {
  //   if (isAuthenticated) {
  //     showToast("Login Successfully", "success");
  //   }
  // }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      showToast("Login Successfully", "success");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Box backgroundColor={backgroundColor} p={4}>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          _hover={{
            cursor: "pointer",
          }}
        >
          <IconButton
            backgroundColor={backgroundColor}
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Flex alignItems={"center"} justifyContent={"space-evenly"}>
            <Box
              display="flex"
              alignItems={"center"}
              gap="10"
              justifyContent={{
                base: "center",
                md: "normal",
              }}
            >
              <Image
                src="https://image3.mouthshut.com/images/imagesp/925660627s.png"
                alt="company-logo"
                width={{
                  base: "80%",
                  sm: "30%",
                  md: "15%",
                }}
              />
              <Box display={{ base: "none", md: "flex" }} gap="10">
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </Box>
            </Box>
          </Flex>

          <Flex alignItems={"center"} gap="30px">
            {isAuthenticated ? (
              <Flex flexDirection="column" gap="10px">
                <Text fontSize="sm">Welcome {user.name}</Text>

                <Button
                  backgroundColor={backgroundColor}
                  color="white"
                  border="1px solid #ccc"
                  _hover={{
                    color: "black",
                  }}
                  onClick={() => {
                    showToast("Logout Successfully", "success");
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    });
                  }}
                >
                  Logout
                </Button>
              </Flex>
            ) : (
              <Button
                backgroundColor={backgroundColor}
                color="white"
                border="1px solid #ccc"
                _hover={{
                  color: "black",
                }}
                onClick={() => loginWithRedirect()}
              >
                Login
              </Button>
            )}

            <Link to="/cart">
              <Badge>{ItemCount}</Badge>
              <HiShoppingCart size={40} />
            </Link>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Box>
        ) : null}
      </Box>
    </>
  );
}
export default Navbar;
