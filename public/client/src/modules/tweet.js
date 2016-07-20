var React = require('react')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      body: '',
      title: ''
    }
  },
  body: function(e) {
    this.setState({body: e.target.value})
  },
  title: function(e) {
    this.setState({title: e.target.value})
  },
  submit: function(e) {
    e.preventDefault()
    var body = this.state.body;
    var title = this.state.title;
    var newTweet = {
      body: body,
      title: title
    }
    // console.log(newTweet);
    $.post({
      url: '/tweets',
      type: 'POST',
      data: newTweet,
      success: function(data) {
        console.log(data)
      }
    })
    this.setState({title: '', body: ''})
  },
  render: function() {
    return (
      <div>
        <h1>Make a Tweet!</h1>
        <form className="col s12" onSubmit={this.submit}>
            <div className="input-field col s12">
              <textarea id="title" className="materialize-textarea" value={this.state.title} onChange={this.title}/>
              <label htmlFor="title">*Title</label>
            </div>
            <div className="input-field col s12">
              <input id="body" type="text" className="validate" value={this.state.body} onChange={this.body}/>
              <label htmlFor="body">*Body</label>
            </div>
            <button className="btn waves-effect waves-light" type="submit">
              Submit
            </button>
        </form>
      </div>
    )
  }
})
