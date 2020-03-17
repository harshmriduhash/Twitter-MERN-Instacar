import React, { Component } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import Navbar from './Navbar'
export default class Followers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: "",
            checkFollower: [],
            checkFollowing: [],
            userDetails: [],
            tokenId: localStorage.getItem("token")
        }
    }
    componentDidMount = () => {
        axios.get("http://127.0.0.1:5000/get-user", {
            headers: {
                Authorization: "Bearer " + this.state.tokenId,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                this.setState({
                    user_id: response.data.user_id.toString(10),
                    userDetails: response.data
                })
                //Check Connections
                axios.get("http://127.0.0.1:5000/check_connection_follower", {
                    headers: {
                        user_id: this.state.user_id
                    }
                })
                    .then((response) => {
                        console.log(response.data)
                        this.setState({
                            checkFollower: response.data
                        })
                    })
                    .catch((err) => alert(err))

                axios.get("http://127.0.0.1:5000/check_connection_following", {
                    headers: {
                        user_id: this.state.user_id
                    }
                })
                    .then((response) => {
                        console.log(response.data)
                        this.setState({
                            checkFollowing: response.data
                        })
                    })
                    .catch((err) => alert(err))
            })
    }
    onFollowback = (sender_user_id, reciever_user_id) => {
        var accept = {
            sender_user_id: sender_user_id,
            reciever_user_id: reciever_user_id
        }
        axios.post("http://127.0.0.1:5000/followback_connection", accept)
            .then((response) => {
                console.log(response.data)
                window.location.reload(false);
            })
            .catch((err) => alert(err))
    }
    render() {
        console.log(this.state.checkFollower)
        let allDataFollower = this.state.checkFollower.map((a) => {
            return (
                <div className="offset-3">
                    <Link to={`/viewUserProfile/${a.reciever_user_id}`}> <p>{a.name}</p></Link>
                    <button className="btn btn-primary" onClick={() => this.onFollowback(a.sender_user_id, a.reciever_user_id)}>Follow back</button>
                </div>
            )
        })
        return (
            <div>
                <Navbar />
                <h2 className="offset-4 mt-5">Follower</h2>
                {allDataFollower}
            </div>
        )
    }
}
