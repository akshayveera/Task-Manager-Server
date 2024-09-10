
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    desc : {
        type : String,
        required : true,
    },
    priority : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    postedAt : {
        type : String,
        required : true,
    },
    deadline : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        required : true,
    },
    userEmail : {
        type : String,
        required : true,
    }
} , {
    timestamps : true,
    versionKey : false
})

const TaskInfo = mongoose.model("TaskInfo", TaskSchema);
module.exports = TaskInfo;