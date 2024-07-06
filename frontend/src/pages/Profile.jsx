import { Box, Spacer, VStack } from "@chakra-ui/react";
import React from "react";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { BasicUsage } from "../components/Modal";

const Profile = () => {
  const { isAuth, userData } = useSelector((store) => store.auth);
  // console.log(userData);
  return (
    <Box padding="70px">
      {/* <UserProfileEdit /> */}

      <Flex maxW={"100vw"} align={"center"} justify={"center"}>
        <VStack
          spacing={5}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
          textAlign="center"
          minW={["300px", "auto"]}
        >
          <Flex gap={"20px"}>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              User Profile
            </Heading>
            <Spacer />
            <BasicUsage />
          </Flex>
          <Avatar size="xl" src="https://bit.ly/sage-adebayo"></Avatar>
          <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
            {userData?.name}
          </Heading>
          <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
            {userData?.email}
          </Heading>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Profile;
