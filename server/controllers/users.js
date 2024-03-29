const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Zumby = require('../models/zumby')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;

  if (!body.email) {
    return response.status(400).json({ error: 'User validation failed: email: Path `email` is required.' })
  } else if (!emailRegex.test(body.email)) {
    return response.status(400).json({ error: 'invalid email' })
  } else if (body.username.length < 3) {
    return response.status(400).json({ error: 'username is too short' })
  } else if (body.password.length < 8) {
    return response.status(400).json({ error: 'password is too short' })
  } else if (!passwordRegex.test(body.password)) {
    return response
      .status(400)
      .json({
        error:
          "password has contains at least one uppercase letter, one lowercase letter, one number and one special character",
      });
  } else if (body.bio.length > 240) {
    return response.status(400).json({ error: "bio is too long" });
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    surname: body.surname,
    bio: body.bio,
    email: body.email,
    image: body.image,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('zumbies', { content: 1, date: 1, comments: 1, likes: 1 })
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

usersRouter.get('/username/:username', async (request, response) => {
  const user = await User.findOne({ username: request.params.username })
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

usersRouter.get('/:username/zumbies', async (request, response) => {
  const user = await User.findOne({ username: request.params.username })
  if (user) {
    const zumbies = await Zumby.find({ user: user._id }).populate('user', { username: 1, name: 1, surname: 1, image: 1 }).sort({ date: -1 })
    response.json(zumbies)
  } else {
    response.status(404).end()
  }
})

usersRouter.get('/:username/saved', async (request, response) => {
  const user = await User.findOne({ username: request.params.username })
  if (user) {
    const zumbies = await Zumby.find({ _id: { $in: user.likes } }).populate('user', { username: 1, name: 1, surname: 1, image: 1 }).sort({ date: -1 })
    response.json(zumbies)
  } else {
    response.status(404).end()
  }
})

usersRouter.get('/:username/following', async (request, response) => {
  const user = await User.findOne({ username: request.params.username })
  if (user) {
    let zumbies = []
    const following = user.following
    for (const user of following) {
      const followedUser = await User.findById(user).populate('zumbies', { content: 1, date: 1, comments: 1, likes: 1 })
      const zumbiesFromUser = await Zumby.find({ user: followedUser.id }).populate('user', { username: 1, name: 1, surname: 1, image: 1 })
      zumbies = zumbies.concat(zumbiesFromUser)
    }
    zumbies.sort((a, b) => b.date - a.date)
    response.json(zumbies)
  } else {
    response.status(404).end()
  }
})

usersRouter.delete('/:id', async (request, response) => {
  const userToDelete = await User.findById(request.params.id)
  if (userToDelete) {
    let zumbiesToDelete = await Zumby.find({ user: userToDelete._id })
    zumbiesToDelete.forEach(async (zumby) => {
      await zumby.remove()
    })
    await userToDelete.remove()
    response.status(204).end()
  } else {
    response.status(404).json({ error: 'user not found' })
  }
})

usersRouter.put('/:id', async (request, response) => {
  const body = request.body

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;

  if (!body.email) {
    return response
      .status(400)
      .json({
        error: "User validation failed: email: Path `email` is required.",
      });
  } else if (!emailRegex.test(body.email)) {
    return response.status(400).json({ error: "invalid email" });
  } else if (body.username.length < 3) {
    return response.status(400).json({ error: "username is too short" });
  } else if (body.password && body.password.length < 8) {
    return response.status(400).json({ error: "password is too short" });
  } else if (body.password && !passwordRegex.test(body.password)) {
    return response.status(400).json({
      error:
        "password has contains at least one uppercase letter, one lowercase letter, one number and one special character",
    });
  } else if (body.bio.length > 240) {
    return response.status(400).json({ error: "bio is too long" });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const userToUpdate = await User.findById(request.params.id)

  if (userToUpdate) {
    const saltRounds = 10
    let passwordHash = userToUpdate.passwordHash
    if (body.password) {
      passwordHash = await bcrypt.hash(body.password, saltRounds)
    }

    let user = {
      username: body.username,
      name: body.name,
      surname: body.surname,
      bio: body.bio,
      email: body.email,
      image: body.image,
      likes: body.likes,
      followers: body.followers,
      following: body.following,
      zumbies: body.zumbies,
      passwordHash: passwordHash
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: request.params.id },
      user,
      { new: true, runValidators: true, context: 'query' }
    );
    response.json(updatedUser)
  } else {
    response.status(404).json({ error: 'user not found' })
  }

})

module.exports = usersRouter
