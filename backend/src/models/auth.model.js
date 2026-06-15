import mongoose from 'mongoose';


const authSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Name is required']
    },

    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : true
    },

    password : {
        type : String,
        required : [true, 'Password is required'],
        minlength : 8
    },

    isVerified : {
        type : Boolean,
        default : false
    },

    role : {
        type : String,
        required : [true, 'Role is required'],
        enum : ['User', 'Admin']
    },

    otp : {
        type : String
    }
}, {
    timestamps : true
});

const Auth = mongoose.model('Auth', authSchema);

export default Auth;