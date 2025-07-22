import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function ContactLawyer() {
  const [lawyers, setLawyers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lawyers"));
        const lawyerList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setLawyers(lawyerList);
      } catch (error) {
        console.error("Error fetching lawyers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLawyers();
  }, []);

  const filteredLawyers = lawyers.filter((lawyer) => {
    const name = lawyer.name || "";
    const occupation = lawyer.occupation || "";
    const location = lawyer.location || "";
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate("/user-dashboard")}>← Back</button>
      <h2 style={styles.title}>Contact Lawyers</h2>
      <input
        style={styles.searchBar}
        placeholder="Search by name, occupation, or city"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <p style={styles.message}>Loading lawyers...</p>
      ) : (
        <div>
          {filteredLawyers.length > 0 ? (
            filteredLawyers.map((lawyer) => (
              <div key={lawyer.id} style={styles.card}>
                <h3>{lawyer.name || "Unnamed Lawyer"}</h3>
                <p><b>Occupation:</b> {lawyer.occupation || "Not specified"}</p>
                <p><b>Email:</b> {lawyer.email || "Not specified"}</p>
                <p><b>Phone:</b> {lawyer.phone || "Not specified"}</p>
                <p><b>Fees:</b> {lawyer.fees || "Not specified"}</p>
                <p><b>Location:</b> {lawyer.location || "Not specified"}</p>
                <p><b>Description:</b> {lawyer.description || "No details available"}</p>
              </div>
            ))
          ) : (
            <p style={styles.message}>No lawyers found.</p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "30px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    color: "#333",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  backButton: {
    background: "none",
    color: "#333",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  title: {
    textAlign: "center",
    color: "#222",
    marginBottom: "20px",
  },
  searchBar: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    backgroundColor: "#fff",
    color: "#333",
    outline: "none",
  },
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0px 0px 5px rgba(0,0,0,0.05)",
  },
  message: {
    textAlign: "center",
    color: "#555",
    marginTop: "20px",
  },
};
