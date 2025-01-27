import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UserForm.css";

const UserForm = () => {
    const [user, setUser] = useState({ name: "", email: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

      useEffect(() => {
        if (id) fetchUser();
      }, [id]);

      const fetchUser = async () => {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
          const data = await response.json();
          setUser(data);
        } catch (err) {
          setError("Failed to get user details.");
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = id ? "PUT" : "POST";
            const url = id
                ? `https://jsonplaceholder.typicode.com/users/${id}`
                : "https://jsonplaceholder.typicode.com/users";

           await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            navigate("/");
        } catch (err) {
            setError("Failed to save the user.");
        }
    };

    return (
        <div className="user-form-container">
            <h2>{id ? "Edit User" : "Add User"}</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        required
                    />
                </label>
                <button type="submit">{id ? "Update" : "Add"}</button>
            </form>
        </div>
    );
};

export default UserForm;
