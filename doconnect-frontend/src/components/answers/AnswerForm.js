import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import answerService from "../../services/answerService";

const AnswerForm = ({ questionId, onAnswerPosted }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!content.trim()) {
      setError("Answer cannot be empty.");
      return;
    }
    if (content.trim().length < 10) {
      setError("Answer must be at least 10 characters.");
      return;
    }

    setLoading(true);
    try {
      await answerService.createAnswer(questionId, content);
      setSuccess(
        "Your answer has been submitted and is pending admin approval.",
      );
      setContent("");
      if (onAnswerPosted) onAnswerPosted();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="p-3 rounded-3 mb-4"
      style={{ background: "#f8f9fa", border: "1px solid #e0e0e0" }}
    >
      <h6 className="fw-bold mb-3">Write Your Answer</h6>

      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" onClose={() => setSuccess("")} dismissible>
          {success}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Write your answer here... (min 10 characters)"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setError("");
              setSuccess("");
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Posting...
            </>
          ) : (
            " Post Answer"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default AnswerForm;
