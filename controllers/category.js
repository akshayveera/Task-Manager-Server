
const Category = require("../models/Category");

const getAllCats = async (req, res) => {

    try {
        const cats = await Category.find();
        if(cats) {
            res.status(200).json(cats);
        } else {
            res.status(404).json({ message: "No categories found" });
        }
    } catch(err) {
        res.status(500).json({error : err.message})
    }
}

const getuserCats =  async (req, res) => {

    try {
        const email = req.auth.email;
        const userCats = await Category.find({ userEmail: email });

        if(userCats) {
            return res.status(200).json(userCats);
        } else {
            return res.status(404).json({ message: "No categories found for this user" });
        }
    } catch (err) {
        res.status(500).json({message : err.message});

    }

}

const addCat = async (req, res) => {

    try {
        const {name} = req.body;
        
        if(!(name)) {
            return res.status(400).json({message : "name is required"});
        }

        const email = req.auth.email;

        const newCat = await Category.create({ name, userEmail : email });

        res.status(200).json({
            message : "Category added succesfully",
            newCat
        })        
    } catch(err) {
        res.status(500).json({error : err.message});
    }
}


const deleteCat = async (req, res) => {

    try {
        const id = req.params.id;

        if(!id) {
            res.status(404).json({message : "Required category id"});
        }

        const cat = await Category.findOneAndDelete({_id : id});

        if(cat) {
            res.status(200).json({
                message : "Category deleted successfully", 
                cats : await Category.find({userEmail : cat.userEmail})
            });            
        } else {
            res.status(404).json({message : "Category not found"});
        }

    } catch (err) {
        res.status(500).json({error : err.message});
    }
}

module.exports = {getAllCats, addCat, deleteCat, getuserCats};