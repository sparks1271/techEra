import {Component} from 'react'
import Cookies from 'js-cookie'

class LoginForm extends Component {
  state = {username: '', pin: '', errorMsg: '', showSubmitError: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, pin} = this.state
    const userCredentials = {username, pin}
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      data: JSON.stringify(userCredentials),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div>
        <label htmlFor="username">User Id</label>
        <input
          type="username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPin = () => {
    const {pin} = this.state
    return (
      <div>
        <label htmlFor="pin">PIN</label>
        <input type="password" value={pin} onChange={this.onChangePin} />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    return (
      <div>
        <div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
            />
          </div>
          <form onSubmit={this.onSubmitForm}>
            <h1>Welcome Back!</h1>
            <div>{this.renderUsername()}</div>
            <div>{this.renderPin()}</div>
            <button type="submit">Login</button>
            {showSubmitError && <p>{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
