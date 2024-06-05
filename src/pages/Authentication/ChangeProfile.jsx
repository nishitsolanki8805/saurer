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
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
import { toast } from "react-toastify";
import {
  CHANGE_PASSWORD,
  CREATE_USER,
  GET_USER_BY_ID,
  UPDATE_USER_BY_ID,
} from "../../../src/global";
import CustomFileInput from "../../../src/components/Common/CustomFIleInput";

class ChangeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        {
          title: "SAURER.",
          link: process.env.PUBLIC_URL + "/dashboard",
        },
        {
          title: "Admin List",
          link: process.env.PUBLIC_URL + "/admin",
        },
        {
          title: this.props.match.params.id ? "Edit Admin" : " Create Admin",
          link: "#",
        },
      ],
      isProfileBase64URL: "",
      fileData: null,
      isEdit: false,
      dataByID: {},
      isLoading: false,
    };
    this.validationSchema = Yup.object().shape({
      first_name: Yup.string().required("Enter First Name"),
      // role_id: Yup.string().required("Enter Password"),
      last_name: Yup.string().required("Enter Last Name"),
      // email: Yup.string()
      //     .email("Invalid email address")
      //     .required("Enter Email"),
      // password: Yup.string().required("Enter Password"),
      // profile_image_encode: Yup.string().required("Enter Password"),
      dob: Yup.string().required("Enter DOB"),
      gender: Yup.string().required("Enter Gender"),
      mobile: Yup.string()
        .matches(/^\d+$/, "Phone number must contain only digits")
        .min(10, "Phone number must be at least 10 digits")
        .max(10, "Phone number must not exceed 10 digits")
        .required("Enter Mobile Number"),
      address: Yup.string().required("Enter Address"),
      country: Yup.string().required("Enter Country"),
      state: Yup.string().required("Enter State"),
      city: Yup.string().required("Enter City"),
      zipcode: Yup.string()
        .required("Enter Zip code")
        .min(5, "Zip code must be at least 5 digits")
        .max(5, "Zip Code must not exceed 5 digits"),
      // zipcode: Yup.string().required("Enter Password"),
      // 'is_active'
    });

    // this.initialValues = {
    //     first_name: this.state.isEdit ? this.state.dataByID.first_name : "",
    //     // role_id: "",
    //     last_name: this.state.isEdit ? "" : "",
    //     email: this.state.isEdit ? "" : "",
    //     password: this.state.isEdit ? "" : "",
    //     dob: this.state.isEdit ? "" : "",
    //     gender: this.state.isEdit ? "" : "",
    //     mobile: this.state.isEdit ? "" : "",
    //     address: this.state.isEdit ? "" : "",
    //     country: this.state.isEdit ? "" : "",
    //     state: this.state.isEdit ? "" : "",
    //     city: this.state.isEdit ? "" : "",
    //     zipcode: this.state.isEdit ? "" : "",
    //     // profile_image_encode: "",
    // };
  }
  componentDidMount() {
    this.setState({ isEdit: true });
    this.GetUserById();
  }
  async GetUserById() {
    this.setState({ isLoading: true });
    const StoredData = localStorage.getItem("authUser");
    const id = localStorage.getItem("authUserId");
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
            this.setState({
              dataByID: responseJson.data,
              isProfileBase64URL: responseJson.data.profile_image,
            });

            this.setState({ isLoading: false });
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  // createUser = async (data) => {
  //     const StoredData = localStorage.getItem("authUser");
  //     const Token = JSON.parse(StoredData);
  //     try {
  //         const response = await fetch(
  //             CREATE_USER,
  //             {
  //                 method: "POST",
  //                 headers: {
  //                     Authorization: "Bearer " + Token.access_token,
  //                     Accept: "application/json",
  //                     "Content-Type": "application/json",
  //                 },
  //                 body: JSON.stringify(data),

  //             })
  //         // if (!response.ok) {
  //         //     throw new Error("Network response was not ok");
  //         // }

  //         // Handle successful response
  //         if (response.status === 200) {
  //             console.log('response--', response)
  //             toast('Admin Created Successfully', {
  //                 type: "success",
  //             });
  //             this.props.history.goBack();
  //         } else {
  //             toast('Error', {
  //                 type: "warning",
  //             });
  //         }
  //     } catch (error) {
  //         console.error("Error:", error);
  //         // Handle error
  //     }
  // };

  UpdateUser = async (data) => {
    const StoredData = localStorage.getItem("authUser");
    const id = localStorage.getItem("authUserId");
    const Token = JSON.parse(StoredData);
    try {
      const response = await fetch(UPDATE_USER_BY_ID + id, {
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
        toast("Update Profile Successfully", {
          type: "success",
        });
        this.props.history.push(process.env.PUBLIC_URL + "/dashboard");
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
  handleProfileBase64DataChange = (item) => {
    this.setState({ isProfileBase64URL: item });
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
                  <h4 className="mb-0">{"Update Profile"}</h4>
                  {/* <div
                                        // className="divider"
                                        style={{
                                            borderLeft: "1px solid #000",
                                            height: "20px",
                                            margin: "0 10px",
                                        }}
                                    ></div> */}
                  {/* <div className="page-title-right">
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
                                    </div> */}
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
                      // first_name: this.state.isEdit ? this.state.dataByID.first_name : "",
                      first_name: this.state.isEdit
                        ? this.state.dataByID.first_name
                        : "",
                      // role_id: "",
                      last_name: this.state.isEdit
                        ? this.state.dataByID.last_name
                        : "",
                      // email: this.state.isEdit ? this.state.dataByID.email: "",
                      // password: this.state.isEdit ? this.state.dataByID.password : "",
                      dob: this.state.isEdit ? this.state.dataByID.dob : "",
                      gender: this.state.isEdit
                        ? this.state.dataByID.gender
                        : "",
                      mobile: this.state.isEdit
                        ? this.state.dataByID.mobile
                        : "",
                      address: this.state.isEdit
                        ? this.state.dataByID.address
                        : "",
                      country: this.state.isEdit
                        ? this.state.dataByID.country
                        : "",
                      state: this.state.isEdit ? this.state.dataByID.state : "",
                      city: this.state.isEdit ? this.state.dataByID.city : "",
                      zipcode: this.state.isEdit
                        ? this.state.dataByID.zipcode
                        : "",
                      // profile_image_encode: "",
                    }}
                    validationSchema={this.validationSchema}
                    onSubmit={(values, { resetForm }) => {
                      const updatedValue = {
                        ...values,
                        role_id: "XbPW7awNkzl83LD6",
                        profile_image_encode:
                          this.state.isProfileBase64URL.split(",")?.[1],
                      };

                      this.UpdateUser(updatedValue);

                      // else{

                      //     this.createUser(updatedValue);
                      // }
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
                          <Row>
                            <Col lg={8}>
                              <Row>
                                <Col md="6">
                                  <div className="mb-3">
                                    <div className="field">
                                      <label className="label" htmlFor="rating">
                                        First Name
                                      </label>

                                      <div className="control">
                                        <Field
                                          name="first_name"
                                          value={values.first_name}
                                          type="text"
                                          className={`form-control ${
                                            errors.first_name &&
                                            touched.first_name
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          placeholder="Enter First Name"
                                          error={
                                            errors.first_name &&
                                            touched.first_name
                                          }
                                        />
                                        <ErrorMessage
                                          name="first_name"
                                          render={this.renderError}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                                <Col md="6">
                                  <div className="mb-3">
                                    <div className="field">
                                      <label className="label" htmlFor="rating">
                                        Last Name
                                      </label>

                                      <div className="control">
                                        <Field
                                          name="last_name"
                                          value={values.last_name}
                                          type="text"
                                          className={`form-control ${
                                            errors.last_name &&
                                            touched.last_name
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          placeholder="Enter Last Name"
                                          error={
                                            errors.last_name &&
                                            touched.last_name
                                          }
                                        />
                                        <ErrorMessage
                                          name="last_name"
                                          render={this.renderError}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Col>

                                <Col md="6">
                                  <div className="mb-3">
                                    <div className="field">
                                      <label className="label" htmlFor="rating">
                                        DOB
                                      </label>

                                      <div className="control">
                                        {/* <Field
                                                                                    name="dob"
                                                                                    type="date"
                                                                                    value={values.dob}
                                                                                    className={`form-control ${errors.dob && touched.dob
                                                                                        ? "is-invalid"
                                                                                        : ""
                                                                                        }`}
                                                                                    placeholder="Enter DOB"
                                                                                    error={
                                                                                        errors.dob && touched.dob
                                                                                    }
                                                                                />
                                                                                 */}
                                        <Flatpickr
                                          name="dob"
                                          // data-enable-time
                                          value={new Date(values.dob)}
                                          // disabled
                                          // defaultValue={new Date(this.state.inputDate).toLocaleString()}
                                          // value={new Date('2023-11-28 15:25:00')}
                                          onChange={(e) => {
                                            const dateObject = new Date(e[0]);

                                            const year =
                                              dateObject.getFullYear();
                                            const month = String(
                                              dateObject.getMonth() + 1
                                            ).padStart(2, "0");
                                            const day = String(
                                              dateObject.getDate()
                                            ).padStart(2, "0");
                                            // const hours = String(dateObject.getHours()).padStart(2, '0');
                                            // const minutes = String(dateObject.getMinutes()).padStart(2, '0');

                                            // const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
                                            const formattedDate = `${year}-${month}-${day}`;

                                            // const formattedDateTime = `${day}-${month}-${year} --:${hours}:${minutes}`;
                                            // setIsStartDate(formattedDate)
                                            // console.log('dateObject---', formattedDate)
                                            setFieldValue("dob", formattedDate);
                                            //  setIsStartDateSelected(false)
                                          }}
                                          className={`form-control ${
                                            errors.dob && touched.dob
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          placeholder="Enter DOB"
                                          error={errors.dob && touched.dob}
                                          options={{
                                            // enableTime: true,
                                            dateFormat: "m-d-Y",
                                          }}
                                        />
                                        <ErrorMessage
                                          name="dob"
                                          render={this.renderError}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                                <Col md="6">
                                  <div className="mb-3">
                                    <div className="field">
                                      <label className="label" htmlFor="rating">
                                        Gender
                                      </label>

                                      <div className="control">
                                        <Field
                                          name="gender"
                                          value={values.gender}
                                          type="text"
                                          className={`form-control ${
                                            errors.gender && touched.gender
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          placeholder="Enter Gender"
                                          error={
                                            errors.gender && touched.gender
                                          }
                                        />
                                        <ErrorMessage
                                          name="gender"
                                          render={this.renderError}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                                <Col md="6">
                                  <div className="mb-3">
                                    <div className="field">
                                      <label className="label" htmlFor="rating">
                                        Mobile
                                      </label>

                                      <div className="control">
                                        <Field
                                          name="mobile"
                                          type="number"
                                          value={values.mobile}
                                          className={`form-control ${
                                            errors.mobile && touched.mobile
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          placeholder="Enter mobile"
                                          error={
                                            errors.mobile && touched.mobile
                                          }
                                        />
                                        <ErrorMessage
                                          name="mobile"
                                          render={this.renderError}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                                <Col md="6">
                                  <div className="mb-3">
                                    <div className="field">
                                      <label className="label" htmlFor="rating">
                                        Address
                                      </label>

                                      <div className="control">
                                        <Field
                                          name="address"
                                          value={values.address}
                                          type="text"
                                          className={`form-control ${
                                            errors.address && touched.address
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          placeholder="Enter address"
                                          error={
                                            errors.address && touched.address
                                          }
                                        />
                                        <ErrorMessage
                                          name="address"
                                          render={this.renderError}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                            <Col lg={4}>
                              <Row>
                                <Col lg="12" className="">
                                  <label
                                    className="form-label mb-1"
                                    htmlFor="validationCustom04"
                                  >
                                    Upload Profile
                                  </label>
                                  <CustomFileInput
                                    name="fileData"
                                    onDataChange={this.handleFileDataChange}
                                    onBase64Change={
                                      this.handleProfileBase64DataChange
                                    }
                                    defaultFile={this.state.isProfileBase64URL}
                                    isView={false}
                                    // className={
                                    //   "form-control" +
                                    //   (!this.state.fileData ? " is-invalid" : "")
                                    // }
                                    // error={this.state.fileData ? false : true} // Add this line to pass the error prop
                                  />
                                  {/* {!this.state.fileData ? (
                                                                <ErrorMessage
                                                                    name="fileData"
                                                                    component="div"
                                                                    className="text-danger"
                                                                />
                                                            ) : (
                                                                <></>
                                                            )} */}
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="4">
                              <div className="mb-3">
                                <div className="field">
                                  <label className="label" htmlFor="rating">
                                    Country
                                  </label>

                                  <div className="control">
                                    <Field
                                      name="country"
                                      value={values.country}
                                      type="text"
                                      className={`form-control ${
                                        errors.country && touched.country
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      placeholder="Enter country"
                                      error={errors.country && touched.country}
                                    />
                                    <ErrorMessage
                                      name="country"
                                      render={this.renderError}
                                    />
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col md="4">
                              <div className="mb-3">
                                <div className="field">
                                  <label className="label" htmlFor="rating">
                                    State
                                  </label>

                                  <div className="control">
                                    <Field
                                      name="state"
                                      value={values.state}
                                      type="text"
                                      className={`form-control ${
                                        errors.state && touched.state
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      placeholder="Enter state"
                                      error={errors.state && touched.state}
                                    />
                                    <ErrorMessage
                                      name="state"
                                      render={this.renderError}
                                    />
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col md="4">
                              <div className="mb-3">
                                <div className="field">
                                  <label className="label" htmlFor="rating">
                                    City
                                  </label>

                                  <div className="control">
                                    <Field
                                      name="city"
                                      value={values.city}
                                      type="text"
                                      className={`form-control ${
                                        errors.city && touched.city
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      placeholder="Enter city"
                                      error={errors.city && touched.city}
                                    />
                                    <ErrorMessage
                                      name="city"
                                      render={this.renderError}
                                    />
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col md="4">
                              <div className="mb-3">
                                <div className="field">
                                  <label className="label" htmlFor="rating">
                                    Zip code
                                  </label>

                                  <div className="control">
                                    <Field
                                      name="zipcode"
                                      value={values.zipcode}
                                      type="text"
                                      className={`form-control ${
                                        errors.zipcode && touched.zipcode
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      onChange={(e) => {
                                        setFieldValue(
                                          "zipcode",
                                          e.target.value.replace(/[^0-9]/g, "")
                                        );
                                      }}
                                      placeholder="Enter zip code"
                                      error={errors.zipcode && touched.zipcode}
                                    />
                                    <ErrorMessage
                                      name="zipcode"
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
                            style={{
                              float: "right",
                              background: `var(--bs-header-bg`,
                              borderColor: "#fff",
                            }}
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

export default ChangeProfile;
