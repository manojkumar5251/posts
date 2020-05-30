import React from "react"
import { Form, Button, Card, Container } from "react-bootstrap"
import { _id } from "../helpers"

export default class Post extends React.Component {
  constructor(props) {
    super(props)
    this.state = { replying: true, post: {}, comment: "" }
    this.posts = JSON.parse(localStorage.getItem("posts"))
    console.log(this.posts)
    this.index = null
  }

  componentDidMount() {
    this.fetchPost()
  }

  fetchPost = () => {
    let index = this.posts.findIndex(
      post => post._id === this.props.location.pathname.slice(1)
    )
    this.setState({ post: this.posts[index] })
    this.index = index
  }

  reply = () => {
    let { post, comment } = this.state
    if (comment === "") {
      return
    }
    post.comments.push({ _id: _id(), comment })
    this.setState({ post, comment: "" })
    let posts = this.posts
    this.props = [
      ...posts.slice(0, this.index),
      post,
      ...posts.slice(this.index + 1)
    ]
    localStorage.setItem("posts", JSON.stringify(this.posts))
  }

  render() {
    return (
      <React.Fragment>
        <Card className="mt-3 container" style={{ marginBottom: "6rem" }}>
          <Card.Body>
            <Card.Title>{this.state.post.post}</Card.Title>
            <hr />
            {this.state.post.comments?.map(comment => {
              return (
                <Card.Body
                  key={comment._id}
                  className="border w-100 rounded mt-3 d-flex align-items-center justify-content-between"
                >
                  <Card.Text className="w-75">{comment.comment}</Card.Text>
                  <Button variant="link">Reply</Button>
                </Card.Body>
              )
            })}
          </Card.Body>
        </Card>

        <Container
          className="d-flex w-100 justify-content-between container rounded align-items-center"
          style={{ position: "fixed", bottom: "0.5rem", left: "6.6rem" }}
        >
          <div className="d-flex w-100 box-shadow justify-content-between container py-2 px-3 rounded align-items-center">
            <Form.Control
              value={this.state.comment}
              onChange={e => this.setState({ comment: e.target.value })}
              as="textarea"
              rows="2"
              placeholder="Type your Comment"
              className="font-weight-bold w-75"
            />
            <Button
              variant="danger"
              onClick={this.reply}
              type="button"
              className="font-weight-bold"
            >
              Comment
            </Button>
          </div>
        </Container>
      </React.Fragment>
    )
  }
}
