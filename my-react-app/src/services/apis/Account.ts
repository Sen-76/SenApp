/* eslint-disable no-useless-catch */
import axiosInstance from '../axios-instance/index';

export const accountService = {
  async addAccount(userData: Account.IAccountCreateModel): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post('/users/create', userData);
      return response.data;
    } catch (error) {
      console.error('An error occurred while adding the account:', error);
      throw error;
    }
  },
  async getAccount(userData: Common.IDataGrid): Promise<A> {
    try {
      const response = await axiosInstance.post('/users/get', userData);
      return response.data;
    } catch (error) {
      console.error('An error occurred while get accounts:', error);
      throw error;
    }
  }
};
