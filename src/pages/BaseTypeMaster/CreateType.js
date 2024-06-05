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
  CREATE_MODAL,
  CREATE_TYPE,
  CREATE_USER,
  GET_DEPARTMENT_BY_ID,
  GET_MAKE,
  GET_MODAL,
  GET_MODAL_BY_ID,
  GET_TYPE_BY_ID,
  GET_USER_BY_ID,
  UPDATE_DEPARTMENT,
  UPDATE_MODAL,
  UPDATE_TYPE,
  UPDATE_USER_BY_ID,
} from "../../global";
import CustomFileInput from "../../components/Common/CustomFIleInput";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";

class CreateType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        {
          title: "SAURER.",
          link: process.env.PUBLIC_URL + "/dashboard",
        },
        {
          title: "Install Base Type List",
          link: process.env.PUBLIC_URL + "/install-base-type",
        },
        {
          title: this.props.match.params.id
            ? "Edit Install Base Type"
            : "Create Install Base Type",
          link: "#",
        },
      ],
      isProfileBase64URL: "",
      fileData: null,
      isEdit: false,
      dataByID: {},
      makeData: [],
      modalDropdown: [],
      isLoading: false,
      idProofBase64URL: "",
    };
    this.validationSchema = Yup.object().shape({
      install_type: Yup.string().required("Enter Type"),
      make_id_encode: Yup.string().required("Select Install Base Make"),
      model_id_encode: Yup.string().required("Select Install Base Modal"),
    });
  }
  componentDidMount() {
    const id = this.props.match.params.id;

    if (id) {
      this.setState({ isEdit: true });
      this.GetUserById(id);
    }
    this.GetMakeById();
    this.GetModalById();
  }
  async GetUserById(id) {
    this.setState({ isLoading: true });
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_TYPE_BY_ID + id, {
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

  GetMakeById() {
    // this.setState({ isLoading: true });
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    fetch(GET_MAKE, {
      method: "Post",
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
              makeData: responseJson.data,
            });
            console.log("dataByID", responseJson.data);
            this.setState({ isLoading: false });
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  GetModalById() {
    // this.setState({ isLoading: true });
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    fetch(GET_MODAL, {
      method: "Post",
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
              modalData: responseJson.data,
            });
            console.log("dataByID", responseJson.data);
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
      const response = await fetch(CREATE_TYPE, {
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
        toast("Type Created Successfully", {
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
      const response = await fetch(UPDATE_TYPE + this.state.dataByID.id, {
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
        toast("Update Type Successfully", {
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
    const makeDropdown = this.state.makeData;
    const modalDropdown = this.state.modalData;
    console.log("makeDropdown", makeDropdown);

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
                      ? "Edit Install Base Type"
                      : "Create Install Base Type"}
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
                      install_type: this.state.isEdit
                        ? this.state.dataByID.install_type
                        : "",
                      make_id_encode: this.state.isEdit
                        ? this.state.dataByID.make_id
                        : "",
                      model_id_encode: this.state.isEdit
                        ? this.state.dataByID.model_id_encode
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
                              <label
                                className="label"
                                htmlFor={`make_id_encode`}
                              >
                                Install Base Make
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                name={`make_id_encode`}
                                value={values.make_id_encode}
                                as="select"
                                className={`form-control ${
                                  errors.make_id_encode &&
                                  touched.make_id_encode
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onBlur={handleBlur} // Ensure to call handleBlur
                              >
                                <option value="">Select Type</option>
                                {makeDropdown.map((item) => (
                                  <option value={item.id}>
                                    {item.make_name}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name="make_id_encode"
                                render={this.renderError}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label
                                className="label"
                                htmlFor={`model_id_encode`}
                              >
                                Install Base Modal
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                name={`model_id_encode`}
                                value={values.model_id_encode}
                                as="select"
                                className={`form-control ${
                                  errors.model_id_encode &&
                                  touched.model_id_encode
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onBlur={handleBlur} // Ensure to call handleBlur
                              >
                                <option value="">Select Modal</option>
                                {modalDropdown?.map((item) => (
                                  <option value={item.id}>
                                    {item.model_name}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name="model_id_encode"
                                render={this.renderError}
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <div className="field">
                                <label className="label" htmlFor="rating">
                                  Type Name
                                  <span className="text-danger">*</span>
                                </label>

                                <div className="control">
                                  <Field
                                    name="install_type"
                                    value={values.install_type}
                                    type="text"
                                    className={`form-control ${
                                      errors.install_type &&
                                      touched.install_type
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    placeholder="Enter Madal Name"
                                    error={
                                      errors.install_type &&
                                      touched.install_type
                                    }
                                  />
                                  <ErrorMessage
                                    name="install_type"
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

export default CreateType;
