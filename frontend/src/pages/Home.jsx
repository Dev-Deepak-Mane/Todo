import axios from "axios";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { getTasks } from "../redux/task/action";
import Loader from "../components/Loader";
import { DeleteIcon } from "@chakra-ui/icons";
import Toaster from "../components/Toaster";
const Home = () => {
  const ref = useRef(null);
  const { tasks, isTaskLoading } = useSelector((store) => store.task);
  const { isAuth, isAuthLoading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const handleEditTask = (id) => {
    console.log(id);
    axios
      .patch(
        `https://todo-backend-gold-one.vercel.app/api/v1/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((r) => {
        console.log(r);
        toast({
          title: `${r?.data?.message}`,
          status: "info",
          isClosable: true,
          position: "top",
          duration: 1000,
        });
        dispatch(getTasks());
      })
      .catch((error) => {
        toast({
          title: `${error?.data?.message || "error while updating"}`,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 1000,
        });
        console.log(error, "error");
      });
  };

  const handleDeleteTask = (id) => {
    try {
      axios
        .delete(`https://todo-backend-gold-one.vercel.app/api/v1/task/${id}`, {
          withCredentials: true,
        })
        .then((r) => {
          toast({
            title: `${r.data.message}`,
            status: "error",
            isClosable: true,
            position: "top",
            duration: 1000,
          });
          dispatch(getTasks());
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewTask = (e) => {
    e.preventDefault();
    const payload = {
      title: ref.current[0].value,
      description: ref.current[1].value,
    };

    try {
      axios
        .post(
          "https://todo-backend-gold-one.vercel.app/api/v1/task/new",
          payload,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);

          toast({
            title: `${res.data.message}`,
            status: "info",
            isClosable: true,
            position: "top",
            duration: 1000,
          });
          dispatch(getTasks());
          ref.current[0].value = "";
          ref.current[1].value = "";
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box paddingTop="15px">
        <Flex
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}> Add New Task</Heading>
            </Stack>

            <Box
              rounded={"lg"}
              minW={["300px", "400px"]}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <form action="" ref={ref}>
                <Stack spacing={4}>
                  <FormControl id="title">
                    <FormLabel>Title of task</FormLabel>
                    <Input type="text" />
                  </FormControl>
                  <FormControl id="description">
                    <FormLabel>Description of task</FormLabel>
                    <Input type="text" />
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    ></Stack>
                    <Button
                      type="submit"
                      onClick={handleNewTask}
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Add
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      </Box>

      {/* table task is here */}

      {isTaskLoading ? (
        <Loader />
      ) : (
        <Box>
          {tasks?.length ? (
            <TableContainer>
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>Task</Th>
                    <Th>Description</Th>
                    <Th>Completed</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {tasks &&
                    tasks?.map((t) => (
                      <Tr key={t._id}>
                        <Td>{t.title}</Td>
                        <Td>{t.description}</Td>
                        <Td>
                          <Checkbox
                            borderColor={"#4299e1"}
                            colorScheme={"blue"}
                            defaultChecked={t.isCompleted}
                            onChange={() => handleEditTask(t._id)}
                          >
                            {t.isCompleted ? "Completed" : "Pending..."}
                          </Checkbox>
                        </Td>
                        <Td
                          _hover={{
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeleteTask(t._id)}
                        >
                          <DeleteIcon />
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Heading fontSize={"xl"}> Empty here...!</Heading>
          )}
        </Box>
      )}
    </>
  );
};

export default Home;
