import * as yup from "yup";

export const GiftCardSchema = yup.object({
  cardNumber: yup
    .string()
    .matches(/^\d{5}\d{5}\d{1}$/, "Gift Card number must be 11 digits")
    .required("Gift number is required"),
  pin: yup
    .string()
    .matches(/^\d{4}$/, "pin must be 4 digits")
    .required("pin is required"),
});
