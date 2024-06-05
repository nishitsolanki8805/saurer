import React, { Component } from "react";
import {
  Table,
  Card,
  CardBody,
  Container,
  Label,
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";
import {
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  pdf,
} from "@react-pdf/renderer";

const dummmyData = [
  { id: 1, name: "Mohit", lastName: "patil", userName: "@mohitp" },
  { id: 2, name: "Shivam", lastName: "patel", userName: "@shivamp" },
  { id: 3, name: "Shubham", lastName: "shah", userName: "@shubhams" },
];
/* eslint-disable */

export default class Index extends Component {
  state = {
    pickedImage: null,
  };

  createPdf = async () => {
    const MyDocumentComponent = (
      <Document>
        <Page size="A4">
          <View>
            <Text>Hello PDF</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>#</Text>
                <Text style={styles.tableCell}>First Name</Text>
                <Text style={styles.tableCell}>Last Name</Text>
                <Text style={styles.tableCell}>Username</Text>
              </View>
              {dummmyData.map((item) => (
                <View style={styles.tableRow} key={item.id}>
                  <Text style={styles.tableCell}>{item.id}</Text>
                  <Text style={styles.tableCell}>{item.name}</Text>
                  <Text style={styles.tableCell}>{item.lastName}</Text>
                  <Text style={styles.tableCell}>{item.userName}</Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    );

    pdf(MyDocumentComponent)
      .toBlob()
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "alluser.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
      });
  };

  handleImageChange = (event) => {
    const file = event.target.files[0];
    const fileType = file.type.split("/")[0];
    if (fileType === "image") {
      this.setState({ pickedImage: file });
    } else {
      const alertMessage = "Please select an image file.";
      this.setState({ alertMessage });
      event.target.value = null; // Reset the file input
      this.setState({ pickedImage: null });
    }
  };

  render() {
    return (
      <div className="page-content">
        <Container fluid={true}>
          <Card className="mb-3">
            <CardBody>
              <p>Hello</p>
            </CardBody>
          </Card>
          <Card className="page-content">
            <Container fluid>
              <Card>
                <CardBody>
                  <h4 className="card-title">Basic Example</h4>
                  <div className="table-responsive">
                    <Table className="mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Username</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummmyData.map((item) => (
                          <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.lastName}</td>
                            <td>{item.userName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div style={{ float: "right", paddingTop: 30 }}>
                      <Button
                        color="danger"
                        type="button"
                        className="waves-effect waves-light me-1"
                        onClick={this.createPdf}
                      >
                        <i className=" ri-file-ppt-2-line align-middle me-3"></i>{" "}
                        Generate PDF
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Container>
          </Card>
          <Card>
            <CardBody>
              <Row className="mb-3">
                <Label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  Text
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    defaultValue="Mohit"
                    id="example-text-input"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Label
                  htmlFor="example-date-input"
                  className="col-md-2 col-form-label"
                >
                  Date
                </Label>
                <Col md={10}>
                  <Input
                    type="date"
                    defaultValue="2020-03-19"
                    id="example-date-input"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Label className="col-md-2 col-form-label">Select</Label>
                <Col md={5}>
                  <select className="form-control">
                    <option>Open this select menu</option>
                    <option>One</option>
                    <option>Two</option>
                    <option>Tree</option>
                  </select>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <div className="form-check mb-3">
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck1"
                    />
                    <Label className="form-check-label" htmlFor="defaultCheck1">
                      Form Checkbox
                    </Label>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="form-check form-switch mb-3" dir="ltr">
                    <Input
                      type="checkbox"
                      className="form-check-input"
                      id="customSwitch1"
                      defaultChecked
                    />
                    <Label
                      className="form-check-label"
                      htmlFor="customSwitch1"
                      onClick={(e) => {
                        this.setState({
                          toggleSwitch: !this.state.toggleSwitch,
                        });
                      }}
                    >
                      Toggle this switch element
                    </Label>
                  </div>
                </Col>
              </Row>
              <Card>
                <CardBody>
                  <h4 className="card-title">Image browser</h4>
                  <p className="card-title-desc">
                    The file input is the most gnarly of the bunch and requires
                    additi onal JavaScript if you’d like to hook them up with
                    functional <em>Choose Image</em> and selected file name
                    text.
                  </p>
                  <div className="input-group">
                    <input
                      type="file"
                      className="form-control"
                      id="customFile"
                      onChange={this.handleImageChange}
                    />
                  </div>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <h4 className="card-title">Pick Image</h4>
                  {this.state.pickedImage && (
                    <img
                      src={URL.createObjectURL(this.state.pickedImage)}
                      alt="Picked Image"
                      style={{ maxWidth: "100%" }}
                    />
                  )}
                </CardBody>
              </Card>
            </CardBody>
          </Card>
          {this.state.alertMessage && (
            <div className="alert alert-danger" role="alert">
              {this.state.alertMessage}
            </div>
          )}
        </Container>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  table: { width: "100%", border: "1px solid black", marginTop: 5 },
  tableRow: { flexDirection: "row" },
  headerCell: {
    flexGrow: 1,
    textAlign: "center",
    backgroundColor: "#f2f2f2",
    padding: 5,
  },
  tableCell: {
    flexGrow: 1,
    textAlign: "center",
    padding: 5,
    borderBottom: "1px solid #ccc",
  },
});
