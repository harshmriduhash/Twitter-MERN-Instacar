import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './Navbar'

export default class Tweets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tweet_title: '',
            user_id: '',
            tweet_content: '',
            postImageLink: '',
            tokenId: localStorage.getItem("token"),

        }
    }
    inputChange = (e) => {
        this.setState({
            postImageLink: e.target.files[0]
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        const formData = new FormData();
        formData.append('postImageLink', this.state.postImageLink)
        axios.post("http://127.0.0.1:5000/add-tweets", formData, {
            headers: {
                user_id: this.state.user_id,
                tweet_content: this.state.tweet_content,
                tweet_title: this.state.tweet_title
            }
        })
            .then(response => {
                this.setState({
                    image: response.data.path
                })
                this.props.history.push('/userTweets')
            })
            .catch(error => {
                console.log(error)
            })

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
                    user_id: response.data.user_id.toString(10)
                })
            })
            .catch((err) => alert(err))
    }
    render() {

        return (
            <div>
                <Navbar />
                <form onSubmit={this.onSubmit}>
                    <h2 className="offset-3 mt-3 text-danger text-center" >Tweets</h2>
                    <h4 className="offset-3 mt-2">Title</h4>
                    <textarea className="offset-3 mt-2" rows="2" cols="80" name="tweet_title" onChange={this.onChange}></textarea>
                    <h4 className="offset-3 mt-2">Content</h4>
                    <textarea className="offset-3 mt-2" rows="8" cols="80" name="tweet_content" onChange={this.onChange}></textarea>
                    <br></br>
                    <div className="form-group" style={{ "marginLeft": "900px" }}>
                        <label>Choose Picture</label>
                        <input type="file" className="form-control-file" name="postImageLink" onChange={this.inputChange} />
                    </div>
                    <button className="btn btn-primary offset-4 w-25 mt-2 btn-lg">Tweet</button>
                </form>
            </div>
        )
    }
}