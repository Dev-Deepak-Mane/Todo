import { EditIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
export function UserProfileEdit() {
  const { isAuth, userData } = useSelector((store) => store.auth);
  return (
    <Stack p="10px" spacing={4} w={"full"} maxW={"md"} rounded={"xl"}>
      <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
        User Profile Edit
      </Heading>
      <FormControl id="userName">
        <FormLabel>User Icon</FormLabel>
        <Stack direction={["column", "row"]} spacing={6}>
          <Center>
            <Avatar size="xl" src="https://bit.ly/sage-adebayo"></Avatar>
          </Center>
          <Center w="full">
            <Button w="full">Change Icon</Button>
          </Center>
        </Stack>
      </FormControl>
      <FormControl id="userName" isRequired>
        <FormLabel>User name</FormLabel>
        <Input
          defaultValue={userData?.name}
          _placeholder={{ color: "gray.500" }}
          type="text"
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          defaultValue={userData?.email}
          _placeholder={{ color: "gray.500" }}
          type="email"
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="password"
          _placeholder={{ color: "gray.500" }}
          type="password"
        />
      </FormControl>
    </Stack>
  );
}

export function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        rightIcon={<EditIcon />}
        colorScheme="blue"
        variant="outline"
        onClick={onOpen}
      >
        Edit Profile
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserProfileEdit />
          </ModalBody>

          <ModalFooter gap={"30px"}>
            <Button
              bg={"red.400"}
              color={"white"}
              onClick={onClose}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
