import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { io } from "socket.io-client";
import { useAuth } from "../../context/AuthContext";
import messageService from "../../services/messageService";
import MessageBubble from "./MessageBubble";

let socket;

const ChatWindow = ({ selectedUser }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.emit("joinRoom", user._id);
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [user._id]);

  const loadHistory = async () => {
    setLoading(true);
    setError("");
    setMessages([]);
    try {
      const data = await messageService.getChatHistory(selectedUser._id);
      setMessages(data);
    } catch (err) {
      setError("Failed to load chat history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedUser) return;
    loadHistory();
  }, [selectedUser]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setSending(true);
    try {
      const saved = await messageService.saveMessage(
        selectedUser._id,
        messageText,
      );
      socket.emit("sendMessage", {
        senderId: user._id,
        receiverId: selectedUser._id,
        messageText: messageText,
        createdAt: new Date().toISOString(),
      });
      setMessages((prev) => [...prev, saved]);
      setMessageText("");
    } catch (err) {
      setError("Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  if (!selectedUser) {
    return (
      <div
        className="d-flex align-items-center justify-content-center chat-box"
        style={{ color: "#adb5bd" }}
      >
        <div className="text-center">
          <p className="mb-0">Select a user to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="d-flex align-items-center p-3 mb-2 rounded-3"
        style={{ background: "#0d6efd", color: "#fff" }}
      >
        <div
          className="rounded-circle d-flex align-items-center justify-content-center me-3"
          style={{
            width: "38px",
            height: "38px",
            background: "rgba(255,255,255,0.2)",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          {selectedUser.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="fw-semibold">{selectedUser.username}</div>
          <div style={{ fontSize: "0.75rem", opacity: 0.85 }}>
            {selectedUser.email}
          </div>
        </div>
      </div>

      {error && (
        <Alert
          variant="danger"
          className="py-2"
          onClose={() => setError("")}
          dismissible
        >
          {error}
        </Alert>
      )}

      <div className="chat-box mb-3">
        {loading ? (
          <div className="text-center mt-4">
            <Spinner animation="border" variant="primary" size="sm" />
            <p className="text-muted mt-2" style={{ fontSize: "0.85rem" }}>
              Loading messages...
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center mt-4 text-muted">
            <p style={{ fontSize: "0.875rem" }}>No messages yet. Say hello!</p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <MessageBubble
                key={msg._id || index}
                message={msg}
                isMe={(msg.senderId?._id || msg.senderId) === user._id}
              />
            ))}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      <Form onSubmit={handleSend}>
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder={`Message ${selectedUser.username}...`}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            maxLength={500}
            autoComplete="off"
          />
          <Button
            variant="primary"
            type="submit"
            disabled={sending || !messageText.trim()}
            style={{ minWidth: "80px" }}
          >
            {sending ? <Spinner animation="border" size="sm" /> : "Send"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChatWindow;
