
const express = require("express");
const router = express.Router();
const {getAllUsers, getSingleUser, addUser, deleteUser, userLogin} = require("../controllers/user");
const jwtAuthMiddleware = require("../middlewares/jwtAuth")


router.get("/all-users", jwtAuthMiddleware, getAllUsers);

router.get("/user/:id", jwtAuthMiddleware, getSingleUser);

router.post("/add-user", addUser);

router.post("/user-login", userLogin);

router.delete("/delete-user/:id", jwtAuthMiddleware, deleteUser);

module.exports = router;
