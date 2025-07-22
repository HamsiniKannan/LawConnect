import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/user-dashboard");
    } catch (error) {
      console.error(error);
      setMessage("Login failed: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate("/")}>← Back</button>
      <h2 style={styles.title}>User Login</h2>
      <input
        style={styles.input}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={styles.button} onClick={handleLogin}>Login</button>
      {message && <p style={styles.message}>{message}</p>}
      <p style={styles.registerText}>
        New User?{" "}
        <Link to="/user-register" style={styles.link}>
          Register Here
        </Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "25px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  backButton: {
    background: "transparent",
    color: "#222",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    marginBottom: "10px",
  },
  title: {
    color: "#222",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  message: {
    color: "#555",
    marginTop: "10px",
  },
  registerText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#333",
  },
  link: {
    color: "#333",
    textDecoration: "underline",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
