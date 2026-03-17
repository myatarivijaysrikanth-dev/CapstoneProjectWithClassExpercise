import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Card, Badge, Button, Alert,
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import questionService from '../../services/questionService';
import answerService from '../../services/answerService';
import AnswerCard from '../../components/answers/AnswerCard';
import AnswerForm from '../../components/answers/AnswerForm';
import Loader from '../../components/common/Loader';

const QuestionDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [question, setQuestion]   = useState(null);
  const [answers, setAnswers]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, ]);

  const fetchQuestion = async () => {
    try {
      const data = await questionService.getQuestionById(id);
      setQuestion(data);
    } catch (err) {
      setError('Question not found.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnswers = async () => {
    try {
      const data = await answerService.getAnswersByQuestion(id);
      setAnswers(data);
    } catch (err) {
    }
  };

  const handleAnswerPosted = () => {
    fetchAnswers();
  };

  const handleAnswerDeleted = (answerId) => {
    setAnswers((prev) => prev.filter((a) => a._id !== answerId));
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  if (loading) return <Loader />;
  if (error)   return (
    <div className="page-wrapper">
      <Container>
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Container>
    </div>
  );

  return (
    <div className="page-wrapper">
      <Container>
        <Row>
          <Col lg={8}>
            <Card
              className="mb-4"
              style={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}
            >
              <Card.Body className="p-4">
                <div className="d-flex gap-2 mb-3 flex-wrap">
                  {question.topic && (
                    <Badge bg="info" text="dark">
                      {question.topic}
                    </Badge>
                  )}
                  {!question.isOpen && (
                    <Badge bg="success">Resolved</Badge>
                  )}
                </div>
                <h4 className="fw-bold mb-3">{question.title}</h4>
                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: '1.7',
                    color: '#444',
                  }}
                >
                  {question.description}
                </p>
                <div
                  className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3 pt-3"
                  style={{ borderTop: '1px solid #f0f0f0', fontSize: '0.85rem', color: '#6c757d' }}
                >
                  <span>
                    Asked by{' '}
                    <strong style={{ color: '#0d6efd' }}>
                      {question.askedBy?.username || 'Unknown'}
                    </strong>
                  </span>
                  <span> {formatDate(question.createdAt)}</span>
                </div>
              </Card.Body>
            </Card>
            <div className="mb-3">
              <h5 className="fw-bold">
                {answers.length} Answer{answers.length !== 1 ? 's' : ''}
              </h5>
            </div>

            {answers.length === 0 ? (
              <div
                className="text-center text-muted py-4 mb-4 rounded-3"
                style={{ background: '#f8f9fa', border: '1px solid #e0e0e0' }}
              >
                <p className="mb-0">No answers yet. Be the first to answer!</p>
              </div>
            ) : (
              answers.map((answer) => (
                <AnswerCard
                  key={answer._id}
                  answer={answer}
                  onDeleted={handleAnswerDeleted}
                />
              ))
            )}

            {user && question.isOpen && (
              <AnswerForm
                questionId={id}
                onAnswerPosted={handleAnswerPosted}
              />
            )}

            {!question.isOpen && (
              <Alert variant="secondary">
                 This discussion thread has been closed by the admin.
              </Alert>
            )}

            {!user && (
              <Alert variant="info">
                Please{' '}
                <Alert.Link onClick={() => navigate('/login')}>
                  login
                </Alert.Link>{' '}
                to post an answer.
              </Alert>
            )}
          </Col>
          <Col lg={4}>
            <Card
              style={{ borderRadius: '12px', border: '1px solid #e0e0e0' }}
            >
              <Card.Body>
                <h6 className="fw-bold mb-3">📋 Question Info</h6>
                <div style={{ fontSize: '0.875rem', color: '#555' }}>
                  <div className="mb-2">
                    <strong>Status: </strong>
                    {question.isOpen ? (
                      <Badge bg="primary">Open</Badge>
                    ) : (
                      <Badge bg="success">Resolved</Badge>
                    )}
                  </div>
                  <div className="mb-2">
                    <strong>Topic: </strong>
                    {question.topic || 'General'}
                  </div>
                  <div className="mb-2">
                    <strong>Asked by: </strong>
                    {question.askedBy?.username}
                  </div>
                  <div className="mb-2">
                    <strong>Date: </strong>
                    {formatDate(question.createdAt)}
                  </div>
                  <div>
                    <strong>Answers: </strong>
                    {answers.length}
                  </div>
                </div>

                <hr />
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="w-100"
                  onClick={() => navigate('/')}
                >
                   Back to Questions
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default QuestionDetail;