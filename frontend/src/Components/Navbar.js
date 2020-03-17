import React, { Component } from 'react'
import { BrowserRouter, Link } from "react-router-dom";
import axios from 'axios'
class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tokenId: localStorage.getItem("token"),
      userDetails: []
    }
  }
  componentDidMount = (e) => {
    axios.get("http://127.0.0.1:5000/get-user", {
      headers: {
        Authorization: "Bearer " + this.state.tokenId,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        this.setState({
          userDetails: response.data
        })
      })
  }
  onChangeName = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    let e = this.state.userDetails
    return (
      <div>
        <nav className="nav navbar-static-top" style={{ height: "70px", background: "#0875CB" }}>
          <Link className="nav-item nav-link text-white" to="/home"> <h1 style={{ marginLeft: "40px", marginRight: "10px", fontSize: "40px", fontWeight: "bold" }}><span>twitter</span></h1></Link>
          <Link className="nav-item nav-link text-white mt-3" style={{ fontSize: "18px", marginLeft: "180px", fontWeight: "bold" }} to="/home">Home</Link>
          <Link className="nav-item nav-link text-white mt-3" style={{ fontSize: "18px", marginLeft: "70px", fontWeight: "bold" }} to="/tweets">Tweet</Link>
          <Link className="nav-item nav-link text-white mt-3" style={{ fontSize: "18px", marginLeft: "70px", fontWeight: "bold" }} to="/myProfile">Profile</Link>
          <Link className="nav-item nav-link text-white mt-3" style={{ fontSize: "18px", marginLeft: "70px", fontWeight: "bold" }} to="/allUser">All Users</Link>
          <Link className="nav-item nav-link text-white mt-3" style={{ fontSize: "18px", marginLeft: "70px", fontWeight: "bold" }} to="/userTweets">My Tweets</Link>
          <form class="form-inline my-2 my-lg-0 ml-5">
            <input class="form-control mr-sm-2" type="search" placeholder="Search User" name="searchByname" aria-label="Search" onChange={this.onChangeName} />
            <Link to={`/search_name/${this.state.searchByname}`} class="btn btn-danger my-2 my-sm-0 rounded" type="submit" >Search</Link>
          </form>
          <div className="nav-item nav-link text-white mt-3 font-weight-bold" style={{ fontSize: "22px"}}>{e.name}</div>
          <Link className="nav-item nav-link text-white mt-3" style={{ fontSize: "18px", marginLeft: "60px", fontWeight: "bold" }} to="/" >Logout</Link>
        </nav>
      </div>
    )
  }
}

export default Navbar;  