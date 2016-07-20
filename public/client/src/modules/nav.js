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
    // setInterval(this.loadUser, 4000)
  },
  render: function() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="#!" className="brand-logo">Binjr</Link>
          <Link to="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></Link>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/fire">Fire!</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/tweet">Tweet!</Link></li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li><Link to="/fire">Fire!</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
})
