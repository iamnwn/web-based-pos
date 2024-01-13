const yup = require("yup");

const userSchema = yup.object().shape({
  nic: yup.number().required("NIC is required"),
  postal_code: yup.string().required("Postal code is required"),
  emergency_contact: yup.string().required("Emergency contact is required"),
  state: yup.string().required("State is required"),
  district: yup.string().required("District is required"),
  user_role: yup
    .string()
    .oneOf(["admin", "manager", "salesmen"])
    .default("salesmen"),
  user_name: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  is_active: yup.boolean().required("isActive is required"),
  CustomerId: yup.number().required("Customer is required"),
});

const updateSchema = yup.object().shape({
  nic: yup.number(),
  postal_code: yup.string(),
  emergency_contact: yup.string(),
  state: yup.string(),
  district: yup.string(),
  user_role: yup.string().oneOf(["admin", "manager", "salesmen"]),
  user_name: yup.string(),
  is_active: yup.boolean(),
});

module.exports = { userSchema, updateSchema };
