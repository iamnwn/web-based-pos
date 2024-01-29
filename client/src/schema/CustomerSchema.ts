import * as Yup from "yup";

const CreateSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  contact: Yup.number()
    .typeError("Contact must be a number")
    .required("Contact is required"),
  email: Yup.string().email("Invalid email"),
  city: Yup.string().required("City name is required"),
});

export { CreateSchema };
