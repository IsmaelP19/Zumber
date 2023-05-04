const jwt = require('jsonwebtoken')
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
  const zumbies = await Zumby.find({}).populate('user', { username: 1, name: 1, image: 1 })
  response.json(zumbies.map((u) => u.toJSON()))
})

zumbiesRouter.get('/:id', async (request, response) => {
  const zumby = await Zumby.findById(request.params.id)
    .populate('user', {username: 1,  name: 1, image: 1 })
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
        select: { username: 1, name: 1, image: 1 }
      }
    })

  if (zumby) {
    response.json(zumby.toJSON())
  } else {
    response.status(404).end()
  }
})

zumbiesRouter.delete('/:id', async (request, response) => { 

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const zumbyToDelete = await Zumby.findById(request.params.id)
  if(zumbyToDelete) {
    if (zumbyToDelete.user.toString() === decodedToken.id.toString()) {
      const usersThatLiked = await User.find({ likes: zumbyToDelete._id })
      usersThatLiked.forEach(async (user) => {
        user.likes = user.likes.filter(z => z.toString() !== zumbyToDelete._id.toString())
        await user.save()
      })
      const userToDeleteZumby = await User.findById(zumbyToDelete.user)
      userToDeleteZumby.zumbies = userToDeleteZumby.zumbies.filter(z => z.toString() !== zumbyToDelete._id.toString())
      await userToDeleteZumby.save()
      await zumbyToDelete.remove()
      response.status(204).end()
      
    } else {
      response.status(401).json({ error: 'unauthorized' })
    }
  } else {
    response.status(404).json({ error: 'zumby not found' })
  }
})

zumbiesRouter.put('/:id', async (request, response) => {
  const body = request.body

  if (body.content.length < 1) {
    return response.status(400).json({ error: 'content is too short' })
  } else if (body.content.length > 140) {
    return response.status(400).json({ error: 'content is too long' })
  }

  const zumbyToUpdate = await Zumby.findById(request.params.id)

  if (zumbyToUpdate) {

    const zumby = {
      likes: body.likes || zumbyToUpdate.likes,
      comments: body.comments || zumbyToUpdate.comments,
    }

    const updatedZumby = await Zumby.findByIdAndUpdate(request.params.id, zumby, { new: true })
    response.json(updatedZumby)
  } else {
    response.status(404).json({ error: 'zumby not found' })
  }
})


module.exports = zumbiesRouter
