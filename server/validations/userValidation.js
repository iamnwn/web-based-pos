const yup = require("yup");

const userSchema = yup.object().shape({
  nic: yup.number().required("NIC is required"),
  postalCode: yup.string().required("Postal code is required"),
  emergencyContact: yup.string().required("Emergency contact is required"),
  state: yup.string().required("State is required"),
  district: yup.string().required("District is required"),
  userRole: yup
    .string()
    .oneOf(["admin", "manager", "salesmen"])
    .default("salesmen"),
  userName: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  isActive: yup.boolean().required("isActive is required"),
  CustomerId: yup.number().required("Customer is required"),
});

const updateSchema = yup.object().shape({
  nic: yup.number(),
  postal_code: yup.string(),
  emergency_contact: yup.string(),
  state: yup.string(),
  district: yup.string(),
  userRole: yup.string().oneOf(["admin", "manager", "salesmen"]),
  userName: yup.string(),
  isActive: yup.boolean(),
});

module.exports = { userSchema, updateSchema };
