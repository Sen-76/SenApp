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
  const loginIn = async (userLogin: Authen.IUserLoginModel) => {
    const serializedObject = JSON.stringify(userLogin);
    document.cookie = `myCookieName=${encodeURIComponent(
      serializedObject
    )}; expires=Thu, 21 Sep 2023 12:00:00 UTC; path=/`;
    const url = '/';
    // const url = await logout();
    // resetStorage();
    if (url) {
      location.href = url;
    }
    closeLoading();
  };
  return {
    loginOut,
    loginIn
  };
};
