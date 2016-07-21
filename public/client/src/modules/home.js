var React = require('react');

var SeriesReviews = React.createClass({
  render: function() {
    var reviewNodes = this.props.data.map(function(review) {
      return (
        <li key={review._id}>
          <div className="collapsible-header">{review.title} <small> by {review.author || 'Unknown'}</small></div>
          <div className="collapsible-body"><p>{review.body}</p></div>
        </li>
      )
    })
    return (
      <ul className="collapsible" data-collapsible="accordion">
        {reviewNodes}
      </ul>
    )
  }
})


module.exports = React.createClass({
  getInitialState: function() {
    return {
      reviewData: []
    }
  },

  componentWillMount: function() {
    $.ajax({
      url: '/reviews',
      type: 'get',
      success: function(data) {
        this.setState({
          reviewData: data
        })
        console.log(data)
      }.bind(this)
    })
  },

  render: function() {
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    return (
      <div>
        <div className="row">
          <div className="col s12 center">
            <h1>New TV Reviews</h1>
          </div>
        </div>
        <div className="row">
          <SeriesReviews data={this.state.reviewData}/>
        </div>
      </div>
    )
  }
})
