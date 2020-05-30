import React from "react"
import Header from "./Header"
import { Switch, BrowserRouter, Route } from "react-router-dom"
import AddPost from "./AddPosts"
import Home from "./Home"
import Post from "./Post"

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/add-post"
              name="Add Post"
              render={props => <AddPost {...props} />}
            />
            <Route
              exact
              path="/:_id"
              name="Post"
              render={props => <Post {...props} />}
            />
            <Route
              exact
              path="/"
              name="Home"
              render={props => <Home {...props} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
