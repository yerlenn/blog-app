const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        unique: true,
        minlength: 3
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
        delete returnedObj.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User