import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    onChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        var loginDetails = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post("http://127.0.0.1:5000/login", loginDetails)
            .then((response) => {
                console.log(response.data)
                if (response.data == "Wrong Password") {
                    alert(response.data)
                }
                else {
                    window.localStorage.setItem("token", response.data)
                    this.props.history.push('/home')
                }
            })
            .catch((err) => alert(err))
    }
    render() {
        return (
            <div>
                <div className="login-form" style={{ marginTop: "120px" }}>
                    <form onSubmit={this.onSubmit}>
                        <img src="http://img.clipartlook.com/user-user-clipart-528_594.png" style={{ height: "80px", marginLeft: "100px" }}></img>
                        <h2 className="text-center">Log in</h2>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Email" name="email" required="required" onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" name="password" required="required" onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Log in</button>
                        </div>
                    </form>
                    <p className="text-center"><Link to="/signup">Create an Account</Link></p>
                </div>
            </div>
        )
    }
}
