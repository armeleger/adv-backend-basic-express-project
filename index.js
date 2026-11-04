const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

// Logging middleware: runs for every request
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to my Express server!");
});

// About page
app.get("/about", (req, res) => {
  res.send("About page: this is a basic Express.js server built for the Week 4 activity.");
});

// Contact page
app.get("/contact", (req, res) => {
  res.send("Contact page: reach us at contact@example.com");
});

// Users
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `You requested user with ID ${id}`, id });
});

app.post("/users", (req, res) => {
  const user = req.body;
  res.status(201).json({ message: "User received", user });
});

// Search with query parameter
app.get("/search", (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).send("Please provide a name, e.g. /search?name=alice");
  }
  res.send(`You searched for: ${name}`);
});

// Challenge: Courses API
const courses = [
  { id: 1, title: "Introduction to Node.js" },
  { id: 2, title: "Express.js Fundamentals" },
  { id: 3, title: "Building REST APIs" },
];

app.get("/courses", (req, res) => {
  res.json(courses);
});

app.get("/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id));
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json(course);
});

app.post("/courses", (req, res) => {
  const { title } = req.body || {};
  if (!title) {
    return res.status(400).json({ message: "Course title is required" });
  }
  const course = { id: courses.length ? courses[courses.length - 1].id + 1 : 1, title };
  courses.push(course);
  res.status(201).json({ message: "Course created", course });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
