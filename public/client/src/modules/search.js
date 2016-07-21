var React = require('react')
var {Link} = require('react-router')

var SeriesList = React.createClass({
  render: function() {
    var seriesNodes = this.props.data.map(function(series) {
      return (
        <div className="card col m4" key={series.imdbID}>
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator responsive-img" src={series.Poster} />
          </div>
          <div className="card-content">
            <div className="card-title grey-text text-darken-4">{series.Title}</div>
            <Link className="btn waves-effect waves-light" to={"/review/" + series.imdbID + ""}>Review</Link>
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
  search: function() {
    var url = 'http://www.omdbapi.com/?s=' + (this.state.search) + '&&type=series'
    $.ajax({
      url: url,
      type: 'get',
      success: function(data) {
        this.setState({seriesData: data.Search})
      }.bind(this)
    })
  },
  render: function() {
    return (
      <div>
        <form className="col s12" onSubmit={this.search}>
          <div className="row">
            <div className="input-field col s12">
              <input id="search" type="text" value={this.state.search} onChange={this.searchFill} className="validate" />
              <label htmlFor="search">Search for Series</label>
            </div>
          </div>
        </form>
        < SeriesList data={this.state.seriesData} />
      </div>
    )
  }
})
