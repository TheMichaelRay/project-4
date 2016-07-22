var {Link} = require('react-router')
var React = require('react')

module.exports = React.createClass({
  getInitialState: function() {
    return {user: false}
  },
  loadUser: function() {
    $.ajax({
      url: '/users/profile',
      type: 'get',
      success: function(data) {
        this.setState({user: data})
      }.bind(this)
    })
  },
  componentDidMount: function() {
    this.loadUser
    // setInterval(this.loadUser, 1000)
  },
  render: function() {
    return (
      <nav className="blue">
        <div className="nav-wrapper deep-orange">
          <Link to="#!" className="brand-logo">Binjr</Link>
          <Link to="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></Link>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/search">Search</Link></li>
            <li>{this.props.data ? "Logged in as " + this.props.data.firstName : '' }</li>
            <li>{this.props.data ? <Link to="/logout">Logout</Link> : <Link to="/login">Sign In</Link> }</li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li><Link to="/search">Search</Link></li>
            <li>{this.props.data ? "Logged in as " + this.props.data.firstName : <Link to="/login">Sign In</Link>}</li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
})
