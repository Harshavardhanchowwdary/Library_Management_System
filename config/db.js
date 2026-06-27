const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database Connected Sucessfully");
        
    }catch(error){
        console.log("Error DB is Not Connected",error.message);
    }
}

module.exports = connectDB;