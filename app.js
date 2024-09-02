const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cors());
connectDB();

app.use("/api", userRoutes);
app.use("/api", taskRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server is running");
});
