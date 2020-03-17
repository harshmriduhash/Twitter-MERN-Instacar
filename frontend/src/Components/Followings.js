import React, { Component } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import Navbar from './Navbar'
export default class Followings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: "",
            checkFollwings: [],
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
                axios.get("http://127.0.0.1:5000/check_connection_following", {
                    headers: {
                        user_id: this.state.user_id
                    }
                })
                    .then((response) => {
                        console.log(response.data)
                        this.setState({
                            checkFollwings: response.data
                        })
                    })
                    .catch((err) => alert(err))
            })
    }
    onCancel = (connection_id) => {
        var cancel = {
            connection_id: connection_id,
            user_id: this.state.user_id
        }
        axios.post("http://127.0.0.1:5000/cancel_connectionSender", cancel)
            .then((response) => {
                console.log(response.data)
                window.location.reload(false);
            })
            .catch((err) => alert(err))
    }
    render() {
        let allDataFollowings = this.state.checkFollwings.map((a) => {
            return (
                <div className="offset-3">
                    <Link to={`/viewUserProfile/${a.reciever_user_id}`}> <p>{a.name}</p></Link>
                    <button className="btn btn-danger disabled">Following</button>
                    <button className="btn btn-primary ml-3" onClick={() => this.onCancel(a.connection_id)}>Cancel</button>
                </div>
            )
        })
        return (
            <div>
                <Navbar />
                <h2 className="offset-4 mt-5">Following</h2>
                {allDataFollowings}
            </div>
        )
    }
}
