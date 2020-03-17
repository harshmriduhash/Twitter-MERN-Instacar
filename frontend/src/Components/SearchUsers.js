import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
export default class ShowSearchUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allUsers: [],
            tokenId: localStorage.getItem("token")
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
                    user_id: response.data.user_id.toString(10),
                    userDetails: response.data
                })
                axios.get("http://127.0.0.1:5000/search-by-name/" + this.props.match.params.name, {
                    headers: {
                        user_id: response.data.user_id
                    }
                })
                    .then((response) => {
                        console.log(response.data)
                        this.setState({
                            allUsers: response.data
                        })
                    })
                    .catch((err) => alert(err))
            })
            .catch((err) => alert(err))
    }
    render() {
        console.log(this.state.allUsers)
        let allUsers = this.state.allUsers.map((e) => {
            return (
                <div>
                    <div>{e.name}</div>
                    <Link to={`/viewUserProfile/${e.user_id}`}><button className="btn btn-primary mt-2">View Profile</button></Link>

                </div>
            )
        })
        return (
            <div>
                <Navbar />
                {
                    this.state.allUsers.length == 0 ?
                        <h1 className="text-center">
                            No User Found
                    </h1> :
                        <h1 className="text-center">
                            Search results
                    </h1>

                }
                <div className="offset-5 mt-5">
                    {allUsers}
                </div>
            </div>
        )
    }
}