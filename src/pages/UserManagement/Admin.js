import React, { Component } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { GET_ALL_ROLE, UPDATE_ROLE_BY_ID } from "../../global";
import { AiTwotoneEdit } from "react-icons/ai";
import { AvField, AvForm } from "availity-reactstrap-validation";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "SAURER.", link: "/dashboard" },
        { title: "Role List", link: "#" },
      ],
      data: [""],
      show: false,
      roleName: "",
      roleById: {},
    };
  }
  componentDidMount() {
    this.getData();
  }
  async getData() {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);

    await fetch(
      // "https://absoluteweb.org/propertymanagement/api/public/v1/getallrolemasters",
      GET_ALL_ROLE,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + Token.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          console.log(JSON.stringify(res.data));
          const data = JSON.stringify(res.data);
          this.setState({ data: res.data });
          // Convert logo URL to base64
          // const logoUrl = res.data.logo;
        } else {
          toast(res.message, {
            type: "warning",
          });
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        // console.log(err);
        this.setState({ loading: false });
      });
  }
  handleSubmitData = (event, values) => {};
  UpdateRole = async (id) => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    try {
      const response = await fetch(UPDATE_ROLE_BY_ID + id, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Token.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.roleName,
        }),
      });
      // if (!response.ok) {
      //     throw new Error("Network response was not ok");
      // }

      // Handle successful response
      if (response.status === 200) {
        // toast('Update Expense Successfully', {
        //     type: "success",
        // });
        this.getData();
        this.setState({ show: false });
      } else {
        toast("Error", {
          type: "warning",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title="Role List"
              breadcrumbItems={this.state.breadcrumbItems}
            />

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <div className="table-responsive">
                      <Table className="mb-0">
                        <thead>
                          <tr>
                            <th>Sr.</th>
                            {/* <th>Status</th> */}
                            <th>Name</th>
                            {/* <th>Id</th> */}
                            <th style={{ textAlign: "end" }}>Action</th>
                            {/* <th style={{ textAlign: "end" }}>Permission</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {this.state?.data?.map((item, index) => (
                            <tr>
                              <th scope="row" style={{ width: "100px" }}>
                                {index + 1}
                              </th>
                              {/* <td>
                                <Col md={3}>
                                  <div
                                    className="form-check form-switch mb-3"
                                    dir="ltr"
                                  >
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
                                        // this.setState({
                                        //   toggleSwitch:
                                        //     !this.state.toggleSwitch,
                                        // });
                                      }}
                                    ></Label>
                                  </div>
                                </Col>
                              </td> */}
                              <td>{item.name}</td>
                              {/* <td>{item.id}</td> */}
                              <td
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                              >
                                <td style={{ textAlign: "end" }}>
                                  <AiTwotoneEdit
                                    style={{
                                      // color: "#5664d2",
                                      height: "20px",
                                      width: "20px",
                                      marginTop: "8px",
                                      marginLeft: "10px",
                                      cursor: "pointer",
                                      // margin: "0px 10px 0px 0px",
                                    }}
                                    onClick={() =>
                                      // history.push(process.env.PUBLIC_URL + '/edit-property-type/' + item.id, { isView: false, page: currentpageIndex, perPage: perPage })

                                      {
                                        this.setState({ roleById: item });
                                        this.setState({ show: true });
                                      }
                                    }
                                  />
                                </td>

                                <td style={{ textAlign: "end" }}>
                                  <AiTwotoneEdit
                                    style={{
                                      // color: "#5664d2",
                                      height: "20px",
                                      width: "20px",
                                      marginTop: "8px",
                                      marginLeft: "10px",
                                      cursor: "pointer",
                                      // margin: "0px 10px 0px 0px",
                                    }}
                                    onClick={() =>
                                      this.props.history.push(
                                        process.env.PUBLIC_URL +
                                          "/role-permission/" +
                                          item.id
                                      )
                                    }
                                  />
                                </td>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
          <Modal isOpen={this.state.show} backdrop="static">
            <ModalHeader toggle={() => this.setState({ show: false })}>
              Update role
            </ModalHeader>
            <AvForm className="needs-validation">
              <ModalBody>
                <p>Are you sure you want to Update this Role?</p>
                <AvField
                  name="name"
                  value={this.state.roleById.name}
                  label="Role Name"
                  placeholder="Role Name"
                  type="text"
                  // errorMessage="Enter Fleet Name"
                  className="form-control"
                  // validate={{ required: { value: true } }}
                  id="validationCustom02"
                  onChange={(e) => this.setState({ roleName: e.target.value })}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  type="button"
                  color="light"
                  onClick={() => this.setState({ show: false })}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  color="primary"
                  onClick={() => this.UpdateRole(this.state.roleById.id)}
                >
                  Save
                </Button>
              </ModalFooter>
            </AvForm>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default Admin;
