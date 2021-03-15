import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Box } from '@chakra-ui/react';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('@lean/users')!);
    const user = JSON.parse(localStorage.getItem('@lean/current')!);

    if (!users || !user) router.push('/login');

    if (users && user) router.push('/dashboard');
  }, []);

  return <Box></Box>;
};

export default Index;
