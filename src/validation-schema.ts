import * as yup from "yup";

export const formValidationSchema = yup.object().shape({
  title: yup.string().required("message title is required"),
  body: yup.string().required("message body is required"),
  subTitle: yup.string().required("subtitle is required"),
  badgeCount: yup.string().required("badge count is required"),
});
