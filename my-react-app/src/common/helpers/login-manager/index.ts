import { service } from '@/services/apis';
import { cookie } from '../cookie/cookie';
import { permissionManager } from '../permission/permission';

export const useLoginManager = () => {
  const { getAllPermission } = permissionManager();
  const loginOut = async () => {
    const url = '/login';
    if (url) {
      cookie.clearCookie('userLogin');
      localStorage.removeItem('avatar');
      sessionStorage.removeItem('permissions');
      sessionStorage.removeItem('allPermissions');
      location.href = url;
    }
  };

  const loginIn = async (userLogin: Authen.IUserLoginModel) => {
    try {
      const serializedObject = JSON.stringify(userLogin);
      const result = await service.authsService.login(userLogin);
      const data = {
        refreshToken: result.refreshToken,
        token: result.token,
        user: {
          id: result.user.id,
          fullName: result.user.fullName,
          userRole: result.user.userRole2.title
        }
      };
      if (userLogin.remember) {
        cookie.setCookie('userSave', serializedObject, 30);
      }
      cookie.setCookie('userLogin', JSON.stringify(data), 1);
      localStorage.setItem('avatar', result.user.photoUrl);
      sessionStorage.setItem('permissions', JSON.stringify(result.user.userRole2.permissions));
      const permissons = await getAllPermission();
      sessionStorage.setItem('allPermissions', JSON.stringify(permissons));
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
