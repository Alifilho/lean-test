import User from '@/interfaces/models/User';

export const getUsers = () => JSON.parse(localStorage.getItem('@lean/users')!);

export const setUsers = (users: User[]) =>
  localStorage.setItem('@lean/users', JSON.stringify(users));
