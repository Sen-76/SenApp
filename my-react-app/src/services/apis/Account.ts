/* eslint-disable no-useless-catch */
import axiosInstance from '../axios-instance/index';

export const accountService = {
  async addAccount(userData: Account.IAccountCreateModel): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post('/users/create', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
