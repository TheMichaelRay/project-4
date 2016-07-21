var React = require('react')
var Nav = require('./nav')
var Signup = require('./signup')

module.exports = React.createClass({
  getInitialState: function() {
    return {
    }
  },
  componentWillMount: function() {
    this.getUser()
    // setInterval(this.getUser, 1000)
  },
  getUser: function() {
    $.ajax({
      url: '/users/profile',
      type: 'get',
      success: function(data) {
        this.setState({currentUser: data.user})
        console.log(data)
      }.bind(this)
    })
  },
  render: function() {
    $(".button-collapse").sideNav();
    // console.log(this.state)
    return (
      <div>
        < Nav data={this.state.currentUser}/>
        <div className="container" >
          { this.props.children }
        </div>
      </div>
    )
  }
})
