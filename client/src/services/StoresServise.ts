// import axios from "../api/axios";

// interface Store {
//   storeName: string;
//   storeLocation: string;
// }

// const STORES_URL = "/api/stores";

// const StoresService = {
//   getAllStores: async (): Promise<Store[]> => {
//     const response = await axios.get(STORES_URL);
//     return response.data;
//   },

//   getStoreById: async (storeId: number): Promise<Store | null> => {
//     const response = await axios.get(`${STORES_URL}/${storeId}`);
//     return response.data;
//   },
//   getStoresData: async (
//     pageIndex: number,
//     pageSize: number,
//     columnFilters: string
//   ) => {
//     const response = await axios.get(
//       `${STORES_URL}/data?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${
//         !columnFilters ? "" : columnFilters
//       }`
//     );
//     return response.data;
//   },
//   createStore: async (newStore: Store): Promise<Store> => {
//     const response = await axios.post(STORES_URL, newStore);
//     return response.data;
//   },

//   updateStore: async (storeId: number, updatedStore: Store): Promise<Store> => {
//     const response = await axios.put(`${STORES_URL}/${storeId}`, updatedStore);
//     return response.data;
//   },
// };

// export default StoresService;
