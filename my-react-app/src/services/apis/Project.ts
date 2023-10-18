import axiosInstance from '../axios-instance/index';

export const projectService = {
  async create(role: Department.IDepartmentCreateModel): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post('/department/create', role);
      return response.data;
    } catch (error) {
      console.error('An error occurred while create:', error);
      throw error;
    }
  },
  async update(role: Department.IDepartmentUpdateModel): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post('/department/updateDepartment', role);
      return response.data;
    } catch (error) {
      console.error('An error occurred while update:', error);
      throw error;
    }
  },
  async delete(role: Department.IDepartmentDeleteModel): Promise<Response.IDefaultResponse> {
    try {
      const response = await axiosInstance.post('/department/delete', role);
      return response.data;
    } catch (error) {
      console.error('An error occurred while delete:', error);
      throw error;
    }
  }
};
