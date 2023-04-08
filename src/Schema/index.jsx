import * as yup from "yup";

export const AddressSchema = yup.object({
  name: yup.string().min(3).max(30).required("Please enter your name"),
  email: yup.string().email().required("Please enter your email"),
  number: yup
    .string()
    .matches(/^\d{3}\d{3}\d{4}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  address: yup.string().min(5).required("Please enter your address"),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, "pincode must be 6 digits")
    .required("pincode is required"),
});
