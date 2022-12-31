import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, handleUsername, handlePassword }) => (
  <div>
    <h2>Log into Application</h2>
    <form onSubmit={handleLogin}>
      <div>username
        <input type='text' value={username} name='Username' onChange={handleUsername}/>
      </div>
      <div>
          password
        <input type='password' value={password} name='Password' onChange={handlePassword}/>
      </div>
      <button type='submit'>login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired

}
export default LoginForm