import mongoose from "mongoose";


const ProfileData = new mongoose.Schema({
    Name : {
        type : String,
    }, 

    Location : {
        type : String,
    },

    Bio : {
        type : String,
    },
    
    profileImage : {
        type : String,
    }
})

const authSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true, "Name is required"]
    },

    email : {
        type : String,
        required : [true, "Email is required"],
        unique : true
    }, 

    password : {
        type : String,
        required : [true, "Password is required"],
        minlength : [8, "Password must be at least 8 characters"]
    }, 

    role : {
        type : String,
        enum : ["Admin", "User"]
    },

    profile : ProfileData

}); 

const Auth = mongoose.model("Auth", authSchema);
export default Auth;