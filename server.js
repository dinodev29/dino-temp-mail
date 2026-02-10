const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let inboxes = {};

app.get("/", (req, res) => {
  res.send("Dino Temp Mail Backend Running 🦖");
});

app.get("/new-email", (req, res) => {
  const random = Math.random().toString(36).substring(7);
  const email = random + "@dinomail.app";
  inboxes[email] = [];
  res.json({ email });
});

app.post("/receive", (req, res) => {
  const { email, message } = req.body;
  if (inboxes[email]) {
    inboxes[email].push(message);
  }
  res.json({ status: "Message received" });
});

app.get("/inbox/:email", (req, res) => {
  res.json(inboxes[req.params.email] || []);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
