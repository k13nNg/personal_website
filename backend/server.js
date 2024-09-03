import express from "express";
import cors from "cors";
import admin from "./routes/admin_route.js";
import login from "./routes/login_route.js";
import cookies from "cookie-parser";
import "dotenv/config";


const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://personal-website-frontend.onrender.com"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));
app.use(express.json({limit: "16mb"}));
app.use(cookies());
app.use("/admin", admin);
app.use("/login", login);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});