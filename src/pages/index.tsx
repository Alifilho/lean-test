import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Box } from '@chakra-ui/react';

import { getUsers } from '@/services/users';
import { getUser } from '@/services/auth';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const users = getUsers();
    const user = getUser();

    if (!users || !user) router.push('/login');

    if (users && user) router.push('/dashboard');
  }, []);

  return <Box></Box>;
};

export default Index;
