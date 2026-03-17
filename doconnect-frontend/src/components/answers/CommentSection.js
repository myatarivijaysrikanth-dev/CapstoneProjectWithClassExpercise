import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Spinner, Badge } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import answerService from "../../services/answerService";

const CommentSection = ({ answerId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchComments();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerId]);

  const fetchComments = async () => {
    try {
      const data = await answerService.getCommentsByAnswer(answerId);
      setComments(data);
    } catch (err) {
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    setError("");
    if (!commentText.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      await answerService.addComment(answerId, commentText);
      setCommentText("");
      setShowForm(false);
      fetchComments();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add comment.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await answerService.deleteComment(commentId);
      fetchComments();
    } catch (err) {
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="mt-3 pt-3" style={{ borderTop: "2px dashed #dee2e6" }}>
      {comments.length > 0 && (
        <div className="mb-2 d-flex align-items-center gap-2">
          <span
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#6c757d",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Comments
          </span>
          <Badge bg="secondary" style={{ fontSize: "0.7rem" }}>
            {comments.length}
          </Badge>
        </div>
      )}

      {comments.map((comment) => (
        <div
          key={comment._id}
          className="d-flex justify-content-between align-items-start mb-2 p-2 rounded-2"
          style={{
            background: "#f8f9fa",
            border: "1px solid #e9ecef",
            fontSize: "0.85rem",
          }}
        >
          <div>
            <span className="fw-semibold me-2" style={{ color: "#0d6efd" }}>
              {comment.userId?.username}
            </span>
            <span className="text-muted me-2" style={{ fontSize: "0.75rem" }}>
              {formatDate(comment.createdAt)}
            </span>
            <span style={{ color: "#444" }}>{comment.commentText}</span>
          </div>

          {user && user._id === comment.userId?._id && (
            <Button
              variant="link"
              size="sm"
              className="text-danger p-0 ms-3 flex-shrink-0"
              style={{ fontSize: "0.75rem" }}
              onClick={() => handleDeleteComment(comment._id)}
            >
              Delete
            </Button>
          )}
        </div>
      ))}

  
      {user && !showForm && (
        <Button
          variant="outline-secondary"
          size="sm"
          className="mt-1"
          style={{
            fontSize: "0.8rem",
            borderRadius: "20px",
            padding: "3px 14px",
          }}
          onClick={() => setShowForm(true)}
        >
          Add a comment
        </Button>
      )}
      {user && showForm && (
        <Form onSubmit={handleAddComment} className="mt-2">
          {error && (
            <Alert
              variant="danger"
              className="py-1 px-2 mb-2"
              style={{ fontSize: "0.82rem" }}
            >
              {error}
            </Alert>
          )}
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              size="sm"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              maxLength={500}
              autoFocus
            />
            <Button
              variant="primary"
              size="sm"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Post"}
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              type="button"
              onClick={() => {
                setShowForm(false);
                setError("");
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default CommentSection;
