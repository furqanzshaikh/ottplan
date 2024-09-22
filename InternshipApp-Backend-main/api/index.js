const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("../routes/auth");
const empRoutes = require("../routes/emp");
const roleRoutes = require("../routes/role");
const clientRoutes = require("../routes/client");
const bodyParser = require("body-parser");

require("dotenv").config();
const app = express();

app.use(bodyParser.json());
// Middleware
app.use(express.json());

// const corsOptions = {
//   origin: ['http://localhost:5173', 'https://internship-frontend-ten.vercel.app/'], // Add multiple origins
//   methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Specify allowed methods
//   // credentials: true, // Allow cookies
// };

app.use(cors());

app.use(helmet());

// Routes
app.use("/auth", authRoutes);
app.use("/emp", empRoutes);
app.use("/role",roleRoutes);
app.use("/client",clientRoutes);


app.get("/", (req, res) => {
  res.send("Working");
});


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
