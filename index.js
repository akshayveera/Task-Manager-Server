

require("dotenv").config();
const express = require("express");
const app = express();
const dbConnection = require("./db");
dbConnection();
const cors = require("cors");
const taskRoutes = require("./routes/task");
const userRoutes = require("./routes/user");
const catRoutes = require("./routes/category");
// const passport = require("./middlewares/auth");
const jwtAuthMiddleware = require("./middlewares/jwtAuth");


const whitelist = ['http://localhost:3000', 'http://localhost:4200', 'https://taskmanagersite.vercel.app'];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Deny the request
    }
  }
};

app.use(cors(corsOptions));


app.use(express.json());
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

// app.use(passport.initialize());
// const localAuthMiddleware = passport.authenticate("local", {session : false});

// --------------- endpoints ----------------

app.use('/api/v1', userRoutes);
app.use('/api/v1', catRoutes);
app.use('/api/v1', taskRoutes);

app.get( "/",  (req, res) => {
    res.json({message : "Welcome to our API"});
})

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("PORT is live at", port);
})
