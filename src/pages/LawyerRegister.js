import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function LawyerRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [occupation, setOccupation] = useState("");
  const [lawDegree, setLawDegree] = useState("");
  const [fees, setFees] = useState("");
  const [location, setLocation] = useState("");  
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "lawyers", user.uid), {
        name,
        email,
        phone,
        qualification,
        occupation,
        lawDegree,
        fees,
        location,
        description
      });

      setMessage("Lawyer registered successfully!");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate("/lawyer-login")}>← Back</button>
      <h2 style={styles.title}>Lawyer Register</h2>
      <input style={styles.input} placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input style={styles.input} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input style={styles.input} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <input style={styles.input} placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
      <input style={styles.input} placeholder="Qualification" onChange={(e) => setQualification(e.target.value)} />
      <input style={styles.input} placeholder="Occupation" onChange={(e) => setOccupation(e.target.value)} />
      <input style={styles.input} placeholder="Law Degree" onChange={(e) => setLawDegree(e.target.value)} />
      <input style={styles.input} placeholder="Fees" onChange={(e) => setFees(e.target.value)} />
      <input style={styles.input} placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
      <textarea style={styles.textarea} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <button style={styles.button} onClick={handleRegister}>Register</button>
      <p style={styles.message}>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "450px",
    margin: "50px auto",
    padding: "25px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  backButton: {
    background: "none",
    border: "none",
    color: "#333",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "10px",
    textAlign: "left",
  },
  title: {
    textAlign: "center",
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
    backgroundColor: "#fff",
    color: "#333",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: "60px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
    backgroundColor: "#fff",
    color: "#333",
    outline: "none",
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
    transition: "background 0.3s",
  },
  message: {
    textAlign: "center",
    marginTop: "10px",
    color: "#555",
  },
};
