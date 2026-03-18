import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Home from "./pages/user/Home";
import AskQuestion from "./pages/user/AskQuestion";
import QuestionDetail from "./pages/user/QuestionDetail";
import SearchResults from "./pages/user/SearchResults";
import Profile from "./pages/user/Profile";
import Chat from "./pages/user/Chat";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageQuestions from "./pages/admin/ManageQuestions";
import ManageAnswers from "./pages/admin/ManageAnswers";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/questions/:id" element={<QuestionDetail />} />
          <Route path="/search" element={<SearchResults />} />

          <Route
            path="/ask"
            element={
              <ProtectedRoute>
                <AskQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/questions"
            element={
              <AdminRoute>
                <ManageQuestions />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/answers"
            element={
              <AdminRoute>
                <ManageAnswers />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
