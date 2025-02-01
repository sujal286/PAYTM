const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routers/index");
const cors = require("cors");

const app = express();

// MongoDB connection string
const Database_URI = "mongodb://localhost:27017/Paytm";

// Connect to MongoDB
mongoose
  .connect(Database_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", mainRouter);

// Test DB connection route
app.get("/test-db", async (req, res) => {
  try {
    const users = await mongoose.model('User').find();  // Fetch all users to test the connection
    if (users) {
      res.json({ message: "Database is connected", users });
    } else {
      res.json({ message: "Database is connected but no users found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching data from database", error: err });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
