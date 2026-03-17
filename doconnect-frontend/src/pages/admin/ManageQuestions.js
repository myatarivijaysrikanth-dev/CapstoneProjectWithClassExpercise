import React, { useEffect, useState } from 'react';
import {
  Container, Table, Badge, Button, Alert, Spinner, Modal,
} from 'react-bootstrap';
import adminService from '../../services/adminService';
import Loader from '../../components/common/Loader';

const statusLabel = (status) => {
  if (status === 1) return <Badge bg="success">Approved</Badge>;
  if (status === 2) return <Badge bg="warning" text="dark">Pending</Badge>;
  if (status === 3) return <Badge bg="danger">Rejected</Badge>;
  return null;
};

const ManageQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [actionId, setActionId]   = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const openQuestion = (question) => {
    setSelectedQuestion(question);
    setShowModal(true);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await adminService.getAllQuestionsAdmin();
      setQuestions(data);
    } catch (err) {
      setError('Failed to load questions.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setActionId(id);
    try {
      await adminService.approveQuestion(id);
      setQuestions((prev) =>
        prev.map((q) => (q._id === id ? { ...q, status: 1 } : q))
      );
    } catch (err) {
      setError('Failed to approve question.');
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (id) => {
    setActionId(id);
    try {
      await adminService.rejectQuestion(id);
      setQuestions((prev) =>
        prev.map((q) => (q._id === id ? { ...q, status: 3 } : q))
      );
    } catch (err) {
      setError('Failed to reject question.');
    } finally {
      setActionId(null);
    }
  };

  const handleClose = async (id) => {
    if (!window.confirm('Close this discussion thread?')) return;
    setActionId(id);
    try {
      await adminService.closeQuestion(id);
      setQuestions((prev) =>
        prev.map((q) => (q._id === id ? { ...q, isOpen: false } : q))
      );
    } catch (err) {
      setError('Failed to close question.');
    } finally {
      setActionId(null);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
    });

  if (loading) return <Loader />;

  return (
    <div className="page-wrapper">
      <Container>
        <h4 className="fw-bold mb-1"> Manage Questions</h4>
        <p className="text-muted mb-4">
          Approve and reject questions, close  discussion threads.
        </p>

        {error && (
          <Alert variant="danger" onClose={() => setError('')} dismissible>
            {error}
          </Alert>
        )}

        <div
          className="rounded-3 p-3"
          style={{ background: '#fff', border: '1px solid #e0e0e0' }}
        >
          <div className="mb-3" style={{ fontSize: '0.875rem', color: '#666' }}>
            Total: <strong>{questions.length}</strong> &nbsp;|&nbsp;
            Pending: <strong className="text-warning">
              {questions.filter((q) => q.status === 2).length}
            </strong> &nbsp;|&nbsp;
            Approved: <strong className="text-success">
              {questions.filter((q) => q.status === 1).length}
            </strong> &nbsp;|&nbsp;
            Rejected: <strong className="text-danger">
              {questions.filter((q) => q.status === 3).length}
            </strong>
          </div>

          <Table responsive hover>
            <thead  className="table-light">
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Topic</th>
                <th>Asked By</th>
                <th>Status</th>
                <th>Thread</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, index) => (
                <tr key={q._id}>
                  <td>{index + 1}</td>
                  <td style={{ fontSize: '0.875rem', maxWidth: '300px' }}>
                    {q.title.length > 60 ? `${q.title.slice(0, 60)}...` : q.title}
                    {q.title.length > 60 && (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => openQuestion(q)}
                        style={{ paddingLeft: 6 }}
                      >
                        View
                      </Button>
                    )}
                  </td>
                  <td>
                    {q.topic ? (
                      <Badge bg="info" text="dark">{q.topic}</Badge>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td style={{ fontSize: '0.875rem' }}>
                    {q.askedBy?.username || '—'}
                  </td>
                  <td>{statusLabel(q.status)}</td>
                  <td>
                    <Badge bg={q.isOpen ? 'primary' : 'secondary'}>
                      {q.isOpen ? 'Open' : 'Closed'}
                    </Badge>
                  </td>
                  <td style={{ fontSize: '0.8rem' }}>{formatDate(q.createdAt)}</td>
                  <td>
                    <div className="d-flex gap-1 flex-wrap">
                      {q.status === 2 && (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleApprove(q._id)}
                            disabled={actionId === q._id}
                          >
                            {actionId === q._id ? (
                              <Spinner animation="border" size="sm" />
                            ) : 'approve'}
                          </Button>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleReject(q._id)}
                            disabled={actionId === q._id}
                          >
                            reject
                          </Button>
                        </>
                      )}
                      {q.isOpen && q.status === 1 && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleClose(q._id)}
                          disabled={actionId === q._id}
                        >
                          Close Thread
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      {/* Modal for full question title */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Full Question</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ whiteSpace: 'pre-line' }}>
          {selectedQuestion?.title}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    </div>
  );
};

export default ManageQuestions;