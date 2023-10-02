import { service } from '@/services/apis';
import { cookie } from '../cookie/cookie';

export const useLoginManager = () => {
  const loginOut = async () => {
    const url = '/login';
    if (url) {
      cookie.clearCookie('userLogin');
      location.href = url;
    }
  };

  const loginIn = async (userLogin: Authen.IUserLoginModel) => {
    try {
      const serializedObject = JSON.stringify(userLogin);
      const result = await service.authsService.login(userLogin);
      if (userLogin.remember) {
        cookie.setCookie('userSave', serializedObject, 30);
      }
      cookie.setCookie('userLogin', JSON.stringify(result), 1);
      location.href = '/';
    } catch (e: A) {
      console.log(e);
      if (e.response?.data.status === 422) {
        return e.response.data.errors;
      }
    }
  };

  const getSaveUser = () => {
    const user = cookie.getCookie('userSave');
    return JSON.parse(user as string);
  };

  const getLoginUser = () => {
    const user = cookie.getCookie('userLogin');
    return JSON.parse(user as string);
  };

  return {
    loginOut,
    loginIn,
    getSaveUser,
    getLoginUser
  };
};
