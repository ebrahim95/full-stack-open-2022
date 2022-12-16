const blogsRouter = require('express').Router()
const JsonWebToken  = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.status(201).json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  let { title, author, url, likes } = request.body
  const token = getTokenFrom(request)
  // eslint-disable-next-line no-undef
  const decodedToken = JsonWebToken.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(decodedToken.id)

  if (!likes) {
    likes = 0
  }

  if (!url || !title) {
    response.status(400).end()
  }

  console.log(user)

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  try {

    const savedBlog = await blog.save()
    user.blogs = [...user.blogs, savedBlog._id]
    await user.save()
    response.status(201).json(savedBlog)

  } catch (expection) {
    next(expection)
  }

})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id

  try {

    await Blog.findByIdAndRemove(id)
    response.status(204).end()

  } catch (expection) {
    next(expection)
  }
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