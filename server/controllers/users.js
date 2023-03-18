const User = require('../models/user')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password is too short' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    surname: body.surname,
    bio: body.bio,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(u => u.toJSON()))
})


module.exports = usersRouter
