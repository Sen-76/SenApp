import { useLoading } from '../../common/context/useLoading';

export const useLoginManager = () => {
  const { closeLoading } = useLoading();
  const loginOut = async () => {
    const url = '/login';
    // const url = await logout();
    // resetStorage();
    if (url) {
      location.href = url;
    }
    closeLoading();
  };
  return {
    loginOut
  };
};
