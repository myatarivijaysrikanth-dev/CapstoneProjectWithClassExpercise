import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import questionService from "../../services/questionService";
import QuestionList from "../../components/questions/QuestionList";
import Loader from "../../components/common/Loader";

const Home = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await questionService.getAllQuestions();
        setQuestions(data);
      } catch (err) {
        setError("Failed to load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="page-wrapper">
      <Container>
        <div
          className="text-center rounded-3 p-5 mb-4"
          style={{
            background: "linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)",
            color: "#fff",
          }}
        >
          <h1 className="fw-bold mb-2">Welcome to &#128172; DoConnect</h1>
          <p className="mb-4" style={{ fontSize: "1.1rem", opacity: 0.9 }}>
            Ask technical questions, share knowledge and connect with others.
          </p>
          {user ? (
            <Button
              as={Link}
              to="/ask"
              variant="light"
              size="lg"
              className="fw-semibold"
            >
              Ask a Question
            </Button>
          ) : (
            <div className="d-flex justify-content-center gap-3">
              <Button as={Link} to="/register" variant="light" size="lg">
                Get Started
              </Button>
              <Button as={Link} to="/login" variant="outline-light" size="lg">
                Login
              </Button>
            </div>
          )}
        </div>

        <Row>
          <Col lg={8}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">
                Latest Questions{" "}
                <span className="text-muted fs-6 fw-normal">
                  ({questions.length} total)
                </span>
              </h5>
              {user && (
                <Button as={Link} to="/ask" variant="primary" size="sm">
                  + Ask Question
                </Button>
              )}
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? <Loader /> : <QuestionList questions={questions} />}
          </Col>
          <Col lg={4}>
            <div
              className="p-3 rounded-3 mb-3"
              style={{ background: "#fff", border: "1px solid #e0e0e0" }}
            >
              <h6 className="fw-bold mb-3"> How DoConnect Works</h6>
              <ul
                className="list-unstyled mb-0"
                style={{ fontSize: "0.875rem", color: "#555" }}
              >
                <li className="mb-2">
                  &#9989; Register or login to your account
                </li>
                <li className="mb-2">&#10067; Ask any technical question</li>
                <li className="mb-2">&#128172; Answer questions from others</li>
                <li className="mb-2">&#128077; Like and comment on answers</li>
                <li className="mb-2">&#128269; Search for specific topics</li>
                <li>&#128140; Chat directly with other users</li>
              </ul>
            </div>

            {!user && (
              <div
                className="p-3 rounded-3 text-center"
                style={{ background: "#e8f0fe", border: "1px solid #c2d3f7" }}
              >
                <h6 className="fw-bold mb-2" style={{ color: "#0d6efd" }}>
                  Join DoConnect
                </h6>
                <p
                  className="mb-3"
                  style={{ fontSize: "0.85rem", color: "#555" }}
                >
                  Create an account to ask questions and join the community.
                </p>
                <Button
                  as={Link}
                  to="/register"
                  variant="primary"
                  size="sm"
                  className="w-100"
                >
                  Register Now
                </Button>
              </div>
            )}

            {user && (
              <div
                className="p-3 rounded-3 text-center"
                style={{ background: "#e8f0fe", border: "1px solid #c2d3f7" }}
              >
                <h6 className="fw-bold mb-2" style={{ color: "#0d6efd" }}>
                  &#128075; Hello, {user.username}!
                </h6>
                <p
                  className="mb-3"
                  style={{ fontSize: "0.85rem", color: "#555" }}
                >
                  Have a question? The community is here to help.
                </p>
                <Button
                  as={Link}
                  to="/ask"
                  variant="primary"
                  size="sm"
                  className="w-100"
                >
                  Ask a Question
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
