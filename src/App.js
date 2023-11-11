import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './Component/LoginForm'
import ProtectedRoute from './Component/ProtectedRoute'
import Home from './Component/Home'
import NotFound from './Component/NotFound'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)
export default App
