var React = require('react')

var SeriesList = React.createClass({
  render: function() {
    var seriesNodes = this.props.data.map(function(series) {
      return (
        <h1 key={series.imdbID}>
          {series.Title}
        </h1>
      )
    })
    return (
      <div className="seriesList">
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
        <div className="row">
          <div className="input-field col s8">
            <input id="search" type="text" value={this.state.search} onChange={this.searchFill} className="validate" />
            <label htmlFor="search">Search for Series</label>
          </div>
          <div className="col s4">
            <button className="btn waves-effect waves-light" onClick={this.search}>Search</button>
          </div>
        </div>
        < SeriesList data={this.state.seriesData} />
      </div>
    )
  }
})
