/*eslint-disable*/
import { object, string, number, date, InferType } from "yup";

const validationSchema = object({
  title: string().required("title zorunlu bir alandır."),
  price: number()
    .required("price zorunlu alandır.")
    .positive("Pozitif sayı olmalıdır")
    .integer("Tam sayı olmalıdır"),
  publisher: string().required()  
});

export default validationSchema;