const jwt = require("jsonwebtoken");
const Item = require('../Models/Item');
const verifyJWT = require("../utils/verifyJWT");
const createItem = async (req) => {
    if(!req || !req.token){
        return {msg: "Bad Request"};
    }
    const isTokenValid = verifyJWT(req.token);
    if(!isTokenValid){
        return {msg: "Invalid token"};
    }
    const userId = jwt.decode(req.token).id;
    req.user = userId;
    const item = await Item.create({...req,user:userId});
    return item;
}

const deleteItem = async (req) => {
    if(!req || !req.token){
        return {msg: "Bad Request"};
    }
    console.log(req)
    const isTokenValid = verifyJWT(req.token);
    if(!isTokenValid){
        return {msg: "Invalid token"};
    }
    const userId = jwt.decode(req.token).id;
    
    const item = await Item.findOneAndDelete({_id: req.itemId});
    if(!item || userId !== item.user.toString()){
        return {msg: "Item not found"}
    }
    return {msg: "Success"};
}

const updateItem = async () => {
    const item = await Item.findOneAndUpdate({id});
    return item;
}

module.exports = {createItem, deleteItem, updateItem}