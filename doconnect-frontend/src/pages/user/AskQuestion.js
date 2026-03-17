import React, { useState } from "react";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import questionService from "../../services/questionService";

const AskQuestion = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.title || !formData.description) {
      setError("Title and description are required.");
      return false;
    }
    if (formData.title.length < 10) {
      setError("Title must be at least 10 characters.");
      return false;
    }
    if (formData.description.length < 20) {
      setError("Description must be at least 20 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validate()) return;

    setLoading(true);
    try {
      await questionService.createQuestion(
        formData.title,
        formData.description,
        formData.topic,
      );
      setSuccess(
        "Your question has been submitted and is pending admin approval. You will see it on the home page once approved.",
      );
      setFormData({ title: "", description: "", topic: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Container>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h4 className="fw-bold mb-1">Ask a Question</h4>
          <p className="text-muted mb-4">
            Be specific and clear. Your question will be visible after admin
            approval.
          </p>

          <Card
            className="p-4"
            style={{ borderRadius: "12px", border: "1px solid #e0e0e0" }}
          >
            <Card.Body>
              {error && (
                <Alert
                  variant="danger"
                  onClose={() => setError("")}
                  dismissible
                >
                  {error}
                </Alert>
              )}
              {success && (
                <Alert variant="success">
                  {success}
                  <div className="mt-2">
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => navigate("/")}
                    >
                      Go to Home
                    </Button>
                  </div>
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Question Title <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="e.g. How does the Node.js event loop work?"
                    value={formData.title}
                    onChange={handleChange}
                    maxLength={200}
                  />
                  <Form.Text className="text-muted">
                    Min 10 characters. Be specific ({formData.title.length}/200)
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Description <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="description"
                    placeholder="Explain your question in detail..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    Min 20 characters. Provide as much detail as possible.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    Topic
                    <span className="text-muted fw-normal"> (optional)</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="topic"
                    placeholder="e.g. Node.js, React, MongoDB..."
                    value={formData.topic}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    Add a topic to help others find your question.
                  </Form.Text>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" isabled={loading || success}>
                    {loading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Submitting...
                      </>
                    ) : (
                      "Submit Question"
                    )}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    type="button"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default AskQuestion;
