import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#1a1a2e",
        color: "#adb5bd",
        marginTop: "4rem",
        padding: "2.5rem 0 1.5rem",
      }}
    >
      <Container>
        <Row className="mb-3">
          <Col md={4} className="mb-3 mb-md-0">
            <h5 style={{ color: "#fff", fontWeight: 700 }}>&#128172; DoConnect</h5>
            <p style={{ fontSize: "0.875rem" }}>
              A platform where technical questions are asked and answered by the
              community.
            </p>
          </Col>

          <Col md={4} className="mb-3 mb-md-0">
            <h6 style={{ color: "white", fontWeight: 600 }}>Quick Links</h6>
            <ul className="list-unstyled" style={{ fontSize: "0.875rem" }}>
              <li>
                <Link
                  to="/"
                  style={{ color: "silver", textDecoration: "none" }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/ask"
                  style={{ color: "silver", textDecoration: "none" }}
                >
                  Ask a Question
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  style={{ color: "#adb5bd", textDecoration: "none" }}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  style={{ color: "#adb5bd", textDecoration: "none" }}
                >
                  Register
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 style={{ color: "#fff", fontWeight: 600 }}>About</h6>
            <p style={{ fontSize: "0.875rem" }}>
              DoConnect is a Full Stack MERN capstone project built with React,
              Node.js, Express and MongoDB.
            </p>
          </Col>
        </Row>

        <hr style={{ borderColor: "#444" }} />

        <p className="text-center mb-0" style={{ fontSize: "0.8rem" }}>
          © {new Date().getFullYear()} DoConnect.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
