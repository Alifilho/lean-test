import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

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
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';

import Icon from '@/components/elements/Icon';

import { verifyPassword } from '@/utils/crypt';
import { getUsers } from '@/services/users';
import { setUser } from '@/services/auth';

import User from '@/interfaces/models/User';

const Login: FC = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const handleLogin = async (dataForm: User) => {
    let users = getUsers();

    if (!users) alert('User not found, please register');
    else {
      const user = users.find((user: User) => user.email === dataForm.email);

      if (user && (await verifyPassword(user.password, dataForm.password))) {
        setUser(user);

        router.push('/dashboard');
      } else alert('Invalid credentials');
    }
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex direction="column" w="25vw" h="25vh">
        <Heading colorScheme="#001D00">Login</Heading>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Stack spacing={4} mt="1vh">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon icon={AiOutlineMail} />}
              />
              <Input
                name="email"
                type="email"
                ref={register({ required: true })}
                placeholder="johndoe@exameple.com"
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon icon={RiLockPasswordFill} />}
              />
              <Input
                name="password"
                type="password"
                ref={register({ required: true })}
                placeholder="**********"
              />
            </InputGroup>
          </Stack>
          <Flex justify="space-between">
            <Button mt="1vh" type="submit">
              Send
            </Button>
            <Link href="/register">Don't have an account? Register</Link>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default Login;
