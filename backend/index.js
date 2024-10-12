const express = require("express");
const app = express();
dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config(); // Load environment variables
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/chat-api", async (req, res) => {
  const { message } = req.body;
  console.log(message);

  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = message;

  const result = await model.generateContent(prompt);
  console.log(result.response.text());

  res.send(result.response.text());
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
