
const mongoose = require("mongoose");

const db = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL_HOSTED);
        console.log("MongoDB connected");
    } catch(err) {
        console.log("MongoDB connection error : ", err.message);
    }
}

// mongoose.connect(mongoURL);

// const db = mongoose.connection;

// db.on("connected", () => {
//     console.log("MongoDB connected");
// })

// db.on("disconnected", () => {
//     console.log("MongoDB disconnected");
// })

// db.on("error", (err) => {
//     console.log("MongoDB Server Error", err);
// })

module.exports = db;