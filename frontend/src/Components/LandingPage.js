import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount = () => {
        window.localStorage.removeItem("token")
    }

    render() {
        return (
            <div>
                <img src="https://www.therahnuma.com/wp-content/uploads/2019/01/screen-shot-2015-12-03-at-22820-pmpng-1.png" style={{ height: "200px", width: "200px", marginLeft: "120px" }}></img>
                <Link to="/login"><button className="btn btn-primary mt-5 offset-3" style={{ marginTop: "-500px" }}>Login</button></Link>
                <Link to="/signup"><button className="btn btn-danger mt-5 ml-3">Sign Up</button></Link>
            </div>
        )
    }
}
