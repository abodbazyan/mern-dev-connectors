const express = require("express");
const mongoose = require("mongoose");

// Require the routes
const userRoutes = require("./routes/api/userRoutes");
const postRoutes = require("./routes/api/postRoutes");
const profileRoutes = require("./routes/api/profileRoutes");

// Creating the app
const app = express();

// Connect to the database
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(console.log("Database connected"))
  .catch(error => console.log(error));

// Use the routes
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/post", postRoutes);

// Run the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));
