const express = require("express");
const app = express();
const cors = require("cors");
const dotenv =require("dotenv");
dotenv.config();
const database = require("./database/dbConnect");
const authRoutes = require("./routes/auth.routes");
const questionRoutes = require("./routes/questions.routes");
const answerRoutes = require("./routes/answers.routes");

app.use(express.json());

app.use(cors({
    origin:process.env.frontend_url,
    credentials:true
}))


app.use(express.urlencoded({ limit: "30mb", extended: true }));


//connect to database :

database();



app.get("/",(req,res)=>{
    res.send("Stackoverflow API")
})

app.use("/user",authRoutes);
app.use("/questions",questionRoutes);
app.use("/answer",answerRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server started in port ${process.env.PORT}`)
})