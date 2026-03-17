import React, { useEffect, useState } from "react";
import {
  Container, Table, Badge, Button, Alert, Spinner, Modal,
} from "react-bootstrap";
import adminService from "../../services/adminService";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../context/AuthContext";

const ManageUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [actionId, setActionId] = useState(null);
  const [showModal, setShowModal]     = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType]   = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await adminService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = (id) => {
    setSelectedUser(id);
    setActionType("deactivate");
    setShowModal(true);
  };

  const handleActivate = async (id) => {
    setActionId(id);
    try {
      await adminService.activateUser(id);
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isActive: true } : u))
      );
    } catch (err) {
      setError("Failed to activate user.");
    } finally {
      setActionId(null);
    }
  };

  const handlePromote = (id, username) => {
    setSelectedUser({ id, username });
    setActionType("promote");
    setShowModal(true);
  };

  const handleDemote = async (id, username) => {
    if (!window.confirm(`Remove admin rights from ${username}?`)) return;
    setActionId(id);
    try {
      await adminService.demoteUser(id);
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, roleId: 1 } : u))
      );
    } catch (err) {
      setError("Failed to demote user.");
    } finally {
      setActionId(null);
    }
  };

  const handleConfirmAction = async () => {
    setActionId(selectedUser?.id || selectedUser);
    try {
      if (actionType === "deactivate") {
        await adminService.deactivateUser(selectedUser);
        setUsers((prev) =>
          prev.map((u) =>
            u._id === selectedUser ? { ...u, isActive: false } : u
          )
        );
      }
      if (actionType === "promote") {
        await adminService.promoteUser(selectedUser.id);
        setUsers((prev) =>
          prev.map((u) =>
            u._id === selectedUser.id ? { ...u, roleId: 2 } : u
          )
        );
      }
    } catch (err) {
      setError("Action failed.");
    }
    setShowModal(false);
    setActionId(null);
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric", month: "short", day: "numeric",
    });

  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <Container>
        <h4 className="fw-bold mb-1">Manage Users</h4>
        <p className="text-muted mb-4">
          View all registered users. Deactivate, reactivate or promote accounts.
        </p>

        {error && (
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        )}

        <div
          className="rounded-3 p-3"
          style={{ background: "#fff", border: "1px solid #e0e0e0" }}
        >
          <div className="mb-3">
            <span className="text-muted" style={{ fontSize: "0.875rem" }}>
              Total: <strong>{users.length}</strong> users &nbsp;|&nbsp;
              Active: <strong className="text-success">
                {users.filter((u) => u.isActive).length}
              </strong> &nbsp;|&nbsp;
              Deactivated: <strong className="text-danger">
                {users.filter((u) => !u.isActive).length}
              </strong>
            </span>
          </div>

          <Table responsive hover>
            <thead style={{ background: "#f8f9fa" }}>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u._id}>
                  <td>{index + 1}</td>
                  <td className="fw-semibold">{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <Badge bg={u.roleId === 2 ? "danger" : "primary"}>
                      {u.roleId === 2 ? "Admin" : "User"}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={u.isActive ? "success" : "secondary"}>
                      {u.isActive ? "Active" : "Deactivated"}
                    </Badge>
                  </td>
                  <td>{formatDate(u.createdAt)}</td>
                  <td>
                    {u.roleId === 2 ? (
                      currentUser._id === u._id ? (
                        <span
                          className="text-muted"
                          style={{ fontSize: "0.8rem" }}
                        >
                          Admin
                        </span>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleDemote(u._id, u.username)}
                          disabled={actionId === u._id}
                        >
                          {actionId === u._id ? (
                            <Spinner animation="border" size="sm" />
                          ) : "Make User"}
                        </Button>
                      )
                    ) : (
                      <div className="d-flex gap-1 flex-wrap">
                        {u.isActive ? (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeactivate(u._id)}
                            disabled={actionId === u._id}
                          >
                            {actionId === u._id ? (
                              <Spinner animation="border" size="sm" />
                            ) : "Deactivate"}
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleActivate(u._id)}
                            disabled={actionId === u._id}
                          >
                            {actionId === u._id ? (
                              <Spinner animation="border" size="sm" />
                            ) : "Activate"}
                          </Button>
                        )}
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handlePromote(u._id, u.username)}
                          disabled={actionId === u._id}
                        >
                          {actionId === u._id ? (
                            <Spinner animation="border" size="sm" />
                          ) : "Make Admin"}
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {actionType === "deactivate" && (
            <p>Are you sure you want to deactivate this user?</p>
          )}
          {actionType === "promote" && (
            <p>
              Are you sure you want to promote{" "}
              <strong>{selectedUser?.username}</strong> to Admin?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmAction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageUsers;