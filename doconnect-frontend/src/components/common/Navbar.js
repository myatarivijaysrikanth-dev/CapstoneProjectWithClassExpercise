import React, { useState } from "react";
import {
  Navbar as BsNavbar,
  Nav,
  Container,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
    }
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/search?keyword=${searchKeyword.trim()}`);
      setSearchKeyword("");
    }
  };

  return (
    <BsNavbar
      bg="primary"
      variant="dark"
      expand="lg"
      sticky="top"
      className="shadow-sm"
    >
      <Container>
        <BsNavbar.Brand as={Link} to="/">
          &#128172; DoConnect
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="main-navbar" />

        <BsNavbar.Collapse id="main-navbar">
          <Form
            className="d-flex my-2 my-lg-0 mx-lg-auto"
            style={{ width: "100%", maxWidth: "360px" }}
            onSubmit={handleSearch}
          >
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search questions..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <Button variant="light" type="submit">
               Search
              </Button>
            </InputGroup>
          </Form>

          <Nav
            className="ms-lg-auto mt-2 mt-lg-0"
            style={{ alignItems: "flex-end "}}
          >
            {user ? (
              <>
                {user.roleId === 1 && (
                  <>
                    <Nav.Link as={NavLink} to="/" className="text-white ">
                      Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/ask" className="text-white">
                      Ask Question
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/chat" className="text-white">
                      Chat
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/profile" className="text-white">
                      Profile
                    </Nav.Link>
                  </>
                )}

                {user.roleId === 2 && (
                  <>
                    <Nav.Link as={NavLink} to="/admin" className="text-white">
                      Dashboard
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/admin/users"
                      className="text-white"
                    >
                      Users
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/admin/questions"
                      className="text-white"
                    >
                      Questions
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/admin/answers"
                      className="text-white"
                    >
                      Answers
                    </Nav.Link>
                  </>
                )}

                <Nav.Link className="text-white fw-bold">
                  &#128100; {user.username}
                </Nav.Link>
                <Nav.Item className="mt-1 mt-lg-0 ms-lg-2">
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" className="text-white">
                  Login
                </Nav.Link>
                <Nav.Item className="mt-1 mt-lg-0 ms-lg-2">
                  <Button as={Link} to="/register" variant="light" size="sm">
                    Register
                  </Button>
                </Nav.Item>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
