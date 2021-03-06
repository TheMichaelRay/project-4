// this is the entry point for the front end...
// make sure `npm run watch` is running to track and bundle changes


var React = require('react')
var Router = require('react-router')
var ReactDOM = require('react-dom')
var Title = require('./modules/app')
var Login = require('./modules/login')
var Review = require('./modules/review')
var routes = require('./modules/routes')
var Signup = require('./modules/signup')
var Search = require('./modules/search')
var Home = require('./modules/home')
var Series = require('./modules/series')
var Logout = require('./modules/logout')
var { DefaultRoute, NotFoundRoute, Router, hashHistory, browserHistory, Route, IndexRoute } = require('react-router')



ReactDOM.render(
    <Router history={hashHistory}>
      < Route path='/' component={Title} >
        < IndexRoute component={Home} />
        < Route path='/signup' component={Signup} />
        < Route path='/search' component={Search} />
        < Route path='/review/:id' component={Review} />
        < Route path='/series/:id' component={Series} />
        < Route path='/login' component={Login} />
        < Route path='/logout' component={Logout} />
      </Route>
    </Router>,
  document.getElementById('app')
)
