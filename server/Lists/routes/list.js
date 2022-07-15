const express = require('express');
const router = express.Router()
const getAllItemsForList = require("../controllers/List");
const authenticatedUser = require("../middlewares/authenticated");

router.get("/allItemsList/:listId", authenticatedUser,getAllItemsForList);

module.exports = router;