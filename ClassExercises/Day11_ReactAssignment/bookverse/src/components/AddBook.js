import React from "react";
import { useNavigate } from "react-router-dom";
import BookActions from "../flux/actions/BookActions";
import BookForm from "./BookForm";

const AddBook = () => {
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    BookActions.addBook(values);

    resetForm();

    navigate("/");
  };

  return (
    <div className=" d-flex justify-content-center align-items-center " style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg p-4 form-card rounded-4" style={{ width: "600px" }}>
        <h3 className="text-center mb-4">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Book
        </h3>

        <BookForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddBook;
