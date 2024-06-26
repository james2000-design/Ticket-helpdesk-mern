require("dotenv").config();
const path = require("path");
const express = require("express");
require("colors");
const connectDB = require("./config/db");

// connect DB
connectDB();

const PORT = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`server has started on ${PORT}`));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the support desk API" });
});

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // FIX: below code fixes app crashing on refresh in deployment
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (_, res) => {
    res.status(200).json({ message: "Welcome to the Support Desk API" });
  });
}

app.use(errorHandler);

app.use("/api/users", require("./routes/userRoute"));
app.use("/api/tickets", require("./routes/ticketRoute"));
