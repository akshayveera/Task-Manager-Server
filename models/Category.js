
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name : {
        type : "string",
        required : true
    },
    userEmail : {
        type : "String",
        required : true        
    }
}, {
    timestamps: true,
    versionKey : false
})

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;