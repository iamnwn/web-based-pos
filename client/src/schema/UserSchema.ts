import * as Yup from "yup";

const CreateSchema = Yup.object().shape({
  nic: Yup.string().required("NIC is required"),
  emergencyContact: Yup.number()
    .typeError("Contact must be a number")
    .required("Emergency contact is required"),
  state: Yup.string().required("State is required"),
  district: Yup.string().required("District is required"),
  postalCode: Yup.string().required("Postal code is required"),
  userRole: Yup.string()
    .oneOf(["admin", "manager", "salesmen"])
    .default("salesmen"),
  userName: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  isActive: Yup.string().required("isActive is required"),
  CustomerId: Yup.number().required("Customer is required"),
  StoreId: Yup.string().nullable(),
});

const UpdateSchema = Yup.object().shape({
  nic: Yup.string(),
  emergencyContact: Yup.number()
    .typeError("Contact must be a number")
    .required("Emergency contact is required"),
  state: Yup.string().required("State is required"),
  district: Yup.string().required("District is required"),
  postalCode: Yup.string().required("Postal code is required"),
  userRole: Yup.string()
    .oneOf(["admin", "manager", "salesmen"])
    .default("salesmen"),
  userName: Yup.string().required("Username is required"),

  isActive: Yup.string().required("isActive is required"),
  StoreId: Yup.string().nullable(),
});

export { CreateSchema, UpdateSchema };
