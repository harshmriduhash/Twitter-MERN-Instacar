import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Home from './Components/Home'
import LandingPage from './Components/LandingPage'
import Profile from './Components/Profile'
import ShowAllUsers from './Components/ShowAllUsers'
import ViewUsers from './Components/ViewUsers'
import ShowSearchUser from './Components/SearchUsers'
import Followers from './Components/Followers'
import Followings from './Components/Followings'
import Tweets from './Components/Tweets'
import UserTweets from './Components/UserTweets'
// import ReplyTweets from './Components/ReplyTweets'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tokenId: localStorage.getItem("token"),
    }
  }
  render() {
    let token = this.state.tokenId
    return (
      <div>
        <Router>
          <Route path="/login" exact render={(props) => { return <Login {...props} /> }} />
          <Route path="/signup" exact render={(props) => { return <SignUp {...props} /> }} />
          <Route path="/allUser" exact render={(props) => token ? (<ShowAllUsers {...props} />) : (<Redirect to='/login' />)} />
          <Route path="/myFollowers" exact render={(props) => token ? (<Followers {...props} />) : (<Redirect to='/login' />)} />
          <Route path="/myFollowings" exact render={(props) => token ? (<Followings {...props} />) : (<Redirect to='/login' />)} />
          <Route path="/tweets" exact render={(props) => token ? (<Tweets {...props} />) : (<Redirect to='login' />)} />
          <Route path="/search_name/:name" exact render={(props) => token ? (<ShowSearchUser {...props} />) : (<Redirect to='login' />)} />
          {/* <Route path="/tweetReply/:tweet_id" exact render={(props) => token ? (<ReplyTweets {...props} />) : (<Redirect to='login' />)} /> */}
          <Route path="/userTweets" exact render={(props) => token ? (<UserTweets {...props} />) : (<Redirect to='/login' />)} />
          <Route path="/home" exact render={(props) => token ? (<Home {...props} />) : (<Redirect to='/login' />)} />
          <Route path="/myProfile" exact render={(props) => token ? (<Profile {...props} />) : (<Redirect to='/login' />)} />
          <Route path="/viewUserProfile/:user_id" exact render={(props) => token ? (<ViewUsers {...props} />) : (<Redirect to='/login' />)} />
          <Route path="/" exact render={(props) => { return <LandingPage {...props} /> }} />
        </Router>
      </div>
    )
  }
}


export default App;

