const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Your Gemini API Key
const GEMINI_API_KEY = "AIzaSyDqAlbCHOPv1RUWvTg3iEV3k9SGTsoiEwA";

// --- Test Endpoint ---
app.get("/test", async (req, res) => {
  try {
    const testResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: "Give me 3 points about traffic rules." }]
          }
        ]
      }
    );
    res.json(testResponse.data);
  } catch (error) {
    console.error("Gemini API Test Error:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// --- Chatbot Endpoint ---
app.post("/ask-gemini", async (req, res) => {
  try {
    const { question } = req.body;
    console.log("Incoming Question:", question);

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: question }]
          }
        ]
      }
    );

    console.log("Gemini Response:", response.data);
    res.json(response.data);
  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// --- Start Server ---
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
