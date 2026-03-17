import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import adminService from "../../services/adminService";
import Loader from "../../components/common/Loader";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [u, q, a] = await Promise.all([
        adminService.getAllUsers(),
        adminService.getAllQuestionsAdmin(),
        adminService.getAllAnswersAdmin(),
      ]);
      setUsers(u);
      setQuestions(q);
      setAnswers(a);
    } catch (err) {
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const pendingQuestions = questions.filter((q) => q.status === 2).length;
  const pendingAnswers = answers.filter((a) => a.status === 2).length;
  const activeUsers = users.filter((u) => u.isActive).length;
  const inactiveUsers = users.filter((u) => !u.isActive).length;

  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <Container>
        <div className="mb-4">
          <h4 className="fw-bold mb-1">
            &#128075; Welcome, {user?.username || "Admin"}
          </h4>
          <p className="text-muted">
            Here's an overview of DoConnect activity.
          </p>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="mb-4 g-3">
          <Col sm={6} lg={4}>
            <Card
              className="text-center h-100 dashboard-card"
              style={{ borderRadius: "12px", borderLeft: "4px solid #0d6efd" }}
            >
              <Card.Body>
                <h2 className="fw-bold" style={{ color: "#0d6efd" }}>
                  {users.length}
                </h2>
                <p className="text-muted mb-0">Total Users</p>
                <small className="text-success">{activeUsers} active</small>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={6} lg={4}>
            <Card
              className="text-center h-100 dashboard-card"
              style={{ borderRadius: "12px", borderLeft: "4px solid #198754" }}
            >
              <Card.Body>
                <h2 className="fw-bold" style={{ color: "#198754" }}>
                  {questions.length}
                </h2>
                <p className="text-muted mb-0">Total Questions</p>
                <small className="text-warning fw-semibold">
                  {pendingQuestions} pending
                </small>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={6} lg={4}>
            <Card
              className="text-center h-100 dashboard-card"
              style={{ borderRadius: "12px", borderLeft: "4px solid #ffc107" }}
            >
              <Card.Body>
                <h2 className="fw-bold" style={{ color: "#ffc107" }}>
                  {answers.length}
                </h2>
                <p className="text-muted mb-0">Total Answers</p>
                <small className="text-warning fw-semibold">
                  {pendingAnswers} pending
                </small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-3">
          <Col md={4}>
            <Card
              className="h-100 dashboard-card"
              style={{ borderRadius: "12px", border: "1px solid #e0e0e0" }}
            >
              <Card.Body className="d-flex flex-column dashboard-card">
                <h6 className="fw-bold mb-3">Manage Users</h6>
                <p className="text-muted mb-3" style={{ fontSize: "0.875rem" }}>
                  View all users, activate or deactivate accounts.
                </p>
                {inactiveUsers > 0 && (
                  <Badge bg="danger" className="mb-3">
                    {inactiveUsers} deactivated account
                  </Badge>
                )}
                <Button
                  as={Link}
                  to="/admin/users"
                  variant="primary"
                  size="sm"
                  className="w-100 mt-auto"
                >
                  Go to Users
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              className="h-100 dashboard-card"
              style={{ borderRadius: "12px", border: "1px solid #e0e0e0" }}
            >
              <Card.Body>
                <h6 className="fw-bold mb-3"> Manage Questions</h6>
                <p className="text-muted mb-3" style={{ fontSize: "0.875rem" }}>
                  Approve, reject, close or delete questions.
                </p>
                {pendingQuestions > 0 && (
                  <div className="mb-3">
                    <Badge bg="warning" text="dark">
                      {pendingQuestions} pending approval
                    </Badge>
                  </div>
                )}
                <Button
                  as={Link}
                  to="/admin/questions"
                  variant="success"
                  size="sm"
                  className="w-100 mt-auto"
                >
                  Go to Questions
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              className="h-100 dashboard-card"
              style={{ borderRadius: "12px", border: "1px solid #e0e0e0" }}
            >
              <Card.Body className="d-flex flex-column">
                <h6 className="fw-bold mb-3"> Manage Answers</h6>
                <p className="text-muted mb-3" style={{ fontSize: "0.875rem" }}>
                  Approve, reject or delete answers.
                </p>
                {pendingAnswers > 0 && (
                  <div className="mb-3">
                    <Badge bg="warning" text="dark">
                      {pendingAnswers} pending approval
                    </Badge>
                  </div>
                )}
                <Button
                  as={Link}
                  to="/admin/answers"
                  variant="warning"
                  size="sm"
                  className="w-100 mt-auto"
                >
                  Go to Answers
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
