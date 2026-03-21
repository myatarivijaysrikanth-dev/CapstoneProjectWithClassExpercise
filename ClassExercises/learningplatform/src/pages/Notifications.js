import { useState } from "react";
import Modal from "../components/Modal";

const Notifications = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="container">
      <h2 className="section-title">Notifications</h2>

      <button className="btn btn-dark" onClick={() => setOpen(true)}>
        Show Notification
      </button>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h3>Notification</h3>
          <p>This modal uses React Portal</p>
        </Modal>
      )}
    </div>
  );
};

export default Notifications;
