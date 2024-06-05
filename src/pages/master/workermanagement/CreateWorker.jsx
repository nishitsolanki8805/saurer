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
  CREATE_PROPERTY_TYPE,
  CREATE_WORKER,
  GET_PROPERTY_TYPE_BY_ID,
  GET_WORKER_BY_ID,
  UPDATE_PROPERTY_TYPE_BY_ID,
  UPDATE_WORKER_BY_ID,
} from "../../../global";
import CustomFileInput from "../../../components/Common/CustomFIleInput";

class CreateWorker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        {
          title: "SAURER.",
          link: process.env.PUBLIC_URL + "/dashboard",
        },
        {
          title: "Property Type List",
          link: process.env.PUBLIC_URL + "/worker-list",
        },
        {
          title: this.props.match.params.id ? "Edit Worker " : "Create Worker",
          link: "#",
        },
      ],
      fileData: null,
      isEdit: false,
      dataByID: {},
      isLoading: false,
    };
    this.validationSchema = this.props.match.params.id
      ? Yup.object().shape({
          worker_name: Yup.string().required("Enter Worker Name"),
          worker_mobile_no: Yup.string()
          .nullable()
          .matches(
            /^\d{10}$/,
            "Mobile No. must be exactly 10 digits"
          ),
          worker_email: Yup.string()
          .email('Enter Valid Worke Email')
          .nullable(),
        })
        
      : Yup.object().shape({
          worker_name: Yup.string().required("Enter Worker Name"),
          worker_mobile_no: Yup.string()
          .nullable()
          .matches(
            /^\d{10}$/,
            "Mobile No. must be exactly 10 digits"
          ),
          worker_email: Yup.string()
          .email('Enter Valid Worke Email')
          .nullable(),
        });
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.setState({ isEdit: true });
      this.GetWorkerById(id);
    }
  }
  async GetWorkerById(id) {
    console.log("object",id)
    this.setState({ isLoading: true });
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_WORKER_BY_ID + id, {
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

  CreateWorker = async (data) => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    try {
      const response = await fetch(CREATE_WORKER, {
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
        toast("Worker Created Successfully", {
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
  UpdateWorker = async (data) => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    try {
      const response = await fetch(
        UPDATE_WORKER_BY_ID + this.state.dataByID.id,
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
        toast("Update Worker Successfully", {
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

  handleFileDataChange = (file) => {
    this.setState({ fileData: file });
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
                      ? "Edit Worker"
                      : "Create Worker"}
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
                      // type: this.state.isEdit ? this.state.dataByID.type : "",
                      worker_name: this.state.isEdit
                        ? this.state.dataByID.worker_name
                        : "",
                      worker_mobile_no: this.state.isEdit
                        ? this.state.dataByID.worker_mobile_no
                        : "",
                      worker_email: this.state.isEdit
                        ? this.state.dataByID.worker_email
                        : "",
                    }}
                    validationSchema={this.validationSchema}
                    onSubmit={(values, { resetForm }) => {
                      const updatedValue = { ...values };
                      if (this.state.isEdit) {
                        this.UpdateWorker(updatedValue);
                      } else {
                        this.CreateWorker(updatedValue);
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
                    }) => (
                      <Form>
                        <div>
                          <Row>
                            <Col lg={4}>
                              <div className="mb-3">
                                <div className="field">
                                  <label className="label" htmlFor="rating">
                                    Wroker Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>

                                  <div className="control">
                                    <Field
                                      name="worker_name"
                                      value={values.worker_name}
                                      type="text"
                                      className={`form-control ${
                                        errors.worker_name &&
                                        touched.worker_name
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      placeholder="Enter Worker Name"
                                      error={
                                        errors.worker_name &&
                                        touched.worker_name
                                      }
                                    />
                                    <ErrorMessage
                                      name="worker_name"
                                      render={this.renderError}
                                    />
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <div className="field">
                                  <label className="label" htmlFor="rating">
                                    Wroker Mobile Number{" "}
                                  </label>

                                  <div className="control">
                                    <Field
                                      name="worker_mobile_no"
                                      value={values.worker_mobile_no}
                                      type="number"
                                      className={`form-control ${
                                        errors.worker_mobile_no &&
                                        touched.worker_mobile_no
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      placeholder="Enter Worker Mobile Number "
                                      error={
                                        errors.worker_mobile_no &&
                                        touched.worker_mobile_no
                                      }
                                    />
                                    <ErrorMessage
                                      name="worker_mobile_no"
                                      render={this.renderError}
                                    />
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <div className="field">
                                  <label className="label" htmlFor="rating">
                                    Wroker Email{" "}
                                  </label>

                                  <div className="control">
                                    <Field
                                      name="worker_email"
                                      value={values.worker_email}
                                      type="text"
                                      className={`form-control ${
                                        errors.worker_email &&
                                        touched.worker_email
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      placeholder="Enter Worker Email "
                                      error={
                                        errors.worker_email &&
                                        touched.worker_email
                                      }
                                    />
                                    <ErrorMessage
                                      name="worker_email"
                                      render={this.renderError}
                                    />
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>

                          <Row></Row>

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

export default CreateWorker;
