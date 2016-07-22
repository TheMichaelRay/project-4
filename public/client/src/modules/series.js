var React = require('react')
var {Link} = require('react-router')
var Nav = require('./nav');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      series: {}
    }
  },
  componentWillMount: function() {
    var url = 'http://www.omdbapi.com/?i=' + (this.props.params.id) + '&&plot=full'
    $.ajax({
      url: '/users/profile',
      type: 'get',
      success: function(data) {
        if (data.success) {
          this.setState({currentUser: data.user})
          console.log(this.state)
          $.ajax({
            url: url,
            type: 'get',
            success: function(data) {
              this.setState({series: data})
            }.bind(this)
          })
        } else {
          console.log('redirecting....')
          // deprecated method
          this.props.history.push('/login')
        }
      }.bind(this)
    })
  },

  render: function() {
    return (
      <div>
        <Nav data={this.state.currentUser}/>
        <div className="container">
          <hr/>
          <div className="row">
            <div className="col m4">
             <img className="activator responsive-img" src={this.state.series.Poster} />
            </div>
            <div className="col m8">
              <h5><small>Title:</small> {this.state.series.Title} </h5>
              <h5><small>Genre:</small> {this.state.series.Genre} </h5>
              <h5><small>Year:</small> {this.state.series.Year} </h5>
              <h5><small>Seasons:</small> {this.state.series.totalSeasons} </h5>
              <h5><small>Plot:</small></h5>
              <hr/>
              <p className="flow-text">{this.state.series.Plot}</p>
            </div>
          </div>
          <hr/>
          <div className="row">
            <Link className="col m6 btn waves-effect waves-light" to="/search">  ⬅️ Back to Search </Link>
            <Link className="col m6 btn waves-effect waves-light" to={"/review/" + this.state.series.imdbID}>Review ➡️ </Link>
          </div>
        </div>
      </div>
    )
  }

})
