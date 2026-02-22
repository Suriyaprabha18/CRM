const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Temporary storage
let users = [];
let tickets = [];

/* =========================
   REGISTER
========================= */
app.post("/api/register", (req, res) => {
  const { name, email, phone, employeeId, password } = req.body;

  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    phone,
    employeeId,
    password
  };

  users.push(newUser);
  res.json({ message: "Registered successfully" });
});

/* =========================
   LOGIN
========================= */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json(user);
});

/* =========================
   ADD TICKET
========================= */
app.post("/api/tickets", (req, res) => {
  const { title, description, userId } = req.body;

  const newTicket = {
    id: Date.now(),
    title,
    description,
    status: "Open",
    userId
  };

  tickets.push(newTicket);
  res.json(newTicket);
});

/* =========================
   GET USER TICKETS
========================= */
app.get("/api/tickets/:userId", (req, res) => {
  const userTickets = tickets.filter(
    t => t.userId == req.params.userId
  );
  res.json(userTickets);
});

app.listen(5000, () => console.log("Server running on 5000"));