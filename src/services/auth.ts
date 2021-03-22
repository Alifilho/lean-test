import User from '@/interfaces/models/User';

export const getUser = () => JSON.parse(localStorage.getItem('@lean/current')!);

export const setUser = (user: User) =>
  localStorage.setItem('@lean/current', JSON.stringify(user));

export const deleteUser = () => localStorage.removeItem('@lean/current');
