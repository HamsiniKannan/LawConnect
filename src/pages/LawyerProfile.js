import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function LawyerProfile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "lawyers", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p style={styles.message}>Loading profile...</p>;

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate("/lawyer-login")}>← Back</button>
      <h2 style={styles.title}>Lawyer Profile</h2>
      <div style={styles.profileBox}>
        <h3>{profile.name || "Unnamed Lawyer"}</h3>
        <p><b>Email:</b> {profile.email || "Not specified"}</p>
        <p><b>Phone:</b> {profile.phone || "Not specified"}</p>
        <p><b>Qualification:</b> {profile.qualification || "Not specified"}</p>
        <p><b>Occupation:</b> {profile.occupation || "Not specified"}</p>
        <p><b>Law Degree:</b> {profile.lawDegree || "Not specified"}</p>
        <p><b>Fees:</b> {profile.fees || "Not specified"}</p>
        <p><b>Location:</b> {profile.location || "Not specified"}</p>
        <p><b>Description:</b> {profile.description || "No details available"}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "25px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  backButton: {
    background: "transparent",
    border: "none",
    color: "#333",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  title: {
    textAlign: "center",
    color: "#222",
    marginBottom: "20px",
  },
  profileBox: {
    padding: "15px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "6px",
    textAlign: "left",
    color: "#333",
  },
  message: {
    textAlign: "center",
    color: "#555",
    marginTop: "50px",
  },
};
