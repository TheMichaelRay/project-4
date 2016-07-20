var React = require('react')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      password: ''
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
    var email = this.state.email.trim();
    var password = this.state.password
    if (!email || !password ) {
      return;
    }
    console.log(this.state)
    $.ajax({
      url: '/users/login',
      type: 'POST',
      dataType: 'json',
      contentType: "application/json",
      data: this.state,
      success: function(data){
        console.log('receiving from db', data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
    this.setState({email: '', password: ''})
  },

  boomerang: function() {
    // console.log(this.state)
    $.ajax({
      url: '/users/testing',
      type: 'POST',
      data: this.state,
      success: function(data) {
        console.log(data)
      }
    })
  },

  render: function() {
    return (
      <div>
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
