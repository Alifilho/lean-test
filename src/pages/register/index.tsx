import { FC, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import {
  Flex,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Heading,
  Link,
} from '@chakra-ui/react';

import { useRouter } from 'next/router';

import Icon from '@/components/elements/Icon';

import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';

const Register: FC = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const handleRegister = (dataForm: any) => {
    let users = JSON.parse(localStorage.getItem('@lean/users')!);

    if (!users.find((user: any) => user.email === dataForm.email)) {
      users.push(dataForm);
      localStorage.setItem('@lean/users', JSON.stringify(users));
      localStorage.setItem('@lean/current', JSON.stringify(dataForm));
      router.push('/dashboard');
    } else alert('User already exists');
  };

  useEffect(() => {
    let users = JSON.parse(localStorage.getItem('@lean/users')!);

    if (!users) localStorage.setItem('@lean/users', JSON.stringify([]));
  }, []);

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex direction="column" w="25vw" h="25vh">
        <Heading colorScheme="#001D00">Register</Heading>
        <form onSubmit={handleSubmit(handleRegister)}>
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
          <Flex justify="space-between">
            <Button mt="1vh" type="submit">
              Send
            </Button>
            <Link href="/login">Login</Link>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default Register;
