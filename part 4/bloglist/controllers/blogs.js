const blogsRouter = require('express').Router()
const JsonWebToken  = require('jsonwebtoken')
const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')
const { SECRET }= require('../utils/config')

const findUserByToken = async (token) => {
  const decodedToken = JsonWebToken.verify(token, SECRET)
  if (!decodedToken) {
    return response.status(401).send({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)
  return user
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.status(201).json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  let { title, author, url, likes } = request.body
  const user =  request.user

  if (!likes) {
    likes = 0
  }

  if (!url || !title) {
    response.status(400).end()
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = [...user.blogs, savedBlog._id]
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const user = await findUserByToken(request.token)
  const blogUser = await Blog.findById(id)
  if ((user.id.toString() === blogUser.user.toString())) {
    await Blog.findByIdAndRemove(id)
    return response.status(204).end()
  }

  response.status(401).json({
    error: 'wrong user'
  })

})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const blog = {
    likes: request.body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
      new: true,
      runValidators: true,
      context: 'query'
    })

    response.json(updatedBlog)

  } catch (expection) {
    next(expection)
  }

})


module.exports = blogsRouter