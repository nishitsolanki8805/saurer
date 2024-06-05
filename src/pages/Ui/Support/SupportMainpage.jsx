import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Label,
  Row,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";


import { Link } from "react-router-dom";
import ChatBox from "../../Dashboard/ChatBox";


const isView = false;

export default class SupportPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breadcrumbItems: [
        {
          title: "SAURER.",
          link: process.env.PUBLIC_URL + "/dashboard",
        },
        {
          title: isView === true ? "Support" : "Support",
          link: "#",
        },
      ],
      breadcrumbItemsAdmin: [
        {
          title: "SAURER.",
          link: process.env.PUBLIC_URL + "/dashboard",
        },
        {
          title: "Chat List",
          link: process.env.PUBLIC_URL + "/chat-list",
        },
        {
          title: isView === true ? "Support" : "Support",
          link: "#",
        },
      ],
    };
  }

  render() {
    const StoredData = localStorage.getItem("authUser");
    const AdminRole = JSON.parse(StoredData);
    const itemsLength = this.state.breadcrumbItemsAdmin.length;
   
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            {
              AdminRole.role_id == "NxOpZowo9GmjKqdR" ?
                <>
                  <Row className="align-items-center">
                    <div className="d-flex justify-content-between">
                      {/* <Col xs={12} lg={8} className="justify-content-center"> */}
                      <div className="page-title-box d-flex align-items-center justify-content-center">
                        <h4 className="mb-0">{this.props.match.params.id ? "Support" : "Support"}</h4>
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
                            {this.state.breadcrumbItemsAdmin.map((item, key) =>
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
                </>
                :
                <>
                  <Breadcrumbs
                    title="Support"
                    breadcrumbItems={this.state.breadcrumbItems}
                  />
                </>
            }

            {/* <Card>
              <CardBody> */}
            {/* chat box */}
            <ChatBox />
            {/* </CardBody>
            </Card> */}
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
