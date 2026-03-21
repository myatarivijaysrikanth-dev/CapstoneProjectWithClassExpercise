import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ children, onClose }) => {

  return ReactDOM.createPortal(

    <div className="modal-overlay">

      <div className="modal-container">

        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        {children}

      </div>

    </div>,

    modalRoot
  );
};

export default Modal;