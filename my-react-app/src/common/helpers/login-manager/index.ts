import { useLoading } from '../../context/useLoading';
import { cookie } from '../cookie/cookie';

export const useLoginManager = () => {
  const { closeLoading } = useLoading();

  const loginOut = async () => {
    const url = '/login';
    // const url = await logout();
    if (url) {
      cookie.clearCookie('userLogin');
      location.href = url;
    }
    closeLoading();
  };

  const loginIn = async (userLogin: Authen.IUserLoginModel) => {
    const serializedObject = JSON.stringify(userLogin);
    const url = '/';
    // const url = await logout();
    if (url) {
      if (userLogin.remember) {
        cookie.setCookie('userSave', serializedObject, 30);
      }
      cookie.setCookie('userLogin', serializedObject, 1);
      location.href = url;
    }
    closeLoading();
  };

  const getSaveUser = async () => {
    const user = cookie.getCookie('userSave');
    return JSON.parse(user as string);
  };

  return {
    loginOut,
    loginIn,
    getSaveUser
  };
};
