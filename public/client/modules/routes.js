var React = require('react')
var {DefaultRoute, NotFoundRoute, Route} = require('react-router')
var Test = require('./app')

module.exports = (
  <Route path="/" component={Test} />
)
