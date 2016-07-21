var React = require('react')
var Nav = require('./nav')
var Signup = require('./signup')

module.exports = React.createClass({
  getInitialState: function() {
    return {
    }
  },
  componentWillMount: function() {
    console.log('about to load page')
    $.ajax({
      url: '/users/profile',
      type: 'get',
      success: function(data) {
        if (data.success) {
          this.setState({currentUser: data.user})
          console.log(this.state)
        } else {
          console.log('redirecting....')
          this.props.history.push('/login')
        }
      }.bind(this)
    })
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
