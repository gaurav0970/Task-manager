import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

const taskService = {
  getAllTasks: async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  getTaskById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  updateTask: async (id, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};

export default taskService;