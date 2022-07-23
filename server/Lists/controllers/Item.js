const Item = require('../Models/Item')
const Error = require("../errors");
const {StatusCodes} = require("http-status-codes")
const cloudinary = require('cloudinary')
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

const uploadImage = async (req,res) => {
    const {image} = req.body;
    const uploadStr = 'data:image/png;base64,'+image.base64;
    
    if(!image){
        throw new Error.BadRequestError("Please provide an id and an image");
    }
    try{
        const uploadedResponse = await cloudinary.v2.uploader.upload(uploadStr,{timeout: 1000000});
        console.log(uploadImage)
        return res.status(StatusCodes.OK).json({url: uploadedResponse.url})
    }catch(err){
        throw new Error.CustomAPIError(`The was an error uploading the image ${err}`)
    }
    
}
module.exports = {getAllItems,getItem,uploadImage};