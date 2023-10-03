/* eslint-disable no-useless-catch */
import axiosInstance from '../axios-instance/index';

export const rolesService = {
  async createRole(role: Role.IRoleModel): Promise<A> {
    try {
      const response = await axiosInstance.post('/role/create', role);
      return response.data;
    } catch (error) {
      console.error('An error occurred while create role:', error);
      throw error;
    }
  },
  async getRoles(param: Common.IDataGrid): Promise<A> {
    try {
      const response = await axiosInstance.post('/role/get', param);
      return response.data;
    } catch (error) {
      console.error('An error occurred while get role:', error);
      throw error;
    }
  }
};
