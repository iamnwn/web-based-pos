// import axios from "../api/axios";
import useAuth from "./useAuth";
import AuthService from "@/services/AuthService";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    await AuthService.Logout()
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };

  return logout;
};

export default useLogout;
