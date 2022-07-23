const User = require("../Models/User");
const {StatusCodes} = require("http-status-codes");
const Error = require("../errors");
const crypto = require('crypto');
const { isErrored } = require("stream");


const getAllLists = async (req,res) => {
    const userId = req.user.id;
    if(!userId){
        throw new Error.BadRequestError("Provide User Id and List Id");
    }
    const user = await User.findOne({_id: userId});
    if(!user){
        throw new Error.NotFoundError("User not found");
    }
    res.status(StatusCodes.OK).json({lists: user.lists});
}

const joinList = async (req,res) => {
    const userId = req.user.id;
    const {listId} = req.params;

    if(!userId || !listId){
        throw new Error.BadRequestError("Provide User Id and List Id");
    }
    const user = await User.findOne({ "lists": { "$regex": listId, "$options": "i" }})
    if(!user){
        throw new Error.NotFoundError("List not found.")
    }
    const oldLists = await User.findOne({_id:userId}).then((res) => res.lists);
    if(!oldLists) {
        throw new Error.NotFoundError("User not found");
    }
    for(let list of user.lists){
        if(list.split("-")[1] === listId){
            const userToJoin = await User.findOneAndUpdate({_id:userId},{lists: [...oldLists,list]},{new:true});
            return res.status(StatusCodes.OK).json({lists: userToJoin.lists});
        }
    }
    res.status(StatusCodes.NOT_FOUND).json({msg: 'List not found'});
    
}
const addListToUser = async (req,res) => {
    const userId = req.user.id;
    const {listId} = req.body
    if(!userId || !listId){
        throw new Error.BadRequestError("Provide User Id and List Id");
    }
    const user = await User.findOne({_id: userId});
    if(!user){
        throw new Error.NotFoundError("User not found");
    }
    const randomId = crypto.randomBytes(5).toString('hex');
    const newLists = [...user.lists,listId + "-" + randomId];
    user.lists = newLists;
    await user.save()
    res.status(StatusCodes.OK).json({lists: user.lists});
}
const deleteListFromUser = async (req,res) => {
    const userId = req.user.id;
    const {listId} = req.body
    if(!userId || !listId){
        throw new Error.BadRequestError("Provide User Id and List Id");
    }
    const user = await User.findOne({_id: userId});
    if(!user){
        throw new Error.NotFoundError("User not found");
    }
    const newLists = user.lists.filter((id) => listId !== id.split("-")[1]);
    user.lists = newLists;
    await user.save()
    res.status(StatusCodes.OK).json({lists: user.lists});
}
module.exports = {addListToUser,deleteListFromUser,getAllLists,joinList};