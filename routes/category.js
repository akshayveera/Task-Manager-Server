
const router = require("express").Router();
const {getAllCats, addCat, deleteCat, getuserCats} = require("../controllers/category");
const jwtAuthMiddleware = require("../middlewares/jwtAuth");

router.use(jwtAuthMiddleware);

router.get("/all-cats", getAllCats);
router.get("/user-cats", getuserCats);
router.post("/add-cat", addCat);
router.delete("/delete-cat/:id", deleteCat);

module.exports = router;