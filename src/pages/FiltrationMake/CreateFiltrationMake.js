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
  CREATE_FILTRATION_MAKE,
  CREATE_MAKE,
  CREATE_USER,
  GET_DEPARTMENT_BY_ID,
  GET_FILTRATION_MAKE_BY_ID,
  GET_MAKE_BY_ID,
  GET_USER_BY_ID,
  UPDATE_DEPARTMENT,
  UPDATE_FILTRATION_MAKE,
  UPDATE_MAKE,
  UPDATE_USER_BY_ID,
} from "../../global";
import CustomFileInput from "../../components/Common/CustomFIleInput";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";

class CreateFiltrationMake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        {
          title: "SAURER.",
          link: process.env.PUBLIC_URL + "/dashboard",
        },
        {
          title: "Filtration Make List",
          link: process.env.PUBLIC_URL + "/filtration-make",
        },
        {
          title: this.props.match.params.id
            ? "Edit Filtration Make"
            : "Create Filtration Make",
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
    this.validationSchema = Yup.object().shape({
      filtration_make_name: Yup.string().required("Enter Filtration Make Name"),
      filtration_make_company_name: Yup.string().required(
        "Enter Filtration Make Company Name"
      ),
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
    await fetch(GET_FILTRATION_MAKE_BY_ID + id, {
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
      const response = await fetch(CREATE_FILTRATION_MAKE, {
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
        toast("Filtration Make Created Successfully", {
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
      const response = await fetch(
        UPDATE_FILTRATION_MAKE + this.state.dataByID.id,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + Token.access_token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      // if (!response.ok) {
      //     throw new Error("Network response was not ok");
      // }

      // Handle successful response
      if (response.status === 200) {
        toast("Update Filtration Make Successfully", {
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
                      ? "Edit Filtration Make"
                      : "Create Filtration Make"}
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
                      filtration_make_name: this.state.isEdit
                        ? this.state.dataByID.filtration_make_name
                        : "",
                      filtration_make_company_name: this.state.isEdit
                        ? this.state.dataByID.filtration_make_company_name
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
                                  Filtration Make Name{" "}
                                  <span className="text-danger">*</span>
                                </label>

                                <div className="control">
                                  <Field
                                    name="filtration_make_name"
                                    value={values.filtration_make_name}
                                    type="text"
                                    className={`form-control ${
                                      errors.filtration_make_name &&
                                      touched.filtration_make_name
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    placeholder="Enter Filtration Make Name"
                                    error={
                                      errors.filtration_make_name &&
                                      touched.filtration_make_name
                                    }
                                  />
                                  <ErrorMessage
                                    name="filtration_make_name"
                                    render={this.renderError}
                                  />
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <div className="field">
                                <label className="label" htmlFor="rating">
                                  Company Name{" "}
                                  <span className="text-danger">*</span>
                                </label>

                                <div className="control">
                                  <Field
                                    name="filtration_make_company_name"
                                    value={values.filtration_make_company_name}
                                    type="text"
                                    className={`form-control ${
                                      errors.filtration_make_company_name &&
                                      touched.filtration_make_company_name
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    placeholder="Enter Company Name"
                                    error={
                                      errors.filtration_make_company_name &&
                                      touched.filtration_make_company_name
                                    }
                                  />
                                  <ErrorMessage
                                    name="filtration_make_company_name"
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

export default CreateFiltrationMake;
