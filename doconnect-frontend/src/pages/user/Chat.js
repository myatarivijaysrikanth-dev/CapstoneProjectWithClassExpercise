import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Card, ListGroup, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import messageService from "../../services/messageService";
import ChatWindow from "../../components/chat/ChatWindow";
import Loader from "../../components/common/Loader";

const Chat = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      const data = await messageService.getAllUsers();
      const others = data.filter((u) => u._id !== user._id);
      setUsers(others);
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, [user._id]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <Container>
        <h4 className="fw-bold mb-1"> Chat</h4>
        <p className="text-muted mb-4">
          Chat directly with other DoConnect users.
        </p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Row>
          <Col md={4} lg={3} className="mb-4 mb-md-0">
            <Card style={{ borderRadius: "12px", border: "1px solid #e0e0e0" }}>
              <Card.Header
                className="fw-semibold"
                style={{ background: "#f8f9fa", borderRadius: "12px 12px 0 0" }}
              >
                Users ({users.length})
              </Card.Header>

              {users.length === 0 ? (
                <Card.Body className="text-muted text-center py-4">
                  <p style={{ fontSize: "0.875rem" }}>No other users found.</p>
                </Card.Body>
              ) : (
                <ListGroup variant="flush">
                  {users.map((u) => (
                    <ListGroup.Item
                      key={u._id}
                      action
                      active={selectedUser?._id === u._id}
                      onClick={() => setSelectedUser(u)}
                      style={{ cursor: "pointer" }}
                      className="d-flex align-items-center gap-3"
                    >
                     
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: "36px",
                          height: "36px",
                          background:
                            selectedUser?._id === u._id
                              ? "rgba(255,255,255,0.3)"
                              : "#e8f0fe",
                          color:
                            selectedUser?._id === u._id ? "#fff" : "#0d6efd",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}
                      >
                        {u.username.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div
                          className="fw-semibold"
                          style={{
                            fontSize: "0.875rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {u.username}
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            opacity: 0.7,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {u.email}
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card>
          </Col>
          <Col md={8} lg={9}>
            <Card style={{ borderRadius: "12px", border: "1px solid #e0e0e0" }}>
              <Card.Body className="p-3">
                <ChatWindow selectedUser={selectedUser} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Chat;
