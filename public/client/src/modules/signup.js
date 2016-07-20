var React = require('react')
var { browserHistory } = require('react-router')

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
    var firstName = this.state.firstName.trim();
    var lastName = this.state.lastName.trim();
    var email = this.state.email.trim();
    var age = Number(this.state.age);
    var password = this.state.password
    var avatar = this.state.avatar.trim()
    var bio = this.state.bio.trim()
    if (!firstName || !lastName || !email || age < 18 || !Number(age) || !password ) {
      return;
    }
    var local = {
      email: email,
      password: password
    }
    var newUser = {
      local: local,
      firstName: firstName,
      lastName: lastName,
      age: age,
      avatar: avatar,
      bio: bio
    };
    console.log(newUser)
    $.ajax({
      url: '/users/testing',
      type: 'post',
      contentType: "application/json",
      dataType: 'json',
      data: newUser,
      success: function(data){
        console.log('receiving from db', data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
    this.setState({firstName: '', lastName: '', email: '', age: '', password: '', avatar: '', bio: ''})
  },
  test: function() {
    $.ajax({
      url: '/users',
      type: 'get',
      success: function(data) {
        console.log(data)
      },
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  render: function() {
    return (
      <div>
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
              Submit
            </button>
            <button className="btn waves-effect waves-light" type="button" onClick={this.test}>
              Testing
            </button>
        </form>
      </div>
    )
  }
})
