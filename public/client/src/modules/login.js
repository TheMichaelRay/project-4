var React = require('react')

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
    // user.local = {}
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
        console.log('logging in user', data)
        this.setState({currentUser: data, email: '', password: ''})
        console.log(this.state)
      }.bind(this),
      error: function() {
        this.setState({message: "Incorrect username or password"});
        console.log(this.state.message)
      }.bind(this)
    })
    // this.setState({})
  },

  // boomerang: function() {
  //   console.log(this.props.data);
  // },

  render: function() {
    return (
      <div data="dataaaa">
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
              Submit
            </button>
            <button className="btn waves-effect waves-light" type="button" onClick={this.boomerang}>
              Test
            </button>
        </form>
      </div>
    )
  }
})
