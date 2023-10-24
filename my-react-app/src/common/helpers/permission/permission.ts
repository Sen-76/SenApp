import { service } from '@/services/apis';

export const permissionManager = () => {
  const getAllPermission = async () => {
    try {
      const result = await service.permissionService.get();
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const getAllPermissionTest = async () => {
    const url = 'https://api.example.com/data';
    const authToken = 'your_auth_token_here';

    const headers = new Headers({
      Authorization: `Bearer ${authToken}`
    });

    const requestOptions = {
      method: 'GET',
      headers: headers
    };
    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.text(); 
        } else {
          throw new Error(`Request failed with status: ${response.status}`);
        }
      })
      .then((data) => {
        return(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return {
    getAllPermission
  };
};
