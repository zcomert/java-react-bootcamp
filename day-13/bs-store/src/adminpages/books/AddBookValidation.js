/*eslint-disable*/
import { object, string, number, date, InferType } from "yup";

const validationSchema = object({
  title: string().required("title is required."),
  price: number()
    .required("price is required.")
    .positive("price must be positive.")
    .integer("price must be integer."),
  publisher: string().required(),
});

export default validationSchema;
