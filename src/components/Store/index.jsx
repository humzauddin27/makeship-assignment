import React, { Component } from "react";
import "./index.css";
import { API_URL } from "../../consts";
import axios from "axios";

class Store extends Component {
  state = {
    currImage: 0,
    currApproved: null,
    statusList: {},
    approvedList: [],
    rejectedList: []
  };

  componentWillMount() {
    axios.get(`${API_URL}/get-approved`).then(response => {
      this.setState({
        approvedList: response.data
      });
    });
    axios.get(`${API_URL}/get-rejected`).then(response => {
      this.setState({
        rejectedList: response.data
      });
    });
  }

  clickImage(index) {
    this.setState({
      currImage: index
    });
  }

  renderImages() {
    const { images } = this.props;
    return (
      <div className="images">
        <div className="mainImg">
          <img src={images[this.state.currImage]} alt="" />
        </div>
        <div className="carousel">
          {images.map((image, i) => (
            <img
              onClick={() => this.clickImage(i)}
              key={i}
              src={image}
              alt=""
            />
          ))}
        </div>
      </div>
    );
  }

  makeChoice(approve) {
    const { images } = this.props;
    const { currImage } = this.state;
    const formData = new FormData();
    const str = images[currImage];
    formData.append(approve, str);

    fetch(`${API_URL}/make-choice`, {
      method: "POST",
      body: formData
    }).then(() => {
      if (approve) {
        this.setState({
          approvedList: this.state.approvedList.concat(str)
        });
      } else {
        this.setState({
          rejectedList: this.state.rejectedList.concat(str)
        });
      }
    });
  }

  renderChoice(statusList) {
    const imageUrl = this.props.images[this.state.currImage];

    if (statusList[imageUrl] || statusList[imageUrl] === false) {
      return statusList[imageUrl] ? "Approved" : "Rejected";
    } else if (!this.props.customer) {
      return;
    }
    return (
      <div className="choices">
        <div onClick={() => this.makeChoice(true)} className="approve">
          Approve
        </div>
        <div onClick={() => this.makeChoice(false)} className="reject">
          Reject
        </div>
      </div>
    );
  }

  render() {
    const { images, customer } = this.props;
    const { approvedList, rejectedList } = this.state;
    const status = {};
    approvedList.map(app => {
      status[app] = true;
    });
    rejectedList.map(rej => {
      status[rej] = false;
    });

    return images.length === 0 ? (
      <p>There's nothing here >:( </p>
    ) : (
      <div>
        {this.renderImages()}
        {this.renderChoice(status)}
      </div>
    );
  }
}

export default Store;
