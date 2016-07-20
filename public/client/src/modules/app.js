var React = require('react')
var {Link} = require('react-router')

//
// var Title = React.createClass({
//   render: function() {
//     return (
//       <div>
//         <h1>BANG</h1>
//       </div>
//     )
//   }
// })
//
// ReactDOM.render(
//   <Title />, document.getElementById('app')
// )

module.exports = React.createClass({
  render: function() {
    $(".button-collapse").sideNav();
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to="#!" className="brand-logo">Binjr</Link>
            <Link to="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></Link>
            <ul className="right hide-on-med-and-down">
              <li><Link to="/fire">Fire!</Link></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li><Link to="/fire">Fire!</Link></li>
            </ul>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
})
