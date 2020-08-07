import React, { Component } from "react";
import "./index.css";
import { API_URL } from "../../consts";
import axios from "axios";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentComment: "",
      comments: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    axios.get(`${API_URL}/get-comments`).then(response => {
      this.setState({
        comments: response.data
      });
    });
  }

  renderComments() {
    const { comments } = this.state;

    return (
      <div className="comments">
        {comments.map((comment, i) => (
          <div key={i}>{comment}</div>
        ))}
      </div>
    );
  }

  onSubmit() {
    const formData = new FormData();
    const user = this.props.customer ? "Customer" : "Seller";
    formData.append(user, this.state.currentComment);

    fetch(`${API_URL}/submit-comment`, {
      method: "POST",
      body: formData
    }).then(() => {
      this.setState({
        comments: this.state.comments.concat(
          user + ": " + this.state.currentComment
        ),
        currentComment: ""
      });
    });
  }

  onChange(e) {
    this.setState({
      currentComment: e.target.value
    });
  }

  render() {
    const { comments } = this.state;

    return (
      <div className="">
        {comments.length === 0 ? (
          <p>No comments to display. </p>
        ) : (
          this.renderComments()
        )}

        <div className="input">
          <input
            placeholder="Add a comment ..."
            onChange={this.onChange}
            value={this.state.currentComment}
          />
          <div onClick={this.onSubmit}> Post </div>
        </div>
      </div>
    );
  }
}

export default Comments;
