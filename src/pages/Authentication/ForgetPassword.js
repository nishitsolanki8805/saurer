import React, { Component } from "react";
import { Row, Col, Alert, Button, Container, Label } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { toast } from "react-toastify";
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import { forgetUser } from "../../store/actions";

// import images
import logodark from "../../assets/images/suhanilogotransparent.png";

import { FORGET_PASSWORD } from "../../global";

class ForgetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }
  // componentDidMount() {
  //    console.log('test')
  //    toast('Email send successfuly', {
  //     type: "success",
  //   });
  //   }
  // handleValidSubmit
  handleValidSubmit(event, values) {
    this.restPasswordLink({
      ...values,
      // password_link:
      //   "http://" +
      //   window.location.host +
      //   process.env.PUBLIC_URL +
      //   "/reset-password",
    });
    this.props.forgetUser(values, this.props.history);
  }
  restPasswordLink = async (data) => {
    try {
      const response = await fetch(FORGET_PASSWORD, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // if (!response.ok) {
      //     throw new Error("Network response was not ok");
      //   }

      // Handle successful response
      if (response.status === 200) {
        toast("Email send successfully", {
          type: "success",
        });
      } else {
        toast("User Not found", {
          type: "warning",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };
  render() {
    const StoredData = localStorage.getItem("theme_data_no_auth");
    const themeData = JSON.parse(StoredData);

    return (
      <React.Fragment>
        <div>
          <Container fluid className="p-0" style={{backgroundColor:'#fff'}}>
            <Row className="g-0">
              <Col lg={12}>
                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                  
                  <div className="w-100" >
                    <Row className="justify-content-center" >
                      <Col lg={3}  style={{border:'solid',borderColor:`var(--bs-header-bg`,borderRadius:15,padding:15}}>
                        <div>
                          <div className="text-center">
                            <div>
                              <Link to="/" className="logo">
                                <img
                                  src={themeData?.logo}
                                  height="50"
                                  alt="logo"
                                />
                              </Link>
                            </div>

                            <h4 className="font-size-18 mt-4">
                              Forget Password
                            </h4>
                            <p className="text-muted">
                              Reset your password to SAURER.
                            </p>
                          </div>

                          <div className="p-2 mt-5">
                            {/* {this.props.forgetError && this.props.forgetError ?
                                                            <Alert color="danger" className="mb-4">{this.props.forgetError}</Alert> : null}
                                                        {
                                                            this.props.message ?
                                                                <Alert color="success" className="mb-4">{this.props.message}</Alert> : null
                                                        } */}
                            <AvForm
                              className="form-horizontal"
                              onValidSubmit={this.handleValidSubmit}
                            >
                              <div className="auth-form-group-custom mb-4">
                                <i style={{color: `var(--bs-header-bg`}} className="ri-mail-line auti-custom-input-icon"></i>
                                <Label htmlFor="useremail">Email</Label>
                                <AvField
                                  name="email"
                                  value={this.state.username}
                                  type="email"
                                  validate={{
                                    email: {
                                      value: true,
                                      errorMessage:
                                        "Please enter Email address",
                                    },
                                    required: {
                                      value: true,
                                      errorMessage:
                                        "Please enter Email address",
                                    },
                                  }}
                                  className="form-control"
                                  id="useremail"
                                  placeholder="Enter email"
                                />
                              </div>

                              <div className="mt-4 text-center">
                                <Button
                                  style={{
                                    backgroundColor: `var(--bs-header-bg`,
                                    borderColor: "#fff",
                                  }}
                                  className="w-md waves-effect waves-light"
                                  type="submit"
                                >
                                  {this.props.loading ? "Loading..." : "Reset"}
                                </Button>
                              </div>
                            </AvForm>
                          </div>

                          <div className="mt-5 text-center">
                            <p>
                              Don't have an account ?{" "}
                              <Link
                              
                                to={process.env.PUBLIC_URL + "/login"}
                                className="fw-medium text-danger"
                              >
                                {" "}
                                Log in{" "}
                              </Link>{" "}
                            </p>
                            <p>© 2024 SAURER. Developed By AbsoluteWeb</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              {/* <Col lg={8}>
                <div className="authentication-bg">
                  <div className="bg-overlay"></div>
                </div>
              </Col> */}
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { message, forgetError, loading } = state.Forget;
  return { message, forgetError, loading };
};

export default withRouter(
  connect(mapStatetoProps, { forgetUser })(ForgetPasswordPage)
);
