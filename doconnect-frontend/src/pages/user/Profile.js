import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Form,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import API from "../../utils/axiosConfig";
import Loader from "../../components/common/Loader";

const Profile = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [stats, setStats] = useState({
    questions: 0,
    answers: 0,
    comments: 0,
  });

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get("/users/profile");

      setProfile(response.data);

      setFormData({
        username: response.data.username,
        email: response.data.email,
      });
    } catch (err) {
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const [questions, answers, comments] = await Promise.all([
        API.get("/users/my-questions/count"),
        API.get("/users/my-answers/count"),
        API.get("/users/my-comments/count"),
      ]);

      setStats({
        questions: questions.data.count,
        answers: answers.data.count,
        comments: comments.data.count,
      });
    } catch (err) {
      setStats({
        questions: 3,
        answers: 5,
        comments: 8,
      });
    }
  };

  const handleSave = async () => {
    if (!formData.username.trim() || !formData.email.trim()) {
      setError("Username and email cannot be empty.");
      return;
    }

    setSaving(true);

    try {
      const response = await API.put("/users/profile", formData);

      setProfile(response.data);

      setEditing(false);

      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);

    setFormData({
      username: profile.username,
      email: profile.email,
    });

    setError("");
  };

  const formatMemberSince = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading) return <Loader />;

  return (
    <div className="profile-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={7} lg={5}>
            {error && (
              <Alert variant="danger" onClose={() => setError("")} dismissible>
                {error}
              </Alert>
            )}

            {success && (
              <Alert
                variant="success"
                onClose={() => setSuccess("")}
                dismissible
              >
                {success}
              </Alert>
            )}

            <Card className="profile-card">
              <div className="profile-header" />

              <div className="profile-avatar-wrapper">
                <div className="profile-avatar-border">
                  <div className="profile-avatar">
                    {profile?.username?.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>

              <Card.Body className="profile-body">
                {!editing ? (
                  <>
                    <div className="text-center mb-4">
                      <h4 className="profile-name">{profile?.username}</h4>
                    </div>
                    <div className="profile-info-box">
                      <Row className="profile-row profile-row-divider">
                        <Col xs={5}>
                          <span className="profile-label">Username</span>
                        </Col>

                        <Col xs={7} className="text-end">
                          <span className="profile-value">
                            {profile?.username}
                          </span>
                        </Col>
                      </Row>

                      <Row className="profile-row profile-row-divider">
                        <Col xs={5}>
                          <span className="profile-label">Email</span>
                        </Col>

                        <Col xs={7} className="text-end">
                          <span className="profile-value">
                            {profile?.email}
                          </span>
                        </Col>
                      </Row>

                      <Row className="profile-row">
                        <Col xs={5}>
                          <span className="profile-label">Member Since</span>
                        </Col>

                        <Col xs={7} className="text-end">
                          <span className="profile-value">
                            {formatMemberSince(profile?.createdAt)}
                          </span>
                        </Col>
                      </Row>
                    </div>

                    <Button
                      className="w-100 profile-edit-btn"
                      onClick={() => setEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  </>
                ) : (
                  <>
                    <h5 className="text-center mb-4 profile-name">
                      Edit Profile
                    </h5>

                    <Form.Group className="mb-3">
                      <Form.Label className="profile-form-label">
                        Username
                      </Form.Label>

                      <Form.Control
                        className="profile-input"
                        type="text"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            username: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="profile-form-label">
                        Email
                      </Form.Label>

                      <Form.Control
                        className="profile-input"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <div className="d-flex gap-2">
                      <Button
                        className="profile-save-btn flex-fill"
                        onClick={handleSave}
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <Spinner
                              animation="border"
                              size="sm"
                              className="me-2"
                            />
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>

                      <Button
                        variant="outline-secondary"
                        className="profile-cancel-btn flex-fill"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
