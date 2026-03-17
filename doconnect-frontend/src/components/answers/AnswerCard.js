import React, { useEffect, useState } from 'react';
import { Card, Button, Badge, Spinner } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import answerService from '../../services/answerService';
import CommentSection from './CommentSection';

const AnswerCard = ({ answer, onDeleted }) => {
  const { user } = useAuth();
  const [likeCount, setLikeCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchLikeCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer._id,]);

  const fetchLikeCount = async () => {
    try {
      const data = await answerService.getLikeCount(answer._id);
      setLikeCount(data.count);
    } catch (err) {
      // silently fail
    }
  };

  const handleLike = async () => {
    if (!user) return;
    setLikeLoading(true);
    try {
      await answerService.likeAnswer(answer._id);
      setLikeCount((prev) => prev + 1);
    } catch (err) {
      try {
        await answerService.unlikeAnswer(answer._id);
        setLikeCount((prev) => Math.max(prev - 1, 0));
      } catch {
        // silently fail
      }
    } finally {
      setLikeLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this answer?')) return;
    setDeleteLoading(true);
    try {
      await answerService.deleteAnswer(answer._id);
      if (onDeleted) onDeleted(answer._id);
    } catch (err) {
      // silently fail
    } finally {
      setDeleteLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  return (
    <Card className="answer-card mb-3 p-3">
      <Card.Body className="p-0">
        <p className="mb-3" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
          {answer.content}
        </p>

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
          <div style={{ fontSize: '0.82rem', color: '#6c757d' }}>
            <span>
              Answered by{' '}
              <strong style={{ color: '#0d6efd' }}>
                {answer.answeredBy?.username || 'Unknown'}
              </strong>
            </span>
            <span className="ms-3"> {formatDate(answer.createdAt)}</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleLike}
              disabled={likeLoading || !user}
              title={!user ? 'Login to like' : 'Like this answer'}
            >
              {likeLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <>&#128077; {likeCount}</>
              )}
            </Button>

            {/* Admin delete */}
            {user && user.roleId === 2 && (
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  '🗑️ Delete'
                )}
              </Button>
            )}
          </div>
        </div>

        {answer.status === 2 && (
          <Badge bg="warning" text="dark" className="mb-2">
            Pending Approval
          </Badge>
        )}

        <CommentSection answerId={answer._id} />
      </Card.Body>
    </Card>
  );
};

export default AnswerCard;