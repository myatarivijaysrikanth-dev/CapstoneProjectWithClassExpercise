import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";

const Home = () => {
  const store = useContext(StoreContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!store) return;

    const updateBooks = () => {
      setBooks([...store.getBooks()]);
    };
    updateBooks();
    store.on("change", updateBooks);

    return () => {
      store.removeListener("change", updateBooks);
    };
  }, [store]);

  return (
    <div className="container page-container mt-5">
      <h2 className="mb-4 text-center fw-bold ">
        <i className="bi bi-journal-bookmark me-2"></i>
        Book Collection
      </h2>

      {books.length === 0 ? (
        <div className="alert alert-info text-center">No Books Available</div>
      ) : (
        <div className="row">
          {books.map((book, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow book-card">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-book me-2"></i>
                    {book.title}
                  </h5>

                  <p className="text-muted">
                    <i className="bi bi-person me-2"></i>
                    {book.author}
                  </p>

                  <h6 className="text-success">
                    <i className="bi bi-currency-dollar me-2"></i>
                    {book.price}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
