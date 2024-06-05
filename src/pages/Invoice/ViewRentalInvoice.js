import React, { Component } from "react";
import {
  Container,
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  Form,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { GET_RENTAL_INVOICE_BY_ID } from "../../global";
import RentalPdf from "./RentalPdf";
import DownloadRecipt from "../RentalBillManagement/DownloadRecipt";
// import InVociemodaRtoPDF from "./InVociemodaRtoPDF";
export class ViewRentalInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        {
          title: "SAURER.",
          link: process.env.PUBLIC_URL + "/dashboard",
        },
        {
          title: "Rental Bill Management",
          link: process.env.PUBLIC_URL + "/rental-invoice-list",
        },
        {
          title: "View Rental Bill",
          link: "#",
        },
      ],
      isLoading: true,
      data: [],
      isOpen: false,
      generatePdf: false,
      id: this.props.match.params.id,
    };
  }
  componentDidMount() {
    this.getPdfData();
  }

  getPdfData = async () => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_RENTAL_INVOICE_BY_ID + this.state.id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.data) {
          console.log("Response", res.data);
          this.setState({
            data: res.data,
            isLoading: false,
            // recieverData: res.reciever_data,
          });
        } else {
        }
      })
      .catch((err) => {});
  };

  renderError = (message) => <p className="text-danger">{message}</p>;

  setIsOpen(value) {
    console.log(value);
  }
  render() {
    const itemsLength = this.state.breadcrumbItems.length;
    const { data } = this.state;
    const formatDate = (date) => {
      if (date) {
        const dateObj = date instanceof Date ? date : new Date(date);

        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");

        // Return the formatted date string
        return `${month}-${day}-${year}`;
      }
    };
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Row className="align-items-center">
              <div className="d-flex justify-content-between">
                <div className="page-title-box d-flex align-items-center justify-content-center">
                  <h4 className="mb-0">{"View Rental Bill"}</h4>
                  <div
                    className="divider"
                    style={{
                      borderLeft: "1px solid #000",
                      height: "20px",
                      margin: "0 10px",
                    }}
                  ></div>
                  <div className="page-title-right">
                    <Breadcrumb listClassName="m-0">
                      {this.state.breadcrumbItems.map((item, key) =>
                        key + 1 === itemsLength ? (
                          <BreadcrumbItem key={key} active>
                            {item.title}
                          </BreadcrumbItem>
                        ) : (
                          <BreadcrumbItem key={key}>
                            <Link to={item.link}>{item.title}</Link>
                          </BreadcrumbItem>
                        )
                      )}
                    </Breadcrumb>
                  </div>
                </div>
                <div div className="mb-3">
                  <Button
                    color="primary"
                    type="button"
                    onClick={() => this.props.history.goBack()}
                    className="waves-effect waves-light me-1"
                  >
                    <i className="ri-arrow-left-line align-middle me-2"></i>
                    Back
                  </Button>
                </div>
              </div>
            </Row>
            {this.state.isLoading ? (
              <>
                <p>Loading ...</p>
              </>
            ) : (
              <Row>
                <Card>
                  {/* <div
                      style={{
                        float: "right",
                        paddingTop: 30,
                        alignSelf: "flex-end",
                      }}
                    >
                      <Button
                        color="danger"
                        type="button"
                        className="waves-effect waves-light me-1"
                        onClick={() => this.setState({ generatePdf: true })}
                      >
                        <i className=" ri-file-ppt-2-line align-middle me-3"></i>{" "}
                        Generate Invoice
                      </Button>
                    </div>
                 
                  {this.state.generatePdf == true ? (
                    <RentalPdf
                      isOpen={this.state.generatePdf}
                      setIsOpen={() =>
                        this.setState({
                          generatePdf: false,
                        })
                      }
                      data={this.state.data}
                    />
                  ) : (
                    <></>
                  )} */}
                  <div className="text-end m-3">
                    <Button
                      color="primary"
                      type="button"
                      onClick={() => {
                        this.setState({ generatePdf: true });
                      }}
                      className="waves-effect waves-light me-1"
                    >
                      <i className="ri-file-list-2-fill align-middle me-2"></i>
                      Download Recipt
                    </Button>
                  </div>
                  {this.state.generatePdf == true ? (
                    <DownloadRecipt
                      isOpen={this.state.generatePdf}
                      setIsOpen={() =>
                        this.setState({
                          generatePdf: false,
                        })
                      }
                      data={this.state.data}
                    />
                  ) : (
                    <></>
                  )}
                  <CardBody>
                    <div>
                      <Row>
                        <Row
                          style={{
                            padding: "15px 20px",
                            boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
                            borderRadius: "10px",
                            margin: "20px 0px",
                            textAlign: "center",
                          }}
                        >
                          <Row style={{ paddingBottom: "10px" }}>
                            <Row
                              style={{
                                paddingBottom: "10px",
                                paddingTop: "10px",
                              }}
                            >
                              <h5 className="mb-0" style={{ color: "#5664d2" }}>
                                Property Details
                              </h5>
                            </Row>
                            <hr class="hr-blurry" />
                            <Col lg={4}>
                              <h6 className="mb-0">
                                Property Name :{" "}
                                <h8 className="mb-0">{data?.property_name}</h8>
                              </h6>
                            </Col>
                            <Col lg={4}>
                              <h6 className="mb-0">
                                Unit Name :{" "}
                                <h8 className="mb-0">{data?.units_name}</h8>
                              </h6>
                            </Col>
                            <Col lg={4}>
                              <h6 className="mb-0">
                                Total Amount :{" "}
                                <h8 className="mb-0">$ {data?.amount_total}</h8>
                              </h6>
                            </Col>
                            <hr class="hr-blurry my-2" />
                            <Col lg={4}>
                              <h6 className="mb-0">
                                Amount Status :{" "}
                                <h8 className="mb-0">
                                  {data?.status == 0
                                    ? "Not-Receive"
                                    : "Receive"}
                                </h8>
                              </h6>
                            </Col>
                            <Col lg={4}>
                              <h6 className="mb-0">
                                Invoice Generate Date :{" "}
                                <h8 className="mb-0">
                                  {formatDate(data?.invoice_date_gen)}
                                </h8>
                              </h6>
                            </Col>
                            <Col lg={4}>
                              <h6 className="mb-0">
                                Transaction Date :{" "}
                                <h8 className="mb-0">
                                  {formatDate(data?.transaction_date)}
                                </h8>
                              </h6>
                            </Col>
                            <hr class="hr-blurry my-2" />
                            <Col lg={6}>
                              <h6 className="mb-0">
                                Transaction Number :{" "}
                                <h8 className="mb-0">
                                  {data?.transaction_number
                                    ? data?.transaction_number
                                    : "-"}
                                </h8>
                              </h6>
                            </Col>
                            <Col lg={6}>
                              <h6 className="mb-0">
                                Notes : <h8 className="mb-0">{data?.notes}</h8>
                              </h6>
                            </Col>
                          </Row>
                          <hr class="hr-blurry" />

                          {/* <Row style={{ paddingBottom: "10px" }}>
                            <Row
                              style={{
                                paddingBottom: "10px",
                                paddingTop: "10px",
                              }}
                            >
                              <h5 className="mb-0" style={{ color: "#5664d2" }}>
                               Late Fees Details
                              </h5>
                            </Row>
                            <hr class="hr-blurry" />
                            {data?.late_fees_details.map((item) => (
                              <Row>
                                <Col lg={4}>
                                  <h6 className="mb-0">
                                    Amount Status :{" "}
                                    <h8 className="mb-0">
                                    {data?.status == 0 ? "Not-Receive" : "Receive"}
                                    </h8>
                                  </h6>
                                </Col>
                                <Col lg={4}>
                                  <h6 className="mb-0">
                                    Invoice Description :{" "}
                                    <h8 className="mb-0">{item.description|| "-"}</h8>
                                  </h6>
                                </Col>
                                <Col lg={4}>
                                  <h6 className="mb-0">
                                    Amount :{" "}
                                    <h8 className="mb-0">${item.amount}</h8>
                                  </h6>
                                </Col>
                                <hr class="hr-blurry" />
                              </Row>
                            ))}
                          </Row> */}

                          <Row style={{ paddingBottom: "10px" }}>
                            <Row
                              style={{
                                paddingBottom: "10px",
                                paddingTop: "10px",
                              }}
                            >
                              <h5 className="mb-0" style={{ color: "#5664d2" }}>
                                Late Fees Details
                              </h5>
                            </Row>
                            <hr class="hr-blurry" />
                            {data?.owner_share_details.map((item) => (
                              <Row>
                                <Col lg={4}>
                                  <h6 className="mb-0">
                                    Property Owner :{" "}
                                    <h8 className="mb-0">
                                      {item.property_owner_name}
                                    </h8>
                                  </h6>
                                </Col>
                                <Col lg={4}>
                                  <h6 className="mb-0">
                                    Transaction Number :{" "}
                                    <h8 className="mb-0">
                                      {item.transaction_number || "-"}
                                    </h8>
                                  </h6>
                                </Col>
                                <Col lg={4}>
                                  <h6 className="mb-0">
                                    Amount :{" "}
                                    <h8 className="mb-0">
                                      ${item.owner_share_amount}
                                    </h8>
                                  </h6>
                                </Col>
                                <hr class="hr-blurry" />
                              </Row>
                            ))}
                          </Row>
                          <Row style={{ paddingBottom: "10px" }}>
                            <Row
                              style={{
                                paddingBottom: "10px",
                                paddingTop: "10px",
                              }}
                            >
                              <h5 className="mb-0" style={{ color: "#5664d2" }}>
                                Invoice Transaction Details
                              </h5>
                            </Row>
                            <hr class="hr-blurry" />
                            {data?.invoice_transaction_details.map((item) => (
                              <Row>
                                <Col lg={4}>
                                  <h6 className="mb-0">
                                    Transaction Date :{" "}
                                    <h8 className="mb-0">
                                      {formatDate(item.transaction_date)}
                                    </h8>
                                  </h6>
                                </Col>
                                <Col lg={4}>
                                  <h6 className="mb-0">
                                    Transaction Number :{" "}
                                    <h8 className="mb-0">
                                      {item.transaction_number || "-"}
                                    </h8>
                                  </h6>
                                </Col>
                                <Col lg={4}>
                                  <h6 className="mb-0">
                                    Amount :{" "}
                                    <h8 className="mb-0">${item.amount}</h8>
                                  </h6>
                                </Col>
                                <hr class="hr-blurry" />
                              </Row>
                            ))}
                          </Row>
                        </Row>
                      </Row>

                      {/* <div className=" mt-3">
                        <Button
                          color="primary"
                          type="submit"
                          style={{ float: "right" }}
                        >
                          Next
                        </Button>
                      </div> */}
                    </div>
                  </CardBody>
                </Card>
              </Row>
            )}
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewRentalInvoice;
