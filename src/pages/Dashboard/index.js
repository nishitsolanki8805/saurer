import React, { Component } from "react";
import { Container, Row, Col, Table } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import CommonDashboardCard from "./../../components/Common/CommonDashboardCard";
import { FaArrowCircleRight } from "react-icons/fa";
import {
  GET_ALL_BILL_DATA_BY_SEARCH,
  GET_ALL_MAINTENANCE_DATA_BY_SEARCH,
  GET_DASHBOARD_DATA,
} from "../../global";
import { ImEye } from "react-icons/im";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],

      isLoading: true,
      breadcrumbItems: [
        { title: "SAURER.", link: "/" },
        { title: "Dashboard", link: "#" },
      ],
    };
  }
  componentDidMount() {
    this.getDashboardData();
  }
  async getDashboardData(id, type) {
    this.setState({ isLoading: true });
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_DASHBOARD_DATA, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
      },
    })
      // .then((response) => {
      //   return response.json();
      // })
      .then((response) => {
        response.json().then((responseJson) => {
          if (responseJson.data) {
            this.setState({
              data: responseJson.data,
            });
            this.setState({ isLoading: false });
          }
        });
      })
      .catch((err) => {
        this.setState({ isLoading: false });

        // console.log(err);
      });
  }

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* <ToastContainer /> */}
            <Breadcrumbs
              title="Dashboard"
              breadcrumbItems={this.state.breadcrumbItems}
            />
            {this.state.isLoading ? (
              <>
                <p>Loading ...</p>
              </>
            ) : (
              <>
                <Row className="mt-3">
                  <Col>
                    <Row>
                      <Col md={12}>
                        <h5>Number of Role</h5>
                      </Col>
                      <Col md={2}>
                        <CommonDashboardCard
                          title={"Role"}
                          count={data.role || 0}
                          Icon={FaArrowCircleRight}
                          redirect={"/rolelist"}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Row>
                      <Col md={12}>
                        <h5>Number Of Admin</h5>
                      </Col>
                      <Col md={10}>
                        <CommonDashboardCard
                          title={"Admin"}
                          count={data.admin || 0}
                          Icon={FaArrowCircleRight}
                          redirect={"/admin"}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col md={12}>
                        <h5>Number Of Employee</h5>
                      </Col>
                      <Col md={10}>
                        <CommonDashboardCard
                          title={"Employee"}
                          count={data.employee || 0}
                          Icon={FaArrowCircleRight}
                          redirect={"/employee-list"}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col md={10}>
                        <h5>Number Of Supervisor</h5>
                      </Col>
                      <Col md={10}>
                        <CommonDashboardCard
                          title={"Supervisor"}
                          count={data.supervisor || 0}
                          Icon={FaArrowCircleRight}
                          redirect={"/supervisor-list"}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col md={12}>
                        <h5>Number Of Auditor</h5>
                      </Col>
                      <Col md={10}>
                        <CommonDashboardCard
                          title={"Total"}
                          count={data.auditor || 0}
                          Icon={FaArrowCircleRight}
                          redirect={"/auditor-list"}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                </Row>
              </>
            )}
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
