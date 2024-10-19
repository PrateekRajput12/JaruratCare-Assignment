const express=require("express")
const app= express()
app.use(express.json())
const ServiceRoutes=require("./src/routes/ServiceRoutes")

const connectDB=require("./src/config/database")
app.use("/",ServiceRoutes)



connectDB().then(()=>{
    console.log("DB COnnection established");
    app.listen(8000,()=>{
        console.log("Server started on port 8000");
    })
})
.catch((err)=>{
    console.error("Error connecting to DB");
})