var React = require('react')

module.exports = React.createClass({
  test: function() {
    console.log("Testing")
    $.ajax({
      url: '/users',
      type: 'GET',
      success: function(data) {
        console.log(data)
      }
    })
  },
  render: function() {
    return (
      <div>
        <h1>Welcome to the Jungle!</h1>
        <button className="waves-effect waves-light btn" onClick={this.test}>Click!</button>
      </div>
    )
  }
})
