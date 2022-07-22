const express = require("express")
const {getAllItems,getItem,uploadImage} = require("../controllers/Item");
const router = express.Router();
const authenticated = require("../middlewares/authenticated");

router.post("/uploadImage",authenticated,uploadImage).get("/",authenticated,getAllItems).get("/:id",authenticated,getItem)

module.exports = router;