const mongoose = require("mongoose");

const database =async()=>{
    try {
        const connection = await mongoose.connect(process.env.database_url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        if(connection){
            console.log(`Connected to database`)
        }
    } catch (error) {
        console.log(`Error connecting to database`)
    }
}

module.exports = database;