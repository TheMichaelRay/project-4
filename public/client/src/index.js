var React = require('react')
var Router = require('react-router')
var ReactDOM = require('react-dom')
var Title = require('./modules/app')
var Fire = require('./modules/fire')
var routes = require('./modules/routes')
var { DefaultRoute, NotFoundRoute, Router, hashHistory, Route } = require('react-router')


ReactDOM.render(
    <Router history={hashHistory}>
      < Route path='/' component={Title} >
        < Route path='/fire' component={Fire} />
      </Route>
    </Router>,
  document.getElementById('app')
)
