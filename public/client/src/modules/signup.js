var React = require('react')
var {Link} = require('react-router')
var Nav = require('./nav');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      avatar: '',
      bio: '',
      age: ''
    }
  },
  firstName: function(e) {
    this.setState({firstName: e.target.value})
  },
  lastName: function(e) {
    this.setState({lastName: e.target.value})
  },
  email: function(e) {
    this.setState({email: e.target.value})
  },
  password: function(e) {
    this.setState({password: e.target.value})
  },
  avatar: function(e) {
    this.setState({avatar: e.target.value})
  },
  bio: function(e) {
    this.setState({bio: e.target.value})
  },
  age: function(e) {
    this.setState({age: e.target.value})
  },
  submit: function(e) {
    e.preventDefault();
    var newUser = {};
    newUser["local.email"] = this.state.email.trim();
    newUser["local.password"] = this.state.password;
    newUser["age"] = Number(this.state.age);
    newUser["firstName"] = this.state.firstName.trim();
    newUser["lastName"] = this.state.lastName.trim();
    newUser["bio"] = this.state.bio.trim();
    newUser["avatar"] = this.state.avatar.trim();
    if (!newUser["firstName"] || !newUser["lastName"] || !newUser["local.email"] || newUser["age"] < 18 || !Number(newUser["age"]) || !newUser["local.password"] ) {
      console.log('inside the if');
      return;
    }
    console.log(newUser, "trying to be created")
    $.post({
      url: '/users/signup',
      // contentType: "application/json",
      // dataType: "json",
      // data: JSON.stringify(newUser),
      data: newUser,
      success: function(data){
        this.props.history.push('/')
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
    this.setState({firstName: '', lastName: '', email: '', age: '', password: '', avatar: '', bio: ''})
  },
  render: function() {
    return (
      <div>
        <Nav data={this.state.currentUser}/>
        <div className="container">
          <form className="col s12" onSubmit={this.submit}>
              <div className="input-field col s12">
                <input id="firstName" type="text" className="validate" value={this.state.firstName} onChange={this.firstName}/>
                <label htmlFor="firstName">*First Name</label>
              </div>
              <div className="input-field col s12">
                <input id="lastName" type="text" className="validate" value={this.state.lastName} onChange={this.lastName}/>
                <label htmlFor="lastName">*Last Name</label>
              </div>
              <div className="input-field col s12">
                <input id="email" type="email" className="validate" value={this.state.email} onChange={this.email}/>
                <label htmlFor="email">*Email</label>
              </div>
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" value={this.state.password} onChange={this.password}/>
                <label htmlFor="password">*Password</label>
              </div>
              <div className="input-field col s12">
                <input id="avatar" type="text" className="validate" value={this.state.avatar} onChange={this.avatar}/>
                <label htmlFor="avatar">Avatar</label>
              </div>
              <div className="input-field col s12">
                <textarea id="bio" className="materialize-textarea" value={this.state.bio} onChange={this.bio}/>
                <label htmlFor="bio">Bio</label>
              </div>
              <div className="input-field col s12">
                <input id="age" type="text" className="validate" value={this.state.age} onChange={this.age}/>
                <label htmlFor="age">*Age</label>
              </div>
              <button className="btn waves-effect waves-light" type="submit">
                Sign Up
              </button>
              <Link className="btn waves-effect waves-light" to="/login">
                Log In
              </Link>
          </form>
        </div>
      </div>
    )
  }
})
