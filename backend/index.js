const express = require("express");
const app = express();
dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config(); // Load environment variables
app.use(
  cors({
    origin: "https://intelli-chat-ai-powered-chat-app.vercel.app", // Your frontend URL
    credentials: true, // Enable credentials if needed
  })
);
// or allow all origins (not recommended for production)
// app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/chat-api", async (req, res) => {
  const { message } = req.body;

  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = message;

  const result = await model.generateContent(prompt);

  res.send(result.response.text());
});

app.post("/test-api", (req, res) => {
  res.send("Test API");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
