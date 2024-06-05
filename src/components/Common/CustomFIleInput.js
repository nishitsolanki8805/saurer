import React, { Component } from "react";

class CustomFileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // error: this.props.error,
      selectedImage: this.props.defaultFile,
    };
  }


  handleImageChange = (e) => {
    // const { error } = this.props;

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.setState({
          // selectedImage: reader.result,
          selectedImage: event.target.result,
          // error: false,
        });
        const base64Data = event.target.result;
        
        this.props.onBase64Change(base64Data); // Callback to handle base64 data
        this.props.onDataChange(this.state.selectedImage); // Callback to handle file data
        // Pass the selected file to the parent component
        this.props.onDataChange(file); 
      };
      reader.readAsDataURL(file);
    }
  };

  render() {


    const { selectedImage } = this.state;
    const { error } = this.props;
    // console.log("Error", error);
    // console.log("Error 12122", this.state.error);
    const borderStyle = error ? { border: "2px solid red" } : {};
    return (
      <div
        // style={{ ...styles.imageBox, ...borderStyle }}
        style={styles.imageBox}
        onClick={() => this.fileInput.click()}
      >
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" style={styles.image} />
        ) : (
          <div style={styles.border}>
            <i className="ri-image-add-line" style={styles.icon}></i>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={(fileInput) => (this.fileInput = fileInput)}
          onChange={this.handleImageChange}
        />
      </div>
    );
  }
}
const styles = {
  imageBox: {
    width: "100%", // Changed width to 100%
    height: "200px", // Changed height to auto for responsiveness
    border: "2px solid #ccc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  border: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    // border: "2px dashed #ccc",
  },
  icon: {
    fontSize: "50px",
    color: "#ccc",
  },
};

export default CustomFileInput;
