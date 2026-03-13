const express = require("express")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/mongoose-connection")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const cookieParser = require("cookie-parser")
const problemRoutes = require("./routes/problemRoutes")
const aiRoutes = require("./routes/aiRoutes");
const aptitudeRoutes = require("./routes/aptitudeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const mockRoutes = require("./routes/mockRoutes");
const { submitMock } = require("./controllers/mockController");
const newsRoutes = require("./routes/newsRoutes");









const app = express()

connectDB()



app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],  // ← add 5174
  credentials: true
}));

// BODY PARSERS FIRST
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// THEN ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/problems", problemRoutes)
app.use("/api/ai", aiRoutes);
app.use("/api/aptitude", aptitudeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/mock", mockRoutes);
app.use("/api", problemRoutes);
app.use("/api/news", newsRoutes);


app.get("/",(req,res)=>{
    res.send("API running")
})

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})