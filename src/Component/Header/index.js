import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'

const Header = props => {
  const onClickLogOut = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <>
      <nav>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
          />
        </Link>
        <button onClick={onClickLogOut} type="button">
          LogOut
        </button>
      </nav>
    </>
  )
}

export default withRouter(Header)
