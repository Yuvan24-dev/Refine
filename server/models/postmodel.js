const mongoose=require("mongoose");


const Connecter=process.env.URL;

mongoose.connect(Connecter,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("Data base connected")})
.catch((err)=>{console.log("something went wrong",err)})


const mongooseSchema =new mongoose.Schema({
    title:String,
    content:String,
    status:{type:String,
        enum:["published","draft","rejected"],
        default:"draft"
    }
})

const post = mongoose.model("post", mongooseSchema);
module.exports = post;
