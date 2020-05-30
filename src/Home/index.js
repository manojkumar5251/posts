import React from "react"
import { Card, Button } from "react-bootstrap"

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { posts: [] }
  }

  componentDidMount() {
    this.fetchPosts()
  }

  fetchPosts = () => {
    let posts = JSON.parse(localStorage.getItem("posts")).reverse()
    this.setState({ posts })
  }

  commentHandler = id => {
    this.props.history.push("/" + id, {})
  }

  shareHandler = id => {
    // this.props.history.push("#" + id)
  }
  render() {
    return (
      <React.Fragment>
        {this.state.posts.map((post, i) => {
          return (
            <Card
              id={post._id}
              className="mx-5 mt-1 mb-5"
              key={post._id}
              onClick={this.postHandler}
            >
              <Card.Body>
                <Card.Title>{post.post}</Card.Title>
                <hr />
                <Card.Link>
                  <Button
                    variant="link"
                    onClick={() => this.commentHandler(post._id)}
                  >
                    Comment
                  </Button>
                </Card.Link>
                <Card.Link>
                  <Button variant="link">Share</Button>
                </Card.Link>
              </Card.Body>
            </Card>
          )
        })}
      </React.Fragment>
    )
  }
}
