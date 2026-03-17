import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const QuestionCard = ({ question }) => {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <Card
      className="question-card mb-3"
      onClick={() => navigate(`/questions/${question._id}`)}
      style={{ cursor: 'pointer' }}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
          <h5 className="mb-1 fw-semibold" style={{ color: '#0d6efd' }}>
            {question.title}
          </h5>

          {question.topic && (
            <Badge bg="info" className="badge-topic text-dark">
              {question.topic}
            </Badge>
          )}
        </div>

        <p className="text-muted mt-2 mb-3" style={{ fontSize: '0.9rem' }}>
          {question.description.length > 150
            ? question.description.substring(0, 150) + '...'
            : question.description}
        </p>

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div style={{ fontSize: '0.82rem', color: '#6c757d' }}>
            <span>
              Asked by{' '}
              <strong>{question.askedBy?.username || 'Unknown'}</strong>
            </span>
            <span className="ms-3"> {formatDate(question.createdAt)}</span>
          </div>

          <div className="d-flex gap-2">
            {!question.isOpen && (
              <Badge bg="secondary">Resolved</Badge>
            )}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/questions/${question._id}`);
              }}
            >
              View Answers
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default QuestionCard;