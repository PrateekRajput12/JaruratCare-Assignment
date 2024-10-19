
const service = require("../modals/service")
const Service=require("../modals/service")
const express=require('express')
const ServiceRoutes=express.Router()


ServiceRoutes.post("/service/new",async(req,res)=>{
    try{
    
        const service=new Service({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
       
        })
    
        await service.save()
    
    res.send("Done")
    }
    catch(err){
        res.status(400).send("Error in savin Data "+err.message)
    }
    })





// to get all services
    ServiceRoutes.get("/service/all",async(req,res)=>{
            try{
                const allServices=await service.find({})
                res.send(allServices)
            }
            catch(e){
                console.log("Error in fetching Data ")
                res.status(400).send("Error in fetching Data ")
            }
        })



        // delete one service

        ServiceRoutes.delete('/service/:id',async(req,res)=>{
                try{
                    const serviceId=req.params.id
                  
                    const serviceById=await service.findByIdAndDelete(req.params.id)
              
                   res.send("deleted service")
                }
                catch(e){
                    res.status(404).send(e.message)
                }
            })


            ServiceRoutes.patch("/service/:id",async(req,res)=>{

                    const serviceId=req.params.id
                    const data=req.body
                
                
                    try{
                        const ALLOWED_UPDATES=[
                            "description","name","price"
                        ]
                        const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k))
                    
                        if(!isUpdateAllowed){
                            // res.status(404).send("Update not Allowed")
                            throw new Error("Update not Allowed")
                        }
                    
                       const updateService= await service.findByIdAndUpdate({_id:serviceId },data,{
                        returnDocument:"before",
                        runValidators:true
                       })
                        res.send("service updated succesfully")
                    }catch(err){
                res.status(404).send("Service not found")
                    }
                })


module.exports=ServiceRoutes