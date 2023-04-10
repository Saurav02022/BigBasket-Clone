import * as yup from "yup";

export const PaytmSchema = yup.object({
  mobileNumber: yup
    .string()
    .matches(/^\d{10}$/, "mobileNumber must be 10 digits")
    .required("mobileNumber is required"),
});
