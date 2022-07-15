const Item = require('../Models/Item')
const Error = require("../errors");
const {StatusCodes} = require("http-status-codes")

const getAllItems = async (req, res) => {
    const userId = req.user.id;
    if(!userId){
        throw new Error.BadRequestError("Please provide an id");
    }
    const items = await Item.find({user: userId});
    if(!items){
        throw new Error.NotFoundError("Item does not exist");
    }
    res.status(StatusCodes.OK).json({items, "count":items.length});
}

const getItem = async (req, res) => {
    const itemId = req.params.id;
    if(!itemId){
        throw new Error.BadRequestError("Please provide an id");
    }
    const item = await Item.findOne({_id: itemId});
    if(!item){
        throw new Error.NotFoundError("Item does not exist");
    }
    if(req.user.id !== item.user.toString()){
        throw new Error.AuthenticationError("Item does not exist");
    }
    res.status(StatusCodes.OK).json({item});
}
module.exports = {getAllItems,getItem};