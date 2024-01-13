const yup = require("yup");

const customerSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  contact: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email address"),
  city: yup.string().required("City name is required"),
});
const updateSchema = yup.object().shape({
  first_name: yup.string(),
  last_name: yup.string(),
  contact: yup.string(),
  email: yup.string(),
  city: yup.string(),
});

module.exports = { customerSchema, updateSchema };
