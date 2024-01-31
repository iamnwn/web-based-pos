import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    console.log(response);

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.data.accessToken);
      return {
        ...prev,
        userRole: response.data.data.userRole,
        userName: response.data.data.userName,
        storeId: response.data.data.storeId,
        accessToken: response.data.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
