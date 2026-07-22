const mongoose = require('mongoose');


const connetDatabase=()=>{
    mongoose.connect(process.env.DB_URL).then((con)=>{
        console.log("mongoDB connected to host:"+con.connection.host)
    })
}
module.exports=connetDatabase;