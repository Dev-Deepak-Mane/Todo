import React, { useEffect, useRef } from "react";
import axios from "axios";
// const SignUp = () => {
//   return <div>SignUp</div>;
// };

// export default SignUp;
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/auth/action";

export default function SignUp() {
  const { isAuth, isAuthLoading, AuthMessage, userData } = useSelector(
    (store) => store.auth
  );
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef("");
  const { onOpen } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const handleSignup = (e) => {
    e.preventDefault();
    const payload = {
      name: ref.current[0].value,
      email: ref.current[1].value,
      password: ref.current[2].value,
    };
    dispatch(userRegister(payload)).then((r) => navigate("/"));
  };
  useEffect(() => {
    onOpen();

    if (AuthMessage === "User Already Exist") {
      toast({
        title: `${"User Already Exist"}`,
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 1000,
      });
    }
    if (userData) {
      toast({
        title: `Welcome Back ${userData.name}`,
        status: "info",
        isClosable: true,
        position: "top-right",
        duration: 1000,
      });
    }
  }, [userData, AuthMessage]);
  return (
    <Flex
      minH={"100vh"}
      paddingTop="70px"
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} minW={"35vw"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form action="" ref={ref}>
              <FormControl id="name" name="name" isRequired>
                <FormLabel>User Name</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="email" name="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" name="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  onClick={handleSignup}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <HStack pt={6} justifyContent={"center"}>
                <Text align={"center"}>Already a user?</Text>
                <Link to="/login">
                  <Text color={"blue.400"}>Login</Text>
                </Link>
              </HStack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
