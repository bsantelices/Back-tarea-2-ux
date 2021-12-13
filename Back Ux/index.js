const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./src/routes/userRouter");
const chatRouter = require("./src/routes/chatRouter");

// settings
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/chat", chatRouter);

// routes
app.get("/", (req, res) => {
  res.send("Welcome");
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));



