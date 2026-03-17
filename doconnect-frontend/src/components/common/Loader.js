import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => (
  <div className="text-center my-5">
    <Spinner animation="border" variant="primary" />
    <p className="mt-2 text-muted">Loading...</p>
  </div>
);

export default Loader;
