const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        minlength: 3,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },
    verified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: {
        type: String,
        default: ''
    },
    passwordResetToken: {
        type:String,
        default:''
    },
    expireDatePasswordToken: {
        type: Date,
    },
    lists: {
        type: [String]
    }

}, {timestamps: true})

userSchema.pre('save', function(){
    if(!this.isModified('password')) return;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
})




userSchema.method("createJWT",function(){
    const token = jwt.sign({name:this.username,id:this._id}, process.env.JWT_SECRET);
    return token;
})

userSchema.method("comparePasswords",async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
})
module.exports = mongoose.model('User', userSchema);