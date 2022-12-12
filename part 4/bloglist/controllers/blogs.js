const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(201).json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blogBody = request.body

  if (!blogBody.likes) {
    blogBody.likes = 0
  }

  if (!blogBody.url || !blogBody.title) {
    response.status(400).end()
  }


  const blog = new Blog(request.body)

  try {
    const savedBlog = await blog.save()
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