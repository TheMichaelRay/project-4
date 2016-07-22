var React = require('react')
var {Link} = require('react-router')
var Nav = require('./nav');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      password: '',
      currentUser: ''
    }
  },
  email: function(e) {
    this.setState({email: e.target.value})
  },
  password: function(e) {
    this.setState({password: e.target.value})
  },
  submit: function(e) {
    e.preventDefault();
    var user = {}
    user["local.email"] = this.state.email.trim();
    user["local.password"] = this.state.password;
    if (!user["local.email"] || !user["local.password"] ) {
      return;
    }
    console.log(user)
    $.ajax({
      url: '/users/login',
      type: 'POST',
      data: user,
      success: function(data){
        this.props.history.push('/')
      }.bind(this),
      error: function() {
        this.setState({message: "Incorrect username or password"});
        console.log(this.state.message)
      }.bind(this)
    })
  },

  render: function() {
    return (
      <div>
        <Nav data={this.state.currentUser}/>
        <div className="container">
          <form className="col s12" onSubmit={this.submit}>
              <div className="input-field col s12">
                <input id="email" type="email" className="validate" value={this.state.email} onChange={this.email}/>
                <label htmlFor="email">*Email</label>
              </div>
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" value={this.state.password} onChange={this.password}/>
                <label htmlFor="password">*Password</label>
              </div>
              <button className="btn waves-effect waves-light" type="submit">
                Log In
              </button>
              <Link className="btn waves-effect waves-light" to="/signup">
                Sign Up
              </Link>
          </form>
        </div>
      </div>
    )
  }
})
