import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'
export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: [],
            userDetails: [],
            organisation: [],
            user_id: "",
            date_of_birth: "",
            gender: "",
            martial_status: "",
            totalFollower: "",
            totalFollowing: '',
            tokenId: localStorage.getItem("token"),
            image: ""
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
                // Profile
                axios.get("http://127.0.0.1:5000/show_profile", {
                    headers: {
                        user_id: response.data.user_id
                    }
                })
                    .then((response) => {
                        this.setState({
                            profile: response.data[0]
                        })
                    })
                    .catch((err) => alert(err))

                // Organisation
                axios.get("http://127.0.0.1:5000/show_organisation", {
                    headers: {
                        user_id: response.data.user_id
                    }
                })
                    .then((response) => {
                        this.setState({
                            organisation: response.data[0]
                        })
                    })
                    .catch((err) => alert(err))

                axios.get("http://127.0.0.1:5000/total_followers", {
                    headers: {
                        user_id: response.data.user_id
                    }
                })
                    .then((response) => {
                        this.setState({
                            totalFollower: response.data[0].total
                        })
                    })
                    .catch((err) => alert(err))

                axios.get("http://127.0.0.1:5000/total_following", {
                    headers: {
                        user_id: response.data.user_id
                    }
                })
                    .then((response) => {
                        console.log(response.data)
                        this.setState({
                            totalFollowing: response.data[0].total
                        })
                    })
                    .catch((err) => alert(err))
            })

    }
    onChangeProfile = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeOrganisation = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    inputChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    onSubmitProfile = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('image', this.state.image)
        axios.post("http://127.0.0.1:5000/add_profile", formData, {
            headers: {
                gender: this.state.gender,
                date_of_birth: this.state.date_of_birth,
                martial_status: this.state.martial_status,
                user_id: this.state.user_id
            }
        })
            .then(response => {
                console.log(response.data)
                window.location.reload(false);
            })
            .catch(error => {
                console.log(error)
            })

    }
    onSubmitOrganisation = (e) => {
        e.preventDefault()
        var organisationDetails = {
            organisation_name: this.state.organisation_name,
            joined_at: this.state.joined_at,
            user_id: this.state.user_id
        }
        axios.post("http://127.0.0.1:5000/add_organisation", organisationDetails)
            .then(response => {
                console.log(response.data)
                window.location.reload(false);
            })
            .catch(error => {
                console.log(error)
            })

    }
    render() {
        let user = this.state.userDetails
        let profile = this.state.profile
        let organisation = this.state.organisation
        return (
            <div>
                <Navbar />
                <h2 className="text-center">Profile</h2>
                <h3 className="offset-5 mt-4">Followers: {this.state.totalFollower}</h3>
                <Link to="/myFollowers"><button className="offset-5 mt-3 btn btn-secondary">See Followers</button></Link>
                <h3 className="offset-5 mt-4">Following: {this.state.totalFollowing}</h3>
                <Link to="/myFollowings"><button className="offset-5 mt-3 btn btn-secondary">See Followings</button></Link>
                <div style={{ marginTop: "-200px" }}>
                    <h4 className="offset-1">Name: {user.name}</h4>
                    <h4 className="offset-1">Email: {user.email}</h4>

                    {
                        this.state.profile ?
                            <div className="mt-2 offset-1" >
                                {
                                    this.state.profile.image ?
                                        <img style={{ height: "300px", width: "300px" }} src={`http://127.0.0.1:5000/${profile.image}`}></img>
                                        : <img style={{ height: "300px", width: "300px" }} src="https://www.w3schools.com/howto/img_avatar.png"></img>
                                }

                                <p>Gender: {profile.gender}</p>
                                <p>Date of Birth: {profile.date_of_birth}</p>
                                <p>Marital Status: {profile.martial_status}</p>
                            </div> :
                            <form onSubmit={this.onSubmitProfile}>
                                <div className="offset-4">
                                    <div class="form-group w-50">
                                        <label for="exampleInputEmail1">Gender</label>
                                        <input type="text" class="form-control" name="gender" onChange={this.onChangeProfile} />
                                    </div>
                                    <div class="form-group w-50">
                                        <label for="exampleInputEmail1">Date Of Birth</label>
                                        <input type="date" class="form-control" name="date_of_birth" onChange={this.onChangeProfile} />
                                    </div>
                                    <div class="form-group w-50">
                                        <label for="exampleInputEmail1">Marital Status</label>
                                        <input type="text" class="form-control" name="martial_status" onChange={this.onChangeProfile} />
                                    </div>
                                    <div className="form-group ml-1">
                                        <label>Choose Picture</label>
                                        <input type="file" className="form-control-file" name="image" onChange={this.inputChange} />
                                    </div>
                                    <button type="submit" class="btn btn-primary w-50">ADD</button>
                                </div>
                            </form>
                    }
                    {
                        this.state.organisation ?
                            <div className="mt-2 offset-1">
                                <p>Organisation: {organisation.organisation_name}</p>
                                <p>Joined: {organisation.joined_at}</p>
                            </div> :
                            <form onSubmit={this.onSubmitOrganisation}>
                                <div className="offset-4">
                                    <div class="form-group w-50">
                                        <label for="exampleInputEmail1">Organisation Name</label>
                                        <input type="text" class="form-control" name="organisation_name" onChange={this.onChangeOrganisation} />
                                    </div>
                                    <div class="form-group w-50">
                                        <label for="exampleInputEmail1">joined_at</label>
                                        <input type="date" class="form-control" name="joined_at" onChange={this.onChangeOrganisation} />
                                    </div>
                                    <button type="submit" class="btn btn-primary w-50">ADD</button>
                                </div>
                            </form>
                    }
                </div>
            </div>
        )
    }
}
