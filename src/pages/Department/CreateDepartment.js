import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CHANGE_PASSWORD,
  CREATE_DEPARTMENT,
  CREATE_USER,
  GET_DEPARTMENT_BY_ID,
  GET_USER_BY_ID,
  UPDATE_DEPARTMENT,
  UPDATE_USER_BY_ID,
} from "../../global";
import CustomFileInput from "../../components/Common/CustomFIleInput";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";

class CreateDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        {
          title: "SAURER.",
          link: process.env.PUBLIC_URL + "/dashboard",
        },
        {
          title: "Department List",
          link: process.env.PUBLIC_URL + "/department-list",
        },
        {
          title: this.props.match.params.id
            ? "Edit Department"
            : "Create Department",
          link: "#",
        },
      ],
      isProfileBase64URL: "",
      fileData: null,
      isEdit: false,
      dataByID: {},
      isLoading: false,
      idProofBase64URL: "",
    };
    this.validationSchema = this.props.match.params.id
      ? Yup.object().shape({
          department_name: Yup.string().required("Enter Department Name"),
         
        })
      : Yup.object().shape({
        department_name: Yup.string().required("Enter Department Name"),
          
        });
  }
  componentDidMount() {
    const id = this.props.match.params.id;

    if (id) {
      this.setState({ isEdit: true });
      this.GetUserById(id);
    }
  }
  async GetUserById(id) {
    this.setState({ isLoading: true });
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_DEPARTMENT_BY_ID + id, {
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
              dataByID: responseJson.data,
             
            });
            // console.log('dataByID', responseJson.data)
            this.setState({ isLoading: false });
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  createUser = async (data) => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    try {
      const response = await fetch(CREATE_DEPARTMENT, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Token.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // if (!response.ok) {
      //     throw new Error("Network response was not ok");
      // }

      // Handle successful response
      if (response.status === 200) {
        toast("Department Created Successfully", {
          type: "success",
        });
        this.props.history.goBack();
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
  UpdateUser = async (data) => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    try {
      const response = await fetch(UPDATE_DEPARTMENT + this.state.dataByID.id, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Token.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // if (!response.ok) {
      //     throw new Error("Network response was not ok");
      // }

      // Handle successful response
      if (response.status === 200) {
        toast("Update Department  Successfully", {
          type: "success",
        });
        this.props.history.goBack();
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


  renderError = (message) => <p className="text-danger">{message}</p>;

  render() {
    const itemsLength = this.state.breadcrumbItems.length;

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Row className="align-items-center">
              <div className="d-flex justify-content-between">
                {/* <Col xs={12} lg={8} className="justify-content-center"> */}
                <div className="page-title-box d-flex align-items-center justify-content-center">
                  <h4 className="mb-0">
                    {this.props.match.params.id
                      ? "Edit Department"
                      : "Create Department"}
                  </h4>
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
                    style={{
                      background: `var(--bs-header-bg`,
                      borderColor: "#fff",
                    }}
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
              <Card>
                <CardBody>
                  <Formik
                    // initialValues={this.initialValues}
                    initialValues={{
                      department_name: this.state.isEdit
                        ? this.state.dataByID.department_name
                        : "",
                      
                    }}
                    validationSchema={this.validationSchema}
                    onSubmit={(values, { resetForm }) => {
                
                      if (this.state.isEdit) {
                        this.UpdateUser(values);
                      } else {
                        this.createUser(values);
                      }
                    }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      isSubmitting,
                      setFieldValue,
                    }) => (
                      <Form>
                        <div>
                          <Col lg={6}>
                            <div className="mb-3">
                              <div className="field">
                                <label className="label" htmlFor="rating">
                                  Department Name{" "}
                                  <span className="text-danger">*</span>
                                </label>

                                <div className="control">
                                  <Field
                                    name="department_name"
                                    value={values.department_name}
                                    type="text"
                                    className={`form-control ${
                                      errors.department_name && touched.department_name
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    placeholder="Enter Department Name"
                                    error={
                                      errors.department_name && touched.department_name
                                    }
                                  />
                                  <ErrorMessage
                                    name="department_name"
                                    render={this.renderError}
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>

                          <Button
                            type="submit"
                            className="primary"
                            style={{ float: "right" }}
                          >
                            Submit
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            )}
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateDepartment;
