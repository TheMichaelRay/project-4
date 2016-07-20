// var React = require('react')
// var render = require('react-dom').render
// var reactRouter = require('react-router'),
//   Router = reactRouter.Router,
//   browserHistory = reactRouter.browserHistory
// var routes = require('./modules/routes')
//
// render((
//   <Router routes={routes} history={browserHistory}/>
// ), document.getElementById('app'))

var React = require('react')
var Router = require('react-router')

var routes = require('./routes')

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  React.render(<Handler/>, document.getElementById('app'))
})
