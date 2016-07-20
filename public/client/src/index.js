// this is the entry point for the front end...
// make sure `npm run watch` is running to track and bundle changes


var React = require('react')
var Router = require('react-router')
var ReactDOM = require('react-dom')
var Title = require('./modules/app')
var Fire = require('./modules/fire')
var Login = require('./modules/login')
var Tweet = require('./modules/tweet')
var routes = require('./modules/routes')
var { DefaultRoute, NotFoundRoute, Router, hashHistory, browserHistory, Route } = require('react-router')


ReactDOM.render(
    <Router history={hashHistory}>
      < Route path='/' component={Title} >
        < Route path='/fire' component={Fire} />
        < Route path='/login' component={Login} />
        < Route path='/tweet' component={Tweet} />
      </Route>
    </Router>,
  document.getElementById('app')
)
