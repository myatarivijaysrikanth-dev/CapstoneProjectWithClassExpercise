import * as Yup from "yup";

export const bookSchema = Yup.object({

  title: Yup.string()
    .required("Title is required"),

  author: Yup.string()
    .required("Author is required"),

  price: Yup.number()
    .required("Price is required")

});