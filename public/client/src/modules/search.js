var React = require('react')
var {Link} = require('react-router')
var Nav = require('./nav');

var SeriesList = React.createClass({
  render: function() {
    var seriesNodes;
    if (!this.props.data) {
      return (
        <div className="card-panel hoverable center-align">
          <h4>Series not found...</h4>
        </div>
      )
    } else {
      seriesNodes = this.props.data.map(function(series) {
        // remove node if they dont have poster
        return (
          <div className="card hoverable col m4" key={series.imdbID}>
            <div className="card-image waves-effect waves-block waves-light">
              <Link to={"/series/" + series.imdbID}><img className="activator responsive-img" src={series.Poster} /></Link>
            </div>
            <div className="card-content center-align">
              <div className="card-title grey-text text-darken-4">{series.Title}</div>
              <Link className="btn waves-effect waves-light" to={"/review/" + series.imdbID}>Review</Link>
            </div>
          </div>
        )
      })
      return (
        <div className="seriesList row">
          {seriesNodes}
        </div>
      )
    }
  }
})

module.exports = React.createClass({
  getInitialState: function() {
    return {
      seriesData: [],
      search: ''
    }
  },
  searchFill: function(e) {
    this.setState({search: e.target.value})
  },
  search: function(e) {
    e.preventDefault()
    var url = 'http://www.omdbapi.com/?s=' + (this.state.search) + '&&type=series'
    $.ajax({
      url: url,
      type: 'get',
      success: function(data) {
        this.setState({seriesData: data.Search})
      }.bind(this)
    })
  },
  componentWillMount: function() {
    console.log('about to load page')
    $.ajax({
      url: '/users/profile',
      type: 'get',
      success: function(data) {
        if (data.success) {
          this.setState({currentUser: data.user})
          console.log(this.state)
        } else {
          console.log('redirecting....')
          this.props.history.push('/login')
        }
      }.bind(this)
    })
  },
  render: function() {
    return (
      <div>
        <Nav data={this.state.currentUser} />
        <div className="container">
          <form className="col s12" onSubmit={this.search}>
            <div className="row">
              <div className="input-field col s12">
                <input id="search" type="text" value={this.state.search} onChange={this.searchFill} className="validate" autoComplete="off"/>
                <label htmlFor="search">Search for Series</label>
              </div>
            </div>
          </form>
          < SeriesList data={this.state.seriesData} />
        </div>
      </div>
    )
  }
})
