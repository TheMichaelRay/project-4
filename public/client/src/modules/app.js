var React = require('react')
var Nav = require('./nav')
var Signup = require('./signup')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: false,
      message: 'hello'
    }
  },
  returnUser: function() {
    $.ajax({
      url: '/users/profile',
      type: 'get',
      success: function(data) {
        return data
      },
      error: function() {
        console.log(false)
      }
    })
  },
  componentWillMount: function() {
    this.setState({user: this.returnUser()})
  },
  render: function() {
    $(".button-collapse").sideNav();
    console.log(this.state)
    return (
      <div>
        < Nav />
        <div className="container" >
          { this.props.children }
        </div>
      </div>
    )
  }
})
