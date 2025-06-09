import { useSession } from 'next-auth/react';

export const useAccessToken = () => {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;
  const isAuthenticated = status === 'authenticated';

  return { accessToken, isAuthenticated, status };
};
