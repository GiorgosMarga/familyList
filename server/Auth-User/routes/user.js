const express = require("express");
const router = express.Router()
const {addListToUser,deleteListFromUser, getAllLists,joinList} = require("../controllers/user");
const authenticatedUser = require("../middlewares/authenticated");
router.patch("/addList",authenticatedUser,addListToUser).patch("/deleteList",authenticatedUser,deleteListFromUser).get("/getAllLists",authenticatedUser,getAllLists).get("/joinList/:listId",authenticatedUser,joinList);;

module.exports = router;
