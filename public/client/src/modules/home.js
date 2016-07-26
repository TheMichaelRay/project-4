var React = require('react');
var Nav = require('./nav');

var SeriesReviews = React.createClass({
  render: function() {
    var reviewNodes = this.props.data.map(function(review) {
      return (
        <li key={review._id} id={"list-" + review._id}>
          <div className={review.spoilers ? "red lighten-3 collapsible-header" : "green lighten-3 collapsible-header"}>
            {review.title} <small> by {review.author? review.author.firstName + ' ' + review.author.lastName : 'Unknown'}</small>
          </div>
          <div className={review.spoilers ? "red lighten-4 collapsible-body" : "green lighten-4 collapsible-body"} >
            <p>{review.body}</p>
            <hr/>
            { this.props.user._id == review.author._id ? <button id={review._id} className="btn waves-effect waves-light right-align delete-button collapsible">Delete</button> : ''}
          </div>
        </li>
      )
    }.bind(this))
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
        } else {
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
        $('.delete-button').click(this.delete)
      }.bind(this)
    })
  },
  delete: function(e) {
    console.log(e.target)
    // var url = '/reviews/' + e.target.id
    // var $list = $('#list-' + e.target.id)
    // $list.remove()
    // $.ajax({
    //   url: url,
    //   type: 'delete',
    //   success: function(data) {
    //     console.log(data)
    //   }.bind(this)
    // })
  },
  render: function() {
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    return (
      <div>
        <Nav data={this.state.currentUser}/>
        <div className="cyan valign-wrapper center-align">
          <div className="row center">
            <h2 className="header col s12 light center-align white-text">See what others are saying about your favorite shows or discover new ones!</h2>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <SeriesReviews user={this.state.currentUser} data={this.state.reviewData}/>
          </div>
        </div>
      </div>
    )
  }
})
