import React from "react"
// import classes from "./styles.module.css"
import { Form, Button } from "react-bootstrap"
import { _id } from "../helpers"
export default class AddPost extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { post: "" }
  }
  addPost = () => {
    if (this.state.post === "") {
      return
    }
    let posts = JSON.parse(localStorage.getItem("posts"))
    posts = posts?.length ? posts : []
    posts.push({ _id: _id(), post: this.state.post, comments: [] })
    localStorage.setItem("posts", JSON.stringify(posts))

    this.props.history.replace("/")
  }
  render() {
    return (
      <div className="box-shadow container d-flex flex-column w-75 my-5 p-5 rounded">
        <Form.Control
          value={this.state.post}
          onChange={e => this.setState({ post: e.target.value })}
          as="textarea"
          rows="3"
          placeholder="Type a Post"
          className="font-weight-bold"
        />
        <Button
          variant="danger"
          onClick={this.addPost}
          type="button"
          className="mt-3 align-self-end font-weight-bold"
        >
          Add Post
        </Button>
      </div>
    )
  }
}
