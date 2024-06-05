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
  CREATE_USER,
  GET_DEPARTMENT,
  GET_DESIGNATION,
  GET_USER_BY_ID,
  UPDATE_USER_BY_ID,
} from "../../../global";
import CustomFileInput from "../../../components/Common/CustomFIleInput";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";
class CreateAdmin extends Component {
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
      genderList: [
        { id: "Male", value: "Male" },
        { id: "Female", value: "Female" },
      ],
      isProfileBase64URL: "",
      fileData: null,
      isEdit: false,
      dataByID: {},
      departmentList: [],
      designationList: [],
      isLoading: false,
      idProofBase64URL: "",
    };
    this.validationSchema = this.props.match.params.id
      ? Yup.object().shape({
          first_name: Yup.string().required("Enter First Name"),
          department_id_encode: Yup.string().required("Select Department"),
          designation_id_encode: Yup.string().required("Select Designation"),
          middle_name: Yup.string().required("Enter Middle Name"),
          last_name: Yup.string().required("Enter Last Name"),
          // email: Yup.string()
          //     .email("Invalid email address")
          //     .required("Enter Email"),
          // password: Yup.string().required("Enter Password"),
          // profile_image_encode: Yup.string().required("Enter Password"),
          // dob: Yup.string().required("Enter DOB"),
          // gender: Yup.string().required("Select Gender"),
          mobile: Yup.string()
            .matches(/^\d+$/, "Phone number must contain only digits")
            .min(10, "Phone number must be at least 10 digits")
            .max(10, "Phone number must not exceed 10 digits")
            .required("Enter Mobile Number"),
          // address: Yup.string().required("Enter Address"),
          country: Yup.string().required("Enter Country"),
          state: Yup.string().required("Enter State"),
          city: Yup.string().required("Enter City"),
          zipcode: Yup.string()
            .required("Enter Zip code")
            .min(6, "Zip code must be at least 6 digits")
            .max(6, "Zip Code must not exceed 6 digits"),
          // zipcode: Yup.string().required("Enter Password"),
          // 'is_active'
        })
      : Yup.object().shape({
          first_name: Yup.string().required("Enter First Name"),
          // role_id: Yup.string().required("Enter Password"),
          department_id_encode: Yup.string().required("Select Department"),
          designation_id_encode: Yup.string().required("Select Designation"),
          middle_name: Yup.string().required("Enter Middle Name"),
          last_name: Yup.string().required("Enter Last Name"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Enter Email"),
          password: Yup.string().required("Enter Password"),
          // profile_image_encode: Yup.string().required("Enter Password"),
          // dob: Yup.string().required("Enter DOB"),
          // gender: Yup.string().required("Select Gender"),
          mobile: Yup.string()
            .matches(/^\d+$/, "Phone number must contain only digits")
            .min(10, "Phone number must be at least 10 digits")
            .max(10, "Phone number must not exceed 10 digits")
            .required("Enter Mobile Number"),
          // address: Yup.string().required("Enter Address"),
          country: Yup.string().required("Enter Country"),
          state: Yup.string().required("Enter State"),
          city: Yup.string().required("Enter City"),
          zipcode: Yup.string()
            .required("Enter Zip code")
            .min(6, "Zip code must be at least 6 digits")
            .max(6, "Zip Code must not exceed 6 digits"),
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
    const id = this.props.match.params.id;
    this.getAllDepartment();
    this.getDesignation();
    if (id) {
      this.setState({ isEdit: true });
      this.GetUserById(id);
    }
  }
  async GetUserById(id) {
    this.setState({ isLoading: true });
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
            console.log("Response", responseJson.data);
            this.setState({
              dataByID: responseJson.data,
              isProfileBase64URL: responseJson.data.profile_image,
              // idProofBase64URL: responseJson.data.id_proof,
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
      const response = await fetch(CREATE_USER, {
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
        toast("Admin Created Successfully", {
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
    console.log("response--", this.state.dataByID.id);

    try {
      const response = await fetch(UPDATE_USER_BY_ID + this.state.dataByID.id, {
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
        toast("Update Admin Successfully", {
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
  handleProfileBase64DataChange = (item) => {
    this.setState({ isProfileBase64URL: item });
  };
  handleIdProofBase64DataChange = (item) => {
    this.setState({ idProofBase64URL: item });
  };
  handleFileDataChange = (file) => {
    this.setState({ fileData: file });
  };
  getAllDepartment = async () => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_DEPARTMENT, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        per_page: 100000,
        field_db: "",
        search_val: "",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.data) {
          this.setState({ departmentList: res.data });
       
        } else {
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
   getDesignation = async () => {
    
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch( GET_DESIGNATION, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        per_page:100000,
        field_db: "",
        search_val: "",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.data) {
          this.setState({ designationList: res.data });
        } else {
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  renderError = (message) => <p className="text-danger">{message}</p>;

  render() {
    const itemsLength = this.state.breadcrumbItems.length;
    console.log(
      "this.state.dataByID.first_name",
      this.state.isProfileBase64URL
    );
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Row className="align-items-center">
              <div className="d-flex justify-content-between">
                {/* <Col xs={12} lg={8} className="justify-content-center"> */}
                <div className="page-title-box d-flex align-items-center justify-content-center">
                  <h4 className="mb-0">
                    {this.props.match.params.id ? "Edit Admin" : "Create Admin"}
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
                      first_name: this.state.isEdit
                        ? this.state.dataByID.first_name
                        : "",
                      middle_name: this.state.isEdit
                        ? this.state.dataByID.middle_name
                        : "",
                      designation_id_encode: this.state.isEdit
                        ? this.state.dataByID.designation_id
                        : "",
                      department_id_encode: this.state.isEdit
                        ? this.state.dataByID.department_id
                        : "",
                      // role_id: "",
                      last_name: this.state.isEdit
                        ? this.state.dataByID.last_name
                        : "",
                      email: this.state.isEdit ? this.state.dataByID.email : "",
                      password: this.state.isEdit
                        ? this.state.dataByID.password
                        : "",
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
                      console.log("Onsubmit", values);
                      const updatedValue = {
                        ...values,
                        role_id_encode: "NxOpZowo9GmjKqdR",
                        // designation_id_encode: "NxOpZowo9GmjKqdR",
                        // department_id_encode: "NxOpZowo9GmjKqdR",
                        user_email: values.email,
                        profile_image_encode:
                          this.state.isProfileBase64URL.split(",")?.[1]
                            ? this.state.isProfileBase64URL
                            : "",
                        // id_proof: this.state.idProofBase64URL.split(",")?.[1]
                        //   ? this.state.idProofBase64URL
                        //   : "",
                      };
                      // return
                      if (this.state.isEdit) {
                        this.UpdateUser(updatedValue);
                      } else {
                        this.createUser(updatedValue);
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
                          <Row>
                            <Col md={8}>
                              <Row>
                                <Col lg={6}>
                                  <div className="mb-3">
                                    <div className="field">
                                      <label className="label" htmlFor="rating">
                                        First Name{" "}
                                        <span className="text-danger">*</span>
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
                                          placeholder="Enter Middle Name"
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
                                <Col lg={6}>
                                  <div className="mb-3">
                                    <div className="field">
                                      <label className="label" htmlFor="rating">
                                        Middle Name{" "}
                                        <span className="text-danger">*</span>
                                      </label>

                                      <div className="control">
                                        <Field
                                          name="middle_name"
                                          value={values.middle_name}
                                          type="text"
                                          className={`form-control ${
                                            errors.middle_name &&
                                            touched.middle_name
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          placeholder="Enter Middle Name"
                                          error={
                                            errors.middle_name &&
                                            touched.middle_name
                                          }
                                        />
                                        <ErrorMessage
                                          name="middle_name"
                                          render={this.renderError}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                                <Col md={6}>
                                  <div className="mb-3">
                                    <div className="field">
                                      <label className="label" htmlFor="rating">
                                        Last Name{" "}
                                        <span className="text-danger">*</span>
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
                                        {/* <span className="text-danger">*</span> */}
                                      </label>

                                      <div className="control">
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
                                          // error={errors.dob && touched.dob}
                                          options={{
                                            // enableTime: true,
                                            dateFormat: "m-d-Y",
                                          }}
                                        />
                                        {/* <ErrorMessage
                                          name="dob"
                                          render={this.renderError}
                                        /> */}
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                               {console.log("Department",this.state.dataByID.department_id_encode)}
                                <Col md="6">
                                  <div className="mb-3">
                                    <div className="field">
                                      <label className="label" htmlFor="rating">
                                        Department
                                        <span className="text-danger">*</span>
                                      </label>
                                      <div className="control">
                                        <Field
                                          name="department_id_encode"
                                          // value={
                                          //   this.state.departmentList?.find(
                                          //   (option) => {
                                          //     return (
                                          //    option?.id ===
                                          //       values.department_id_encode
                                          //     )
                                          //   }
                                          // )}
                                          value={values.department_id_encode}
                                          as="select"
                                          className={`form-control ${
                                            errors.department_id_encode &&
                                            touched.department_id_encode
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          placeholder="Select Department"
                                          // error={errors.gender && touched.gender}
                                        >
                                          <option value="">
                                            Select Department
                                          </option>
                                          {this.state.departmentList?.map(
                                            (item) => (
                                              <option key={item.id} value={item.id}>
                                                {item.department_name}
                                              </option>
                                            )
                                          )}
                                        </Field>
                                        <ErrorMessage
                                          name="department_id_encode"
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
                                        Designation
                                        <span className="text-danger">*</span>
                                      </label>
                                      <div className="control">
                                        <Field
                                          name="designation_id_encode"
                                          // value={this.state.designationList?.find(
                                          //   (option) => {
                                          //     return (
                                          //       option?.id ===
                                          //       values.designation_id_encode
                                          //     );
                                          //   }
                                          // )}
                                          value={values.designation_id_encode}
                                          as="select"
                                          className={`form-control ${
                                            errors.designation_id_encode &&
                                            touched.designation_id_encode
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          placeholder="Select Designation"
                                          // error={errors.gender && touched.gender}
                                        >
                                          <option value="">
                                            Select Designation
                                          </option>
                                          {this.state.designationList?.map(
                                            (item) => (
                                              <option  key={item.id}  value={item?.id}>
                                                {item?.designation_name}
                                              </option>
                                            )
                                          )}
                                        </Field>
                                        <ErrorMessage
                                          name="designation_id_encode"
                                          render={this.renderError}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Col>

                            <Col md={4}>
                              <Row>
                                <Col lg="12">
                                  <label
                                    className="form-label mb-2"
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

                            {!this.state.isEdit && (
                              <>
                                <Col md="4">
                                  <div className="mb-3">
                                    <div className="field">
                                      <label className="label" htmlFor="rating">
                                        Email
                                        <span className="text-danger">*</span>
                                      </label>

                                      <div className="control">
                                        <Field
                                          name="email"
                                          type="email"
                                          value={values.email}
                                          className={`form-control ${
                                            errors.email && touched.email
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          placeholder="Enter Email"
                                          error={errors.email && touched.email}
                                        />
                                        <ErrorMessage
                                          name="email"
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
                                        Password
                                        <span className="text-danger">*</span>
                                      </label>

                                      <div className="control">
                                        <Field
                                          name="password"
                                          type="password"
                                          value={values.password}
                                          className={`form-control ${
                                            errors.password && touched.password
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          placeholder="Enter Password"
                                          error={
                                            errors.password && touched.password
                                          }
                                        />
                                        <ErrorMessage
                                          name="password"
                                          render={this.renderError}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                              </>
                            )}

                            <Col md="4">
                              <div className="mb-3">
                                <div className="field">
                                  <label className="label" htmlFor="rating">
                                    Gender
                                    {/* <span className="text-danger">*</span> */}
                                  </label>
                                  <div className="control">
                                    <Field
                                      name="gender"
                                      value={values.gender}
                                      as="select"
                                      className={`form-control ${
                                        errors.gender && touched.gender
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      placeholder="Select Gender"
                                      // error={errors.gender && touched.gender}
                                    >
                                      <option value="">Select Gender</option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                    </Field>
                                    {/* <ErrorMessage
                                      name="gender"
                                      render={this.renderError}
                                    /> */}
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col md="4">
                              <div className="mb-3">
                                <div className="field">
                                  <label className="label" htmlFor="rating">
                                    Mobile<span className="text-danger">*</span>
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
                                      error={errors.mobile && touched.mobile}
                                    />
                                    <ErrorMessage
                                      name="mobile"
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
                                      // error={
                                      //     errors.address && touched.address
                                      // }
                                    />
                                    {/* <ErrorMessage
                                                                            name="address"
                                                                            render={this.renderError}
                                                                        /> */}
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col md="4">
                              <div className="mb-3">
                                <div className="field">
                                  <label className="label" htmlFor="rating">
                                    City<span className="text-danger">*</span>
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
                                    State<span className="text-danger">*</span>
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
                                    Country
                                    <span className="text-danger">*</span>
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
                                    Zip code
                                    <span className="text-danger">*</span>
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
                                      placeholder="Enter zip code"
                                      error={errors.zipcode && touched.zipcode}
                                      onChange={(e) => {
                                        setFieldValue(
                                          "zipcode",
                                          e.target.value.replace(/[^0-9]/g, "")
                                        );
                                      }}
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

export default CreateAdmin;
