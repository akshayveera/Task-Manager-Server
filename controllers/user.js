
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

getAllUsers = async (req, res) => {

    try {
        const email = req.auth.email;
        const userInfo = await User.findOne({ email });
        const userRole = userInfo.role;

        if(userRole === 'admin') {
            const users = await User.find();
    
            if(users) {
                res.status(200).json({users});
            } else {
                res.status(404).json({message : "No users found"});
            }
        } else {
            res.status(401).json({message : "unauthorised"});
        }
    } catch(err) {
        res.status(500).json({message : err.message});
    }

}

getSingleUser = async (req, res) => {

    try {
        const id = req.params.id;
        const user = await User.findOne({_id : id});

        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message : "User not found"});
        }
    } catch(err) {
        res.status(500).json({message : err.message})
    }

}

addUser = async (req, res) => {

    try {
        let {name, email, password} = req.body;
        // console.log(req.body);
        
        if(!(name && email && password)){
            return res.status(400).json({message : "All fields are required"});
        }

        if(await User.findOne({email})) {
            return res.status(400).json({message : "Email already exist"});
        }

        // hash password using bcrypt
        password = await hashPassword(password);

        const newUser = await User.create({name, email, password});
        return res.status(201).json(newUser);
    } catch(err) {
        res.status(500).json({message : err.message})
    }

}

userLogin = async (req, res) => {

    try {
        const { email, password } = req.body;
        
        if(!(email && password)) {
            return res.status(400).json({message : "email and password are required"});
        }

        const user = await User.findOne({email}); 

        if(!user) {
            return res.status(404).json({message : "User not registered"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch) {

            const payload = { email, name : user.name };
            const token = jwt.sign(
                payload, 
                process.env.SECRET_KEY,
                { expiresIn : "24h"}
            )

            return res.status(200).json({message : "Login successful", token, name : user.name});
        } else {
            return res.status(400).json({message : "Invalid password"});
        }
    } catch(err) {
        return res.status(500).json({message : err.message});
    }
}

deleteUser = async (req, res ) => {

    try {
        const id = req.params.id;
        const deleteUser = await User.findOneAndDelete({_id : id});
        
        if(deleteUser) {
            res.status(200).json({message : "User deleted successfully", deletedUser : deleteUser});
        } else {
            res.status(404).json({message : "User not found"});
        }
        
    } catch(err) {
        res.status(500).json({message : err.message})
    }
    
}

updateUser = async (req, res ) => {

    try {
        const id = req.params.id;
        const update = req.body;
        const updateUser = await User.findOneAndUpdate({_id : id}, {...update}, {new : true, runValidators: true});
        
        if(updateUser) {
            res.status(200).json({message : "User updated successfully", update : updateUser});
        } else {
            res.status(404).json({message : "User not found"});
        }
        
    } catch(err) {
        res.status(500).json({message : err.message})
    }
    
}

async function hashPassword(password) {

    // two approaches

    // approach 1 - generate salt and then hash by attaching salt to original pass
    
    // // generate salt
    // const salt = await bcrypt.genSalt(10);

    // // hash password
    // const hash = await bcrypt.hash(password, salt);
    // console.log("hash-----------------", hash);
    // return hash;

    // approach 2; - directly give original pass and no.of salt rounds to hash function
    const hashedPass = await bcrypt.hash(password, 10);    
    return hashedPass;
    
}

module.exports = { getAllUsers, getSingleUser, addUser, deleteUser, updateUser, userLogin};
