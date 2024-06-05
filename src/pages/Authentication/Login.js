import React, { Component } from "react";

import { Row, Col, Input, Button, Alert, Container, Label } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";
// actions
import { checkLogin, apiError } from "../../store/actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import {
  GET_THEME_SETTING,
  GET_USER_BY_ID,
  LOGIN,
  THEME_SETTING_NO_AUTH,
} from "../../global";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", Logo: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // GET Images All Lists
  async GetThemesetting() {
    try {
      const response = await fetch(THEME_SETTING_NO_AUTH, {
        method: "GET",
        headers: {
          // Authorization: "Bearer " + Token,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data) {
        console.log("object", data.data);
        localStorage.setItem("theme_data_no_auth", JSON.stringify(data?.data));
        this.setState({
          Logo: data?.data?.logo,
          isLoading: false,
        });
      }
      // if (data.result === true && data.data) {
      //     const loginscreenLogo = data.data[0].loginscreen_logo;

      //     // Save data in localStorage
      //     // localStorage.setItem("Logo", loginscreenLogo);

      //     // Update state
      //     this.setState({
      //         Logo: loginscreenLogo,
      //         isLoading: false,
      //     });
      // } else {
      //     // Handle the case where the result is not true or there is no data
      // }
    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
    }
  }
  async GetUserById(id) {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_USER_BY_ID + id, {
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
            localStorage.setItem(
              "user_data",
              JSON.stringify(responseJson.data)
            );
            this.props.history.push(process.env.PUBLIC_URL + "/dashboard");
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  async GetTheme() {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_THEME_SETTING , {
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
            localStorage.setItem(
              "theme_data",
              JSON.stringify(responseJson.data)
            );
            localStorage.setItem("Theme", JSON.stringify(responseJson.data));
            // this.props.history.push(process.env.PUBLIC_URL + "/dashboard");
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  async handleSubmit(event, values) {
    const formData = new FormData();

    formData.append("email", values.username);
    formData.append("password", values.password);

    try {
      const response = await fetch(
        // "https://absoluteweb.org/propertymanagement/api/public/v1/tenantuser/login",
        LOGIN,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Handle successful response
      if (response.status === 200) {
        const responseData = await response.json();

        if (responseData.role_id == "NxOpZowo9GmjKqdR") {
          try {
            toast.success("Login successfully");
            localStorage.setItem("authUser", JSON.stringify(responseData));
            localStorage.setItem("authUserId", responseData.user_id);
            await this.GetTheme();
            await this.GetUserById(responseData.user_id);
            // this.props.history.push("/dashboard");
          } catch (error) {
            console.error("Error storing data:", error);
            toast.error("Wrong Email-id and Password. Please try again later.");
          }
        } else {
          toast("You are not authorized", {
            type: "warning",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Wrong Email-id and Password. Please try again later.");
      // Handle error
    }
  }

  componentDidMount() {
    this.GetThemesetting();
    this.props.apiError("");
    document.body.classList.add("auth-body-bg");
  }

  componentWillUnmount() {
    document.body.classList.remove("auth-body-bg");
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Container fluid className="p-0">
            {/* <ToastContainer /> */}
            <Row className="g-0">
              <Col lg={12}>
                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                  <div className="w-100">
                    <Row className="justify-content-center">
                    <Col lg={3}  style={{border:'solid',borderColor:`var(--bs-header-bg`,borderRadius:15,padding:15}}>
                        <div>
                          <div className="text-center">
                            <div>
                              <Link to="/" class="">
                                <img
                                  src={this.state.Logo}
                                  alt=""
                                  height="50"
                                  class="auth-logo logo-dark mx-auto"
                                />
                                {/* <img
                                  src={logolight}
                                  alt=""
                                  height="20"
                                  class="auth-logo logo-light mx-auto"
                                /> */}
                              </Link>
                            </div>

                            <h4 className="font-size-18 mt-4">
                              Welcome Back !
                            </h4>
                            <p className="text-muted">
                              Sign in to continue to SAURER.
                            </p>
                          </div>

                          {this.props.loginError && this.props.loginError ? (
                            <Alert color="danger">
                              {this.props.loginError}
                            </Alert>
                          ) : null}

                          <div className="p-2 mt-5">
                            <AvForm
                              className="form-horizontal"
                              onValidSubmit={this.handleSubmit}
                            >
                              <div className="auth-form-group-custom mb-4">
                                <i style={{color: `var(--bs-header-bg`}} className="ri-user-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="username">Email</Label>
                                <AvField
                                  name="username"
                                  value={this.state.username}
                                  type="text"
                                  className="form-control"
                                  id="username"
                                  validate={{
                                    required: {
                                      value: true,
                                      errorMessage:
                                        "Please enter Email address",
                                    },
                                    email: {
                                      value: true,
                                      errorMessage: "Invalid Email",
                                    },
                                  }}
                                  placeholder="Enter username"
                                />
                              </div>

                              <div className="auth-form-group-custom mb-4">
                                <i style={{color: `var(--bs-header-bg`}} className="ri-lock-2-line auti-custom-input-icon"></i>
                                <Label htmlFor="userpassword">Password</Label>
                                <AvField
                                  name="password"
                                  value={this.state.password}
                                  type="password"
                                  className="form-control"
                                  id="userpassword"
                                  placeholder="Enter password"
                                  errorMessage="Please enter Password"
                                  required
                                />
                              </div>

                              <div className="form-check">
                                <Input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customControlInline"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="customControlInline"
                                >
                                  Remember me
                                </Label>
                              </div>

                              <div className="mt-4 text-center">
                                <Button
                                  className="w-md waves-effect waves-light"
                                  type="submit"
                                  style={{ background: `#e6001e`,borderColor:'#fff' ,color:'#fff',fontWeight:'800'}}
                                >
                                  Log In
                                </Button>
                              </div>

                              <div className="mt-4 text-center">
                                <Link
                                  to={
                                    process.env.PUBLIC_URL + "/forgot-password"
                                  }
                                  className="text-muted"
                                >
                                  <i className="mdi mdi-lock me-1"></i> Forgot
                                  your password?
                                </Link>
                              </div>
                            </AvForm>
                          </div>

                          <div className="mt-5 text-center">
                            {/* <p>
                              Don't have an account ?{" "}
                              <Link
                                to="/register"
                                className="fw-medium text-primary"
                              >
                                {" "}
                                Register{" "}
                              </Link>{" "}
                            </p> */}
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
  const { loginError } = state.Login;
  return { loginError };
};

export default withRouter(
  connect(mapStatetoProps, { checkLogin, apiError })(Login)
);
