import * as yup from "yup";

export const CreditCardSchema = yup.object({
  cardNumber: yup
    .string()
    .matches(/^\d{5}\d{5}\d{6}$/, "Credit Card number must be 16 digits")
    .required("Credit number is required"),
  expiry: yup
    .string()
    .required("Expiry date is required")
    .test(
      "valid-format",
      "Expiry date must be in the format MM/YY",
      function (value) {
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // matches "MM/YY" format
        return regex.test(value);
      }
    )
    .test("future-date", "Expiry date must be in the future", function (value) {
      if (!value) return true; // skip validation if value is not present
      const [month, year] = value.split("/");
      const expiryDate = new Date(
        parseInt("20" + year),
        parseInt(month) - 1,
        1
      );
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return expiryDate >= now;
    }),
  cvv: yup
    .string()
    .matches(/^\d{3}$/, "cvv must be 3 digits")
    .required("cvv is required"),
});
