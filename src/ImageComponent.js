import React, { Component } from "react";
import { Link } from "react-router-dom";

class ImageComponent extends Component {
    constructor(props) {
        super(props);
        const { imageUrl, imageId } = this.props;
        this.state = {
            imageUrl,
            imageId
        };
    }
    render() {
        const { imageUrl, imageId } = this.state;
        return (
            <div className="enlarge-image-container">
                <button
                    type="button"
                    className="close-image-button"
                    onClick={this.props.toggleEnlargeImage}
                >
  X
                </button>
                <img className="enlarge-image" src={imageUrl} />

            </div>
        );
    }
}

export default ImageComponent;
