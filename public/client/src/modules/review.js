var React = require('react')
var Nav = require('./nav');

// var Seasons = React.createClass ({
//   render: function() {
//     var seasons = [];
//     for (i=0; i < this.props.data ; i++) {
//       seasons.push(i +1)
//     }
//     seasonsNodes = seasons.map(function(s) {
//       return (
//         <option key={s} value={s}>
//           Season {s}
//         </option>
//       )
//     })
//     console.log(seasonsNodes)
//     return (
//       <div className="input-field col s6">
//           <select>
//             <option value="" disabled selected>Choose Season</option>
//             {seasonsNodes}
//           </select>
//           <label>Pick a Season (optional)</label>
//       </div>
//     )
//   }
// })

module.exports = React.createClass({
  getInitialState: function() {
    return {
      spoilers: false,
      body: '',
      title: '',
      series: {}
    }
  },
  body: function(e) {
    this.setState({body: e.target.value})
  },
  title: function(e) {
    this.setState({title: e.target.value})
  },
  spoiler: function(e) {
    this.setState({spoilers: !this.state.spoilers})
  },
  submit: function(e) {
    e.preventDefault()
    var newReview = {}
    newReview["author"]= this.state.currentUser._id
    newReview["body"] = this.state.body;
    newReview["title"] = this.state.series.Title;
    newReview["spoilers"] = this.state.spoilers;
    $.post({
      url: '/reviews',
      type: 'POST',
      data: newReview,
      success: function(data) {
        console.log(data)
        this.props.history.push('/')
      }.bind(this)
    })
  },
  componentWillMount: function() {
    var url = 'http://www.omdbapi.com/?i=' + (this.props.params.id)
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
  componentDidMount: function() {
    $(document).ready(function() {
      $('select').material_select();
    });
  },
  test: function() {
    var newReview = {}
    newReview["author"]= this.state.currentUser
    newReview["body"] = this.state.body;
    newReview["title"] = this.state.series.Title;
    newReview["spoiler"] = this.state.spoilers
    // console.log('heres the review->', newReview)
    // console.log('this is the state->', this.state)
  },
  render: function() {
    return (
      <div>
        <Nav data={this.state.currentUser}/>
        <div className="container">
          <div className="col s12 center-align">
            <h1>Review {this.state.series.Title}</h1>
          </div>
          <div className="row">
            <form className="col s12" onSubmit={this.submit}>
                <div className="input-field col s12">
                  <input id="body" type="text" className="validate" value={this.state.body} onChange={this.body}/>
                  <label htmlFor="body">*Body</label>
                </div>
                <div className="switch">
                  <label>
                    No Spoilers
                    <input type="checkbox" onChange={this.spoiler} />
                    <span className="lever"></span>
                    Spoilers
                  </label>
                </div>
                <button className="btn waves-effect waves-light" type="submit">
                  Submit
                </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
})
