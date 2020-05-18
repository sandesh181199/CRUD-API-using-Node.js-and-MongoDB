const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required : true
    },
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    }
},
    {
        timestamps : true
    }
)


const Users = mongoose.model('user', userSchema);
module.exports = Users;