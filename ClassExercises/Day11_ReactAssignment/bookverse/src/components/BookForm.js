import React from "react";
import { useFormik } from "formik";
import { bookSchema } from "../schemas/bookSchema";

const BookForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      price: "",
    },

    validationSchema: bookSchema,

    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Book Title</label>

        <input
          className="form-control"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />

        {formik.errors.title && (
          <small className="text-danger">{formik.errors.title}</small>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Author</label>

        <input
          className="form-control"
          name="author"
          onChange={formik.handleChange}
          value={formik.values.author}
        />

        {formik.errors.author && (
          <small className="text-danger">{formik.errors.author}</small>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Price</label>

        <input
          className="form-control"
          name="price"
          onChange={formik.handleChange}
          value={formik.values.price}
        />

        {formik.errors.price && (
          <small className="text-danger">{formik.errors.price}</small>
        )}
      </div>

      <button className="btn btn-primary w-100">
        <i className="bi bi-check-circle me-2"></i>
        Add Book
      </button>
    </form>
  );
};

export default BookForm;
