const express = require("express")
const {getAllItems,getItem} = require("../controllers/Item");
const router = express.Router();
const authenticated = require("../middlewares/authenticated");

router.get("/",authenticated,getAllItems).get("/:id",authenticated,getItem);

module.exports = router;