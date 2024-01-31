// import axios from "../api/axios";

// interface User {
//   nic: number;
//   emergencyContact: string;
//   state: string;
//   district: string;
//   postalCode: string;
//   userRole: string;
//   userName: string;
//   password: string;
//   isActive: string;
//   CustomerId: number;
//   StoreId: number;
// }

// const USER_URL = "/api/user";

// const UserService = {
//   getAllUsers: async (): Promise<User[]> => {
//     const response = await axios.get(USER_URL);
//     return response.data;
//   },

//   getUserById: async (userId: number): Promise<User | null> => {
//     const response = await axios.get(`${USER_URL}/${userId}`);
//     return response.data;
//   },
//   getUsersData: async (
//     pageIndex: number,
//     pageSize: number,
//     columnFilters: string
//   ) => {
//     const response = await axios.get(
//       `${USER_URL}/data?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${
//         !columnFilters ? "" : columnFilters
//       }`
//     );
//     return response.data;
//   },
//   createUser: async (newUser: User): Promise<User> => {
//     const response = await axios.post(USER_URL, newUser);
//     return response.data;
//   },

//   updateUser: async (userId: number, updatedUser: User): Promise<User> => {
//     const response = await axios.put(`${USER_URL}/${userId}`, updatedUser);
//     return response.data;
//   },
// };

// export default UserService;
