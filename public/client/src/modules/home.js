var React = require('react');
var Nav = require('./nav');

var SeriesReviews = React.createClass({
  render: function() {
    var reviewNodes = this.props.data.map(function(review) {
      return (
        <li key={review._id} id={"list-" + review._id}>
          <div className="collapsible-header">
            {review.title} <small> by {review.author? review.author.firstName + ' ' + review.author.lastName : 'Unknown'}</small>
          </div>
          <div className="collapsible-body">
            <p>{review.body}</p>
            <hr/>
            <button id={review._id} className="btn waves-effect waves-light right-align delete-button collapsible">Delete</button>
          </div>
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
      url: '/users/profile',
      type: 'get',
      success: function(data) {
        if (data.success) {
          this.setState({currentUser: data.user})
          console.log(this.state)
        } else {
          console.log('redirecting....')
          // deprecated method
          this.props.history.push('/login')
        }
      }.bind(this)
    })
    $.ajax({
      url: '/reviews',
      type: 'get',
      success: function(data) {
        this.setState({
          reviewData: data
        })
        console.log(data)
        $('.delete-button').click(this.delete)
      }.bind(this)
    })
  },
  delete: function(e) {
    var url = '/reviews/' + e.target.id
    var $list = $('#list-' + e.target.id)
    $list.remove()
    $.ajax({
      url: url,
      type: 'delete',
      success: function(data) {
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
        <Nav data={this.state.currentUser}/>
        <div className="container">
          <div className="row">
            <div className="col s12 center">
              <h1>New TV Reviews</h1>
            </div>
          </div>
          <div className="row">
            <SeriesReviews data={this.state.reviewData}/>
          </div>
        </div>
      </div>
    )
  }
})
