import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to LawConnect</h1>
      <p style={styles.subtitle}>Choose your role to continue:</p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/user-login")}>
          I am a User
        </button>
        <button style={styles.button} onClick={() => navigate("/lawyer-login")}>
          I am a Lawyer
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "32px",
    color: "#222",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
};
