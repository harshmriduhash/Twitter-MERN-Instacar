import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import Navbar from './Navbar';
export default class ViewUsers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user_id: "",
            userData: [],
            checkFollower: "",
            checkFollowing: "",
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
                // console.log(response.data.user_id)
                this.setState({
                    user_id: response.data.user_id.toString(10),
                    userDetails: response.data
                })
                //Check Connections
                axios.get("http://127.0.0.1:5000/check_follower", {
                    headers: {
                        reciever_user_id: this.props.match.params.user_id,
                        sender_user_id: this.state.user_id
                    }
                })
                    .then((response) => {
                        console.log(response.data)
                        this.setState({
                            checkFollower: response.data[0]
                        })
                    })
                    .catch((err) => alert(err))
                axios.get("http://127.0.0.1:5000/check_following", {
                    headers: {
                        reciever_user_id: this.props.match.params.user_id,
                        sender_user_id: this.state.user_id
                    }
                })
                    .then((response) => {
                        console.log(response.data[0])
                        this.setState({
                            checkFollowing: response.data[0]
                        })
                    })
                    .catch((err) => alert(err))
            })
        //Show Users
        axios.get("http://127.0.0.1:5000/show_users", {
            headers: {
                user_id: this.props.match.params.user_id
            }
        })
            .then((response) => {
                console.log(response.data[0])
                this.setState({
                    userData: response.data[0]
                })
            })
            .catch((err) => alert(err))

    }
    onFollowback = () => {
        var connectionDetails = {
            reciever_user_id: this.props.match.params.user_id,
            sender_user_id: this.state.userDetails.user_id
        }
        axios.post("http://127.0.0.1:5000/send_connection", connectionDetails)
            .then((response) => {
                console.log(response.data)
                window.location.reload(false);
            })
            .catch((err) => alert(err))
    }

    onCancel = (connection_id) => {
        var cancel = {
            connection_id: connection_id,
            user_id: Number(this.state.user_id)
        }
        console.log(cancel)
        axios.post("http://127.0.0.1:5000/cancel_connectionS", cancel)
            .then((response) => {
                console.log(response.data)
                window.location.reload(false);
            })
            .catch((err) => alert(err))
    }

    render() {
        let userDetails = this.state.userData
        let check = this.state.checkFollowing
        return (
            <div>
                <Navbar />
                <div className="offset-4 mt-5">
                    <div>{userDetails.name}</div>
                    <div>{userDetails.email}</div>
                    <div>{userDetails.gender}</div>
                    <div>{userDetails.date_of_birth}</div>
                    <div>{userDetails.organisation_name}</div>
                    <div>{userDetails.joined_at}</div>
                </div>
                {
                    this.state.checkFollower ? <button className="btn btn-primary disabled offset-4">Followed</button> :
                        this.state.checkFollowing ?
                            <div>
                                <button className="btn btn-secondary offset-3">Following</button>
                                <button className="btn btn-danger offset-3 " onClick={() => this.onCancel(check.connection_id)}>Cancel</button>
                            </div> :
                            <div>
                                <button className="btn btn-danger offset-4" onClick={this.onFollowback}>Follow</button>
                            </div>
                }
            </div>
        )
    }
}
