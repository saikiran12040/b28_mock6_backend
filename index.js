const express=require("express")
const cors=require("cors");
const connection=require("./db");
const {user}=require("./routes/user.routes")
const {blogs}=require("./routes/blogs.routes");
const {auth}=require("./middleware/auth.middleware")

require("dotenv").config()

const app=express()

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.use("/api",user)
app.use(auth)
app.use("/api/blogs",blogs)

app.listen(process.env.port,async(req,res)=>{
    try{
        await connection
        console.log("connected to db")
    } catch(error) {
        console.log(error)
    }
    console.log('Server is running!')
})