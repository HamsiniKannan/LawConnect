import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AiLawyer() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const askGemini = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const customQuestion = `You are a legal expert on Indian laws. 
      Answer the following question based on Indian traffic rules and fines (Motor Vehicles Act, 2019). 
      Give the answer in 3-5 bullet points, short and clear:
      ${question}`;

      const response = await axios.post("http://localhost:5000/ask-gemini", { question: customQuestion });
      let geminiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      geminiText = geminiText.replace(/\*\*/g, "").replace(/\*/g, "");
      const bulletPoints = geminiText
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

      setAnswer(
        <ul style={{ textAlign: "left", lineHeight: "1.6em", fontSize: "16px" }}>
          {bulletPoints.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      );
    } catch (err) {
      console.error(err);
      setError("Error fetching response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate("/user-dashboard")}>← Back</button>
      <h1 style={styles.title}>AI Lawyer Chatbot</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask your legal question..."
        rows={5}
        cols={60}
        style={styles.textarea}
      />
      <br />
      <button onClick={askGemini} disabled={loading} style={styles.button}>
        {loading ? "Thinking..." : "Ask AI Lawyer"}
      </button>
      <div style={styles.answerBox}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {answer}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#fff",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  backButton: {
    background: "transparent",
    color: "#333",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    textAlign: "left",
    marginBottom: "10px",
  },
  title: {
    color: "#222",
    marginBottom: "20px",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "80%",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  answerBox: {
    marginTop: "20px",
    textAlign: "left",
    display: "inline-block",
    width: "80%",
  },
};
