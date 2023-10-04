/* eslint-disable no-useless-catch */
import axiosInstance from '../axios-instance/index';

export const departmentService = {
  async create(role: Department.IDepartmentCreateModel): Promise<A> {
    try {
      const response = await axiosInstance.post('/department/create', role);
      return response.data;
    } catch (error) {
      console.error('An error occurred while create:', error);
      throw error;
    }
  },
  async get(param: Common.IDataGrid): Promise<A> {
    try {
      const response = await axiosInstance.post('/department/get', param);
      return response.data;
    } catch (error) {
      console.error('An error occurred while get:', error);
      throw error;
    }
  }
};
