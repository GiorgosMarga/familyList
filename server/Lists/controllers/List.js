const Item = require("../Models/Item")
const {StatusCodes} = require("http-status-codes");
const Error = require("../errors");

const getAllItemsForList = async (req,res) => {
    const listId = req.params.listId;
    const userId = req.user.id;
    if(!listId || !userId){
        throw new Error.BadRequestError("Provide listId and userId");
    }
    const items = await Item.find({listId,deleted:false});
    res.status(StatusCodes.OK).json({items, count:items.length});
}

module.exports = getAllItemsForList;