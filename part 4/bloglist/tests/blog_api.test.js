const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDB } = require('./blog_api_helper')
const api = supertest(app)


beforeEach( async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)

})

describe('when there is initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(201)
      .expect('Content-Type', /application\/json/)
  }, 100000)


  test('check if blog id is defined', async () => {
    const blogInDB = await blogsInDB()
    for (const blog of blogInDB) {
      expect(blog.id).toBeDefined()
    }
  })
})


describe('addition of a new blog', () => {

  test('succeeds wtih valid data', async () => {
    const newBlog = {
      title: 'Sample Blog',
      author: 'Ebrahim A. Haji',
      url: 'http://google.com',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDB()
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('Sample Blog')
  })

  test('return statuscode 201 if likes property is undefined and set to default value of 0', async () => {
    const newBlog = {
      title: 'Sample Blog',
      author: 'Ebrahim A. Haji',
      url: 'http://google.com',
    }


    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDB()
    expect(blogsAtEnd[ blogsAtEnd.length - 1 ].likes).toBe(0)

  })

  test('return statuscode 400 if the url or title property is missing', async () => {
    const newBlogNoTitle = {
      url: 'http://google.com',
      author: 'Ebrahim A. Haji'
    }

    const newBlogNoUrl = {
      title: 'Sample Blog',
      author: 'Ebrahim A. Haji'
    }
    await api
      .post('/api/blogs')
      .send(newBlogNoTitle)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(newBlogNoUrl)
      .expect(400)

  })
})

describe('updating a blog', () => {
  test('return statuscode 200 if updating succeeds', async () => {
    const blogsAtStart = await blogsInDB()
    let updateBlog = blogsAtStart[0]

    updateBlog = { ...updateBlog, likes: 20 }

    const returnedBlog = await api
      .put(`/api/blogs/${updateBlog.id}`)
      .send(updateBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedUpdateBlog = JSON.parse(JSON.stringify(updateBlog))

    expect(returnedBlog.body.id).toBe(processedUpdateBlog.id)
    expect(returnedBlog.body.likes).toBe(20)
  })
})

describe('deletion of a blog', () => {
  test('return statusCode 204 if deletion successful', async () => {
    const blogAtStart = await blogsInDB()
    const deleteBlog = blogAtStart[0]

    await api
      .delete(`/api/blogs/${deleteBlog.id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDB()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(deleteBlog.title)

  })
})


afterAll(() => {
  mongoose.connection.close()
})
