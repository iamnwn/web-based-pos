// // import { axiosPrivate } from './../api/axios';
// import useAxiosPrivate from "@/hooks/useAxiosPrivate";

// interface Customer {
//   id: number;
//   firstName: string;
//   lastName: string;
//   contact: string;
//   email: string;
//   city: string;
// }
// const CUSTOMER_URL = "/api/customer";
// const axiosPrivate = useAxiosPrivate();

// const CustomerServices = () =>{

//   return{

//     getAllCustomers: async (): Promise<Customer[]> => {
//       try {
//       const response = await axiosPrivate.get(CUSTOMER_URL);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching customers:", error);
//       throw error;
//     }
//   },

//   getCustomerById: async (customerId: number): Promise<Customer | null> => {
//     const response = await axiosPrivate.get(`${CUSTOMER_URL}/${customerId}`);
//     //
//     return response.data;
//   }

//   getCustomersData: async (
//     pageIndex: number,
//     pageSize: number,
//     columnFilters: string
//   ) => {
//     const response = await axiosPrivate.get(
//       `${CUSTOMER_URL}/data?pageIndex=${pageIndex}&pageSize=${pageSize}&filter=${
//         !columnFilters ? "" : columnFilters
//       }`
//       );
//     return response.data;
//   },

//   createCustomer: async (newCustomer: Customer): Promise<Customer> => {
//     const response = await axiosPrivate.post(CUSTOMER_URL, newCustomer);
//     return response.data;
//   },

//   updateCustomer: async (
//     customerId: number,
//     updatedCustomer: Customer
//     ): Promise<Customer> => {
//     try {
//       const response = await axiosPrivate.put(
//         `${CUSTOMER_URL}/${customerId}`,
//         updatedCustomer
//       );
//       return response.data;
//     } catch (error) {
//       console.error(`Error updating customer with ID ${customerId}:`, error);
//       throw error;
//     }
//   }
//   }
// };

// export default CustomerServices;
