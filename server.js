require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// Server Setup
const app = express();
const PORT = process.env.PORT || 5000


//Db Connection
connectDB();


//middleware
app.use(express.json());
app.use(cookieParser());

//Testing the BackendServer
app.get("/",(req,res) =>{
    res.json({message: "Server is running perfectly"});
});
//Checking basic Route
app.get("/health", (req, res) => {
    res.status(200).json({ status: "healthy", message: "Server is running perfectly" });
});

//authRoutes 
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

//bookRoutes 
const bookRoutes = require('./routes/bookRoutes');
app.use("/api/books", bookRoutes);

//membersRoutes 
const memberRoutes = require('./routes/memberRoutes');
app.use("/api/members", memberRoutes);

// Starting Server 
app.listen(PORT, () => {
    console.log("Server is Running at", PORT);
})
