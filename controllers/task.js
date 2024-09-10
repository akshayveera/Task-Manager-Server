
const TaskInfo = require("../models/TaskInfo");

const getAllTasks = async (req, res)=>{
    
    try {
        const tasksData = await TaskInfo.find();
        res.status(200).json(tasksData);
    } catch(err) {
        res.status(500).json({message : err.message});
    }
}

const getTaskById = async (req, res) => {

    try {
        
        const id = req.params.id;

        if(id) {
            const task = await TaskInfo.findById(id);

            if(task) {
                res.status(200).json(task);
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        } else {
            res.status(404).json({ message: 'Invalid Id'});
        }

    } catch(err) {
        res.status(500).json({message : err.message});
    }
}

const getUserTasks = async (req, res) => {

    try {
        const email = req.auth.email;
        const tasksData = await TaskInfo.find({userEmail : email});
        res.status(200).json(tasksData);
    } catch(err) {
        res.status(500).json({message : err.message});
    }
}

const addTask = async (req, res) => {
    
    try {
        // const newTaskInfo = new TaskInfo(req.body);
        // const response = await newTaskInfo.save();
        const email = req.auth.email;
        const data = new TaskInfo({...req.body, userEmail: email});
        const newTaskInfo = await TaskInfo.create(data);
        res.status(200).json({ data : newTaskInfo })
    } catch(err) {
        res.status(500).json({message : err.message})
    }
}

const updateTask = async (req, res) => {

    try {
        const id = req.params.id;
        const updatedData = req.body;
        const updatedTaskInfo = await TaskInfo.findOneAndUpdate(
            {_id : id}, 
            updatedData, 
            {new : true, runValidators: true}
        );
        
        if(updatedTaskInfo) {
            res.status(200).json(updatedTaskInfo);
        } else {
            res.status(404).json({message : "Item not found"});
        }
    } catch(err) {
        res.status(500).json({message : err.message});
    }
}

const deleteTask = async (req, res) => {

    try { 
        const id = req.params.id;
        const response = await TaskInfo.findOneAndDelete({_id : id});
       
        if(response) {
            return res.status(200).json({
                "message" : "Item deleted successfully", 
                "res" :  response
            });
        } else {
            return res.status(404).json({"message" : "Item not found"});
        }
    } catch(err) {
        res.status(500).json({message : err.message});
    }
}

module.exports = {getAllTasks, addTask, updateTask, deleteTask, getUserTasks, getTaskById};

