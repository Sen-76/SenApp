/* eslint-disable no-useless-catch */
import axiosInstance from '../axios-instance/index';

export const rolesService = {
  async create(role: Role.IRoleCreateModel): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post('/role/create', role);
      return response.data;
    } catch (error) {
      console.error('An error occurred while create:', error);
      throw error;
    }
  },
  async get(param: Common.IDataGrid): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post('/role/get', param);
      return response.data;
    } catch (error) {
      console.error('An error occurred while get:', error);
      throw error;
    }
  }
};
