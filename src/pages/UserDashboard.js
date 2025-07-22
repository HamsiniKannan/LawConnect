import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
    };
    fetchProfile();
  }, []);

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate("/")}>← Back</button>
      <h2 style={styles.title}>User Dashboard</h2>
      {profile ? (
        <div style={styles.profileBox}>
          <p><b>Name:</b> {profile.username}</p>
          <p><b>Email:</b> {profile.email}</p>
          <p><b>Phone:</b> {profile.phone}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      <p style={styles.subtitle}>Choose a service:</p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/ai-lawyer")}>
          AI Lawyer
        </button>
        <button style={styles.button} onClick={() => navigate("/contact-lawyer")}>
          Contact Lawyer
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f8f8f8",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  backButton: {
    background: "transparent",
    color: "#222",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "10px",
    alignSelf: "flex-start",
  },
  title: {
    fontSize: "28px",
    color: "#222",
    marginBottom: "10px",
  },
  profileBox: {
    backgroundColor: "#fff",
    padding: "15px",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    boxShadow: "0px 0px 5px rgba(0,0,0,0.05)",
    textAlign: "left",
    width: "300px",
    fontSize: "14px",
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
    padding: "12px 24px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    minWidth: "150px",
  },
};
