import axios from "../api/axios";

const LOGIN_URL = "/api/auth";

const AuthService = {
  Login: async (data) => {
    return await axios.post(LOGIN_URL, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  },
  Logout: async () => {
    return await axios.get(`${LOGIN_URL}/logout`, {
      withCredentials: true,
    });
  },
};

export default AuthService;
