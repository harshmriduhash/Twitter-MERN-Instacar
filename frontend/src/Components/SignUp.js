import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './SignUp.css'

export default class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
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
        var userDetails = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        axios.post("http://127.0.0.1:5000/signup", userDetails)
            .then(response => {
                console.log(response.data)
                alert('Sucessfully Created')
                this.props.history.push('/')
            })
            .catch(error => { console.log(error) })

    }

    render() {
        return (
            <div>
                <div className="signup-form" style={{ marginTop: "100px" }}>
                    <form onSubmit={this.onSubmit}>
                        <div><img src="http://keapu-webpp01-centin-r46j07o2.cloudapp.net/PU-LECT-2019/images/user_add.png" style={{ height: "60px", marginLeft: "120px" }}></img><span><h2 className="text-center">Sign Up</h2></span></div>
                        <p className="text-center">Please fill in this form to create an account!</p>
                        <hr></hr>
                        <div className="form-group ">
                            <div className="input-group ">
                                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                <input type="text" className="form-control" name="name" placeholder="Name" required="required" onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-paper-plane"></i></span>
                                <input type="email" className="form-control" name="email" placeholder="Email Address" required="required" onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                <input type="text" className="form-control" name="password" placeholder="Password" required="required" onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-lg offset-3">Sign Up</button>
                        </div>
                    </form>
                    <div className="text-center">Already have an account? <Link to="/login" className="text-danger">Login here</Link></div>
                </div>
            </div>
        )
    }
}
