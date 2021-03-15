import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from '@chakra-ui/react';

import Icon from '@/components/elements/Icon';
import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';

const Dashboard: FC = () => {
  const { register, handleSubmit } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<any>({});
  const [usersList, setUsersList] = useState<any>([]);

  const logoff = () => {
    localStorage.removeItem('@lean/current');
    router.push('/login');
  };

  const removeUser = (index: number) => {
    const newUsers = usersList;
    const user = newUsers[index];

    newUsers.splice(index, 1);

    setUsersList([...newUsers]);
    localStorage.setItem('@lean/users', JSON.stringify(newUsers));

    if (user.email === currentUser.email) return logoff();
  };

  const addUser = (dataForm: any) => {
    const newUsers = [...usersList];

    if (newUsers.find((user: any) => user.email === dataForm.email))
      return alert('User already register');

    newUsers.push(dataForm);

    alert('User registered successfully');
    setUsersList([...newUsers]);
    localStorage.setItem('@lean/users', JSON.stringify(newUsers));
    onClose();
  };

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem('@lean/current')!);
    const users = JSON.parse(localStorage.getItem('@lean/users')!);

    if (!current || !users) router.push('/login');

    setCurrentUser(current);
    setUsersList(users);
  }, []);

  return (
    currentUser &&
    usersList && (
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex w="70vw" h="70vh" align="center" direction="column">
          <Flex w="100%" alignItems="center" justifyContent="space-between">
            <Heading>Hello {currentUser.name}</Heading>
            <Button onClick={onOpen}>Add new</Button>
            <Button onClick={logoff} colorScheme="gray">
              Logout
            </Button>
          </Flex>

          <Table mt="5vh">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>&nbsp;</Th>
              </Tr>
            </Thead>

            <Tbody>
              {usersList.map((user: any, index: number) => (
                <Tr key={`${user.name}-${index}`}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Button onClick={() => removeUser(index)}>X</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add new user</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit(addUser)}>
              <ModalBody>
                <Stack spacing={4} mt="1vh">
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon icon={AiOutlineUser} />}
                    />
                    <Input
                      name="name"
                      type="text"
                      ref={register}
                      placeholder="John doe"
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon icon={AiOutlineMail} />}
                    />
                    <Input
                      name="email"
                      type="email"
                      ref={register}
                      placeholder="johndoe@exameple.com"
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon icon={AiOutlineMail} />}
                    />
                    <Input
                      name="password"
                      type="password"
                      ref={register}
                      placeholder="**********"
                    />
                  </InputGroup>
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost" mx={3} type="submit">
                  Add
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Flex>
    )
  );
};

export default Dashboard;
