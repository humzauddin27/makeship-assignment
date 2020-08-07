import React, { Component } from "react";
import axios from "axios";
import Store from "../Store";
import Comments from "../Comments";
import LoadingSpinner from "../LoadingSpinner";
import Button from "../Button";
import { API_URL } from "../../consts";
import "./index.css";

class Display extends Component {
  state = {
    loading: false,
    images: []
  };

  //when an image sis approved, no longer needs to be touched
  //when an image is rejected, the option to reupload pictures will appear on that items page
  //once that is done, we need to be able to associate multiple pics to one pic

  componentWillMount() {
    axios.get(`${API_URL}/get-images`).then(response => {
      this.setState({
        images: response.data
      });
    });
  }

  onChange = e => {
    const files = Array.from(e.target.files);
    if (this.state.images.length + files.length > 5) {
      console.log("You cant upload more than 5 images");
      return;
    }
    this.setState({ loading: true });
    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file);
    });

    fetch(`${API_URL}/image-upload`, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(imgs => {
        const imgUrls = imgs.map(img => img.secure_url);
        this.setState({
          images: this.state.images.concat(imgUrls),
          loading: false
        });
      });
  };

  render() {
    const { customer } = this.props;
    const { images, loading } = this.state;

    if (loading) {
      return <LoadingSpinner />;
    }

    return (
      <div className="main">
        <Store images={images} customer={customer} />
        {!customer ? (
          <Button onChange={this.onChange}> Upload an item </Button>
        ) : null}
        <Comments customer={customer} />
      </div>
    );
  }
}

export default Display;
