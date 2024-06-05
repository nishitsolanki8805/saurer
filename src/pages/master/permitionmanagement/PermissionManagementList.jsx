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
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

import { AiTwotoneEdit } from "react-icons/ai";
import { GET_ALL_ROLE } from "../../../global";

class PermissionManagementList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "SAURER.", link: "/dashboard" },
        { title: "Permission List", link: "#" },
      ],
      data: [""],
      isLoading: false,
    };
  }
  componentDidMount() {
    this.getData();
  }
  async getData() {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    this.setState({ isLoading: true });
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
          
          const data = JSON.stringify(res.data);
          this.setState({ data: res.data });
          this.setState({ isLoading: false });
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

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title="Permission List"
              breadcrumbItems={this.state.breadcrumbItems}
            />
            {this.state.isLoading ? (
              <>
                {/* <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4D5DC6"
                ariaLabel="three-dots-loading"
                wrapperStyle={{
                  justifyContent: "center",
                }}
                wrapperClassName=""
                visible={true}
              /> */}
                <p>Loading ...</p>
              </>
            ) : (
              <>
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
                                <th style={{textAlign :'end'}}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state?.data.map((item, index) => (
                                <tr>
                                  <th scope="row" style={{width:'100px'}}>{index + 1}</th>
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
                                  <td style={{textAlign :'end'}}>
                                    <AiTwotoneEdit
                                      style={{
                                        // color: "#5664d2",
                                        height: "20px",
                                        width: "20px",
                                        marginTop: "8px",
                                        marginLeft: "10px",
                                        cursor: 'pointer',
                                        margin:'0px 10px 0px 0px'
                                      }}
                                    onClick={() =>
                                        this.props.history.push(process.env.PUBLIC_URL + '/edit-permission/' + item.id)
                                    }
                                    />
                                    {/* <button
                                  className="btn btn-danger ms-2"
                                  // onClick={() => handleDelete(index)}
                                >
                                  <i className="  ri-delete-bin-fill "></i>
                                </button> */}
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
              </>)}
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default PermissionManagementList;
