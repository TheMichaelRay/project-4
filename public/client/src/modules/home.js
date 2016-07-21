var React = require('react');

var SeriesReviews = React.createClass({
  render: function() {
    var reviewNodes = this.props.data.map(function(review) {
      return (
        <li>
          <div className="collapsible-header">{review.title}</div>
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
// <ul className="collapsible" data-collapsible="accordion">
//   <li>
//     <div className="collapsible-header">First</div>
//     <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
//   </li>
//   <li>
//     <div className="collapsible-header">Second</div>
//     <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
//   </li>
//   <li>
//     <div className="collapsible-header">Third</div>
//     <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
//   </li>
// </ul>


module.exports = React.createClass({
  getInitialState: function() {
    return {
      reviewData: []
    }
  },

  componentWillMount: function() {
    $.ajax({
      url: '/tweets',
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
