const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (password === undefined || password.length < 3) {
        return response.status(400).json({error: 'password missing or less than 3 characters'})
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username, 
        name, 
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter