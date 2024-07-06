import React, { useEffect, useRef, useState } from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/auth/action";
import Loader from "../components/Loader";
import Toaster from "../components/Toaster";
export default function Login() {
  const ref = useRef(null);

  //const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthLoading, AuthMessage, userData } = useSelector(
    (store) => store.auth
  );
  const [myLoader, setMyloader] = useState(isAuthLoading);
  const toast = useToast();
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const payload = {
      email: ref.current[0].value,
      password: ref.current[1].value,
    };
    dispatch(userLogin(payload));
  };
  useEffect(() => {
    if (AuthMessage === "Invalid Email or Password") {
      toast(Toaster("error", "Invalid Email or Password"));
    }
    if (userData) {
      toast(Toaster("info", `Welcome Back ${userData.name}`));
    }
  }, [AuthMessage, userData]);

  return (
    <>
      {myLoader ? (
        <Loader />
      ) : (
        <Box>
          <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
          >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                <Flex gap={"5px"}>
                  <Text fontSize={"lg"} color={"gray.600"}>
                    New user singup
                  </Text>
                  <Link to="/signup">
                    <Text color={"blue.400"}> here ✌️</Text>
                  </Link>
                </Flex>
              </Stack>

              <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={8}
              >
                <form action="" ref={ref}>
                  <Stack spacing={4}>
                    <FormControl id="email">
                      <FormLabel>Email address</FormLabel>
                      <Input type="email" />
                    </FormControl>
                    <FormControl id="password">
                      <FormLabel>Password</FormLabel>
                      <Input type="password" />
                    </FormControl>
                    <Stack spacing={10}>
                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                      >
                        <Checkbox>Remember me</Checkbox>
                        <Link color={"blue.400"}>Forgot password?</Link>
                      </Stack>
                      <Button
                        type="submit"
                        onClick={handleLogin}
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                      >
                        Sign in
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </Box>
            </Stack>
          </Flex>
        </Box>
      )}
    </>
  );
}
