import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <div className="app-container">
          <h1> User App </h1>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/add" element={<UserForm />} />
            <Route path="/edit/:id" element={<UserForm />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
