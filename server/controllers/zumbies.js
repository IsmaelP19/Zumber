const Zumby = require('../models/zumby')
const User = require('../models/user')
const zumbiesRouter = require('express').Router()

zumbiesRouter.post('/', async (request, response) => {
  const body = request.body

  //Check if user with id body.user exists
  const user = await User.findById(body.user)

  if (!user) {
    return response.status(400).json({ error: 'user does not exist' })
  } else if (body.content.length < 1) {
    return response.status(400).json({ error: 'content is too short' })
  } else if (body.content.length > 140) {
    return response.status(400).json({ error: 'content is too long' })
  } else if (!body.user) {
    return response.status(400).json({ error: 'user is required' })
  }

  const zumby = new Zumby({
    content: body.content,
    user: user._id,
  })

  const savedZumby = await zumby.save()
  user.zumbies = user.zumbies.concat(savedZumby._id)
  await user.save()
  response.status(201).json(savedZumby)
})

zumbiesRouter.get('/', async (request, response) => {
  const zumbies = await Zumby.find({})
  response.json(zumbies.map((u) => u.toJSON()))
})

zumbiesRouter.get('/:id', async (request, response) => {
  const zumby = await Zumby.findById(request.params.id)
  if (zumby) {
    response.json(zumby.toJSON())
  } else {
    response.status(404).end()
  }
})

zumbiesRouter.delete('/:id', async (request, response) => {
  const zumbyToDelete = await Zumby.findById(request.params.id)
  if (zumbyToDelete) {
    await zumbyToDelete.remove()
    response.status(204).end()
  } else {
    response.status(404).json({ error: 'zumby not found' })
  }
})

module.exports = zumbiesRouter
