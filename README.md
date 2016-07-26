#General Assembly Santa Monica
--
#Project #4: Binjr
###A Community for TV Series reviews and disovery
--
![](public/images/game-of-thrones.jpg)

--
###Overview
--
This webapp was made in the interest of building a community where people could review TV series and recommend them for viewing. Viewers can also voice their opinions on the outcome of a show in full detail when they tag their review with a spoiler warning.

--
###How May I Join?
--

The site is hosted online [here](https://binjr.herokuapp.com/) through heroku. Create an account with secure login info and an encrypted password. Search for movies through our integrated third party API courtesy of OMBDapi.org.

--
###Installation Instructions
--
If you would like to install the app locally in order to test and improve the code, please follow these instructions:

* fork the repo from github and clone it into your local machine
* run `npm install` in bash while inside the app directory to install the dependencies
* add a .env file with `MONGOURL:mongodb://localhost/<databasename>` in order to create a local database for testing, and run `mongod`
* alternatively host the database on a website like mlab to have your data hosted online
* in bash run `npm run watch` in order to run watchify to bundle your code with babelify as you write
* in bash run `nodemon` to serve your data to localhost:3000 or a port of your choosing.
* open localhost:3000 in your web browser to view the app!

--
###Community Rules
--
* Always tag spoilers

--
###User Stories
--

* As a user, I want to be able to review a tv series that I loved (or hated)
* As a user, I want to be able to view other people's reviews so I discover new shows to watch
* As a user, I want to be able to search for tv shows and see more information about them before I write a review
* As a user, I want to be able to have a secure account and login

--
###Tech
--

* HTML
* CSS
* Materialize
* Javascript
* jQuery
* Express
* Passport
* ReactJS
* React-Router
* MongoDB

--
###Future Plans
--

* refactor code for more efficient routing and user authorization on navbar
* link reviews to movie object that contains more information or back to show page
* add descriptive messages as to why user creation or verification fails
* create page that shows information about a user
* give users the ability to see all reviews that a series has
* give more information about a series on the review index
* create user show page that has a list of all the reviews a user has done

--
###Known Bugs
--

* Side navbar does not work correctly with jquery since it is statebased.
* Delete button only works once, then after delete http request, app stops functioning...
