import { useState } from 'react'
const BlogForm = ({  handleForm }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogToBe = (event) => {
    event.preventDefault()
    handleForm({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={blogToBe}>
                title{'    '}
        <input className='title' type='text' value={title} name='title'
          onChange={(event) => setTitle(event.target.value)}
        /><br/>
                author{'    '}
        <input className='author' type='text' value={author} name='author'
          onChange={(event) => setAuthor(event.target.value)}
        /><br/>
                url{'    '}
        <input className='url' type='text' value={url} name='url'
          onChange={(event) => setUrl(event.target.value)}
        /><br/><br/>
        <button id='blogSubmit' type="submit">Submit Blog</button>
      </form>
    </div>
  )
}

export default BlogForm