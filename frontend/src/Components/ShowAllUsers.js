import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import Navbar from './Navbar';
export default class ShowAllUsers extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user_id: "",
            allUser: [],
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

                //Show All Users
                axios.get("http://127.0.0.1:5000/show_all_users", {
                    headers: {
                        user_id: response.data.user_id
                    }
                })
                    .then((response) => {
                        console.log(response.data)
                        this.setState({
                            allUser: response.data
                        })
                    })
                    .catch((err) => alert(err))
            })
    }
    render() {
        let allUser = this.state.allUser.map(e => {
            return (
                <div>

                    <div>{e.name}</div>
                    <div>{e.organisation_name}</div>
                    <Link to={`/viewUserProfile/${e.user_id}`}><button className="btn btn-primary">View Profile</button></Link>
                </div>
            )
        })
        return (
            <div>
                <Navbar />
                <div className="offset-4">
                    {allUser}
                </div>
            </div>
        )
    }
}
