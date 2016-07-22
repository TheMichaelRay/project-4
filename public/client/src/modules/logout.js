var React = require('react')

module.exports = React.createClass({
  componentWillMount: function(){
    $.ajax({
      url: '/users/logout',
      type: 'get',
      success: function(data) {

        this.props.history.push('/')
      }.bind(this)
    })
  },
  render: function() {
    return (
      <div/>
    )
  }
})
