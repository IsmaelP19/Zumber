const User = require('../models/user')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!body.email) {
    return response.status(400).json({ error: 'User validation failed: email: Path `email` is required.' })
  }
  else if (!emailRegex.test(body.email)) {
    return response.status(400).json({ error: 'invalid email' })
  } else if (body.username.length < 3) {
    return response.status(400).json({ error: 'username is too short' })
  } else if (body.password.length < 3) {
    return response.status(400).json({ error: 'password is too short' })
  } 

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    surname: body.surname,
    bio: body.bio,
    email: body.email,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(u => u.toJSON()))
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})


module.exports = usersRouter
