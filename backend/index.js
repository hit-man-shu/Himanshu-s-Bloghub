const express = require("express");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.PORT || 8000;
const bcrypt = require("bcrypt");

app.use(express.json());
const cors = require("cors");
app.use(cors());

const dataPath = path.join(__dirname, "data.json");

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

// Read data from JSON file
function readData() {
  const jsonData = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(jsonData);
}

// Write data to JSON file
function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// User sign up endpoint
app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const data = readData();

    // Check if username already exists
    const existingUser = data.users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: "email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user object
    const newUser = {
      id: Date.now(),
      username,
      password: hashedPassword,
      email,
    };

    // Add the new user to users array
    data.users.push(newUser);

    // Write updated data to file
    writeData(data);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const data = readData();

    // Find user by email
    const user = data.users.find((user) => user.email === email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email!" });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password!" });
    }

    // Generate JWT token with both email and username
    const token = jwt.sign({ email, username: user.username }, "secretKey", {
      expiresIn: "1h",
    });

    // Return the token in the response
    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all blog posts
app.get("/posts", (req, res) => {
  const data = readData();
  res.json(data);
});

// Create a new blog post
// Update a blog post by ID
// Create a new blog post
// Create a new blog post
app.post("/posts", verifyToken, (req, res) => {
  const { title, image, description, date } = req.body;
  if (!title || !image || !description || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const data = readData();
  const newPost = {
    id: Date.now(),
    title,
    author: req.user.username,
    image,
    description,
    date,
  };
  data.posts.push(newPost); // Add new post to the "posts" array
  writeData(data); // Write updated data back to the JSON file
  res.status(201).json(newPost);
});

// Get a specific blog post by ID
app.get("/posts/:id", (req, res) => {
  const data = readData();
  const postId = parseInt(req.params.id);
  const post = data.posts.find((post) => post.id === postId);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.json(post);
});

// Update a blog post by ID
// Update a blog post by ID
app.put("/posts/:id", verifyToken, (req, res) => {
  const { title, image, description, date } = req.body;
  if (!title || !image || !description || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const data = readData();
  const postIndex = data.posts.findIndex(
    (post) => post.id === parseInt(req.params.id),
  );
  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  // Check if the current user is the author of the post
  if (data.posts[postIndex].author !== req.user.username) {
    return res
      .status(403)
      .json({ error: "Forbidden: You can't edit this post" });
  }

  data.posts[postIndex] = {
    ...data.posts[postIndex],
    title,
    image,
    description,
    date,
  };
  writeData(data);
  res.json(data.posts[postIndex]);
});

// Delete a blog post by ID
app.delete("/posts/:id", verifyToken, (req, res) => {
  const postId = parseInt(req.params.id);
  const data = readData();
  const postIndex = data.posts.findIndex((post) => post.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  // Check if the current user is the author of the post
  if (data.posts[postIndex].author !== req.user.username) {
    return res
      .status(403)
      .json({ error: "Forbidden: You can't delete this post" });
  }

  // If the current user is the author, proceed with deleting the post
  data.posts.splice(postIndex, 1);
  writeData(data);
  res.sendStatus(204);
});

// app.post("/login", authenticate);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
