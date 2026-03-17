import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Badge,
  Button,
  Alert,
  Spinner,
  Modal,
} from "react-bootstrap";
import adminService from "../../services/adminService";
import Loader from "../../components/common/Loader";

const statusLabel = (status) => {
  if (status === 1) return <Badge bg="success">Approved</Badge>;
  if (status === 2)
    return (
      <Badge bg="warning" text="dark">
        Pending
      </Badge>
    );
  if (status === 3) return <Badge bg="danger">Rejected</Badge>;
  return null;
};

const ManageAnswers = () => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const openAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowModal(true);
  };
  const openQuestion = (question) => {
    setSelectedQuestion(question);
    setShowQuestionModal(true);
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  const fetchAnswers = async () => {
    try {
      const data = await adminService.getAllAnswersAdmin();
      setAnswers(data);
    } catch (err) {
      setError("Failed to load answers.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setActionId(id);
    try {
      await adminService.approveAnswer(id);
      setAnswers((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: 1 } : a)),
      );
    } catch (err) {
      setError("Failed to approve answer.");
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (id) => {
    setActionId(id);
    try {
      await adminService.rejectAnswer(id);
      setAnswers((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: 3 } : a)),
      );
    } catch (err) {
      setError("Failed to reject answer.");
    } finally {
      setActionId(null);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <Container>
        <h4 className="fw-bold mb-1">Manage Answers</h4>
        <p className="text-muted mb-4">Approve, reject or delete answers.</p>

        {error && (
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        )}

        <div
          className="rounded-3 p-3"
          style={{ background: "#fff", border: "1px solid #e0e0e0" }}
        >
          <div className="mb-3" style={{ fontSize: "0.875rem", color: "#666" }}>
            Total: <strong>{answers.length}</strong> &nbsp;|&nbsp; Pending:{" "}
            <strong className="text-warning">
              {answers.filter((a) => a.status === 2).length}
            </strong>{" "}
            &nbsp;|&nbsp; Approved:{" "}
            <strong className="text-success">
              {answers.filter((a) => a.status === 1).length}
            </strong>{" "}
            &nbsp;|&nbsp; Rejected:{" "}
            <strong className="text-danger">
              {answers.filter((a) => a.status === 3).length}
            </strong>
          </div>

          <Table responsive hover>
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Answer</th>
                <th>Question</th>
                <th>Answered By</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((a, index) => (
                <tr key={a._id}>
                  <td>{index + 1}</td>
                  <td style={{ fontSize: "0.875rem", maxWidth: "300px" }}>
                    {a.content.length > 60
                      ? `${a.content.slice(0, 60)}...`
                      : a.content}
                    {a.content.length > 60 && (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => openAnswer(a)}
                        style={{ paddingLeft: 6 }}
                      >
                        View
                      </Button>
                    )}
                  </td>
                  <td style={{ fontSize: "0.875rem", maxWidth: "300px" }}>
                    {a.questionId?.title?.length > 60
                      ? `${a.questionId.title.slice(0, 60)}...`
                      : a.questionId?.title || "—"}

                    {a.questionId?.title?.length > 60 && (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => openQuestion(a.questionId)}
                        style={{ paddingLeft: 6 }}
                      >
                        View
                      </Button>
                    )}
                  </td>
                  <td style={{ fontSize: "0.875rem" }}>
                    {a.answeredBy?.username || "—"}
                  </td>
                  <td>{statusLabel(a.status)}</td>
                  <td style={{ fontSize: "0.8rem" }}>
                    {formatDate(a.createdAt)}
                  </td>
                  <td>
                    <div className="d-flex gap-1 flex-wrap">
                      {a.status === 2 && (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleApprove(a._id)}
                            disabled={actionId === a._id}
                          >
                            {actionId === a._id ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              "Approve"
                            )}
                          </Button>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleReject(a._id)}
                            disabled={actionId === a._id}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Full Answer</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ whiteSpace: "pre-line" }}>
            {selectedAnswer?.content}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showQuestionModal} onHide={() => setShowQuestionModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Full Question</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ whiteSpace: "pre-line" }}>
            {selectedQuestion?.title}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowQuestionModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ManageAnswers;
