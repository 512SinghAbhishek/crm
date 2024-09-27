import axiosInstance from "../../utils/axiosInstance";


class AuthService {
  static async login(username, password) {
    try {
      const response = await axiosInstance.post('/login', { username, password });
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem('token');
  }

  static async getCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
}

export default AuthService;
