const dotenv = require("dotenv").config();

const express = require("express");
const EventEmitter = require("events");
const emitter = new EventEmitter();
emitter.setMaxListeners(20);

const colors = require("colors");
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

app.use(errorHandler);

app.use("/api/users", require("./routes/userRoute"));
app.use("/api/tickets", require("./routes/ticketRoute"));
