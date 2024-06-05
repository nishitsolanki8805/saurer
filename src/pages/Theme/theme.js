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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import CustomFIleInput from "../../components/Common/CustomFIleInput";
import * as Yup from "yup";
import { GET_THEME_SETTING, TEST_MAIL, UPDATE_THEME_SETTING } from "../../global";

const isView = false;

export default class Theme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breadcrumbItems: [
        {
          title: "SAURER.",
          link: process.env.PUBLIC_URL + "/dashboard",
        },
        {
          title: isView === true ? "Theme Setting" : "Theme Setting",
          link: "#",
        },
      ],
      themeData: "",
      isWhiteBase64URL: "",
      isBlackBase64URL: "",
      fileData: null,
      isFaviconBase64URL: "",
      logoBase64: "",
      faviconfileData: null,
      formikRef: React.createRef(),
      showSuccessAlert: false,
      loading: true,
    };
  }
  componentDidMount() {
    this.getData();
  }
  async getData() {
    const Id = localStorage.getItem("authUserId");
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);

    await fetch(
      // "https://absoluteweb.org/propertymanagement/api/public/v1/findthemesettings/" +
      GET_THEME_SETTING,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + Token.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          // Convert logo URL to base64
          // const logoUrl = res.data.logo;
          const logoUrl = "https://dummyimage.com/300";
          fetch(logoUrl)
            .then((response) => response.blob())
            .then((blob) => {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                const base64Data = reader.result;
                // Update state with the base64 data
                this.setState({
                  themeData: res.data,
                  loading: false,
                  logoBase64: base64Data,
                  isFaviconBase64URL: res.data.favicon,
                  isWhiteBase64URL: res.data.white_logo,
                  isBlackBase64URL: res.data.logo,
                });
              };
            });

          // Convert favicon URL to base64
          // const faviconUrl = res.data?.favicon;
          const faviconUrl = "https://dummyimage.com/300";
          fetch(faviconUrl)
            .then((response) => response.blob())
            .then((blob) => {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                const base64Data = reader.result;
                // Update state with the base64 data
                this.setState({
                  faviconBase64: base64Data,
                  showSuccessAlert: true,
                });
              };
            });
        } else {
          toast(res.message, {
            type: "warning",
          });
          this.setState({ loading: false });
        }
      })
      .catch((err) => {
        // console.log(err);
        this.setState({ loading: false });
      });
  }
  async updateData(values) {
    const Id = localStorage.getItem("authUserId");
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    console.log("object--",values,Id)

    // return false;
    await fetch(
      // "https://absoluteweb.org/propertymanagement/api/public/v1/updatethemesettings/" +
      UPDATE_THEME_SETTING + Id,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Token.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("RES=====CREATE USERDATA===========", res.data);
        if (res) {
          toast("SuccessFully Updated theme setting", {
            type: "success",
          });
          localStorage.setItem("Theme", JSON.stringify(res.data));
          this.props.history.push("/theme");
        } else {
          toast.error(res.message, {
            type: "Failed to update theme setting",
          });
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  handleWhiteLogoBase64DataChange = (item) => {
    this.setState({ isWhiteBase64URL: item });
  };
  handleBlackLogoBase64DataChange = (item) => {
    this.setState({ isBlackBase64URL: item });
  };
  handleFaviconBase64DataChange = (item) => {
    this.setState({ isFaviconBase64URL: item });
  };

  handleFileDataChange = (file) => {
    this.setState({ fileData: file });
  };
  handleFaviconFileDataChange = (file) => {
    this.setState({ faviconfileData: file });
  };

  handleSubmit = (values, { setSubmitting }) => {
    toast.success("Form submitted successfully!");
    this.setState({ showSuccessAlert: true });
    setSubmitting(false);
  };

  validateForm = () => {
    const formik = this.state.formikRef.current;
    if (formik) {
      formik.validateForm().then((errors) => {
        if (Object.keys(errors).length > 0) {
          console.log("Form has validation errors:", errors);
        } else {
          // console.log("Form is valid. Proceed with navigation.", formik.values);
          // this.updateData(formik.values);
        }
      });
    }

    const formValues = formik.values;

    const blankFields = Object.keys(formValues).filter(
      (key) => !formValues[key]
    );
    if (blankFields.length > 0) {
      const newErrors = {};
      blankFields.forEach((field) => {
        newErrors[field] = "This field is required";
      });
      formik.setErrors(newErrors);
    }
  };
  async testMail() {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(TEST_MAIL, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
      },
    })

      .then((response) => {
        response.json().then((responseJson) => {
          if (responseJson.message == "Success") {
            toast.success("Mail Tested Successfully");
          }else{
            toast.warn("Mail Tested Failed!")
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      });

  }
  render() {
    const { loading } = this.state;
    const itemsLength = this.state.breadcrumbItems.length;
    const phoneRegExp =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Application Name is required"),
      email: Yup.string().required("Email is required"),
      mobile: Yup.string().matches(phoneRegExp, "Mobile number is required"),

      mailer: Yup.string().required("Mailer is required"),
      smtpemail: Yup.string().required("SMTP Email is required"),
      smtppassword: Yup.string().required("SMTP Password  is required"),
      port: Yup.string().required("Port  is required"),
      smtphost: Yup.string().required("SMTP Host is required"),
      ssl_tls_type: Yup.string().required("SSL TSL Type is required"),
    });
    if (loading) {
      return <div>Loading...</div>;
    }
    // console.log("data:image/png;base64," + this.state.themeData.name);
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Row className="align-items-center">
              <div className="d-flex justify-content-between">
                {/* <Col xs={12} lg={8} className="justify-content-center"> */}
                <div className="page-title-box d-flex align-items-center justify-content-center">
                  <h4 className="mb-0">Theme Setting</h4>
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
                {/* </Col> */}
                {/* <Col xs={12} lg={4} className="justify-content-center"> */}

                {/* </Col> */}
              </div>
            </Row>
            {this.state.loading ? (
              <h1>Loading...</h1>
            ) : (
              <Card>
                <CardBody>
                  <Formik
                    initialValues={{
                      name: this.state.themeData?.name,
                      email: this.state.themeData?.email,
                      mobile: this.state.themeData?.mobile,
                      address: this.state.themeData?.address,
                      description: this.state.themeData?.description,
                      google_play_store_link:
                        this.state.themeData?.google_play_store_link,
                      ios_play_store_link:
                        this.state.themeData?.ios_play_store_link,
                      recaptcha_key: this.state.themeData?.recaptcha_key,
                      recaptcha_secret: this.state.themeData?.recaptcha_secret,
                      facebook_link: this.state.themeData?.facebook_link,
                      mailer: this.state.themeData?.mailer,
                      smtpemail: this.state.themeData?.smtpemail,
                      smtppassword: this.state.themeData?.smtppassword,
                      port: this.state.themeData?.port,
                      youtube_link: this.state.themeData?.youtube_link,
                      instagram_link: this.state.themeData?.instagram_link,
                      smtphost: this.state.themeData?.smtphost,
                      ssl_tls_type: this.state.themeData?.ssl_tls_type,
                    }}
                    validationSchema={validationSchema}
                    // onSubmit={console.log("Enter in submit function")}
                    onSubmit={async (values) => {
                      console.log(
                        "object",
                        this.state.isBlackBase64URL.split(",")?.[1]
                      );
                      const updateValue = {
                        ...values,
                        white_logo_image_encode:
                          this.state.isWhiteBase64URL.split(",")?.[1],
                        logo_image_encode:
                          this.state.isBlackBase64URL.split(",")?.[1],
                        faviconencode:
                          this.state.isFaviconBase64URL.split(",")?.[1],
                      };
                      this.updateData(updateValue);
                    }}
                    innerRef={this.state.formikRef}
                  >
                    {({ isSubmitting, errors, touched, values }) => (
                      <Form className="needs-validation">
                        {this.state.showSuccessAlert && <ToastContainer />}
                        <Row>
                          <Col lg="4" className="mt-3">
                            <Label
                              className="form-label mb-3"
                              htmlFor="validationCustom04"
                            >
                              White Logo <span className="text-danger">*</span>
                            </Label>
                            <CustomFIleInput
                              name="  m"
                              onDataChange={this.handleFileDataChange}
                              onBase64Change={
                                this.handleWhiteLogoBase64DataChange
                              }
                              defaultFile={this.state.isWhiteBase64URL}
                              isView={isView}
                              className={
                                "form-control" +
                                (!this.state.fileData ? " is-invalid" : "")
                              }
                              error={this.state.fileData ? false : true} // Add this line to pass the error prop
                            />
                          </Col>
                          <Col lg="4" className="mt-3">
                            <Label
                              className="form-label mb-3"
                              htmlFor="validationCustom04"
                            >
                              Red Logo <span className="text-danger">*</span>
                            </Label>
                            <CustomFIleInput
                              name="  m"
                              onDataChange={this.handleFileDataChange}
                              onBase64Change={
                                this.handleBlackLogoBase64DataChange
                              }
                              defaultFile={this.state.isBlackBase64URL}
                              isView={isView}
                              className={
                                "form-control" +
                                (!this.state.fileData ? " is-invalid" : "")
                              }
                              error={this.state.fileData ? false : true} // Add this line to pass the error prop
                            />
                          </Col>
                          <Col lg="4" className="mt-3">
                            <Label
                              className="form-label mb-3"
                              htmlFor="validationCustom04"
                            >
                              Favicon Icon{" "}
                              <span className="text-danger">*</span>
                            </Label>
                            <CustomFIleInput
                              name="faviconfileData"
                              onDataChange={this.handleFaviconFileDataChange}
                              onBase64Change={
                                this.handleFaviconBase64DataChange
                              }
                              defaultFile={this.state.isFaviconBase64URL}
                              isView={isView}
                              error={
                                errors.faviconfileData &&
                                touched.faviconfileData
                              } // Add this line to pass the error prop
                              className={
                                "form-control" +
                                (errors.faviconfileData &&
                                touched.faviconfileData
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="12">
                            <Row className="mt-3">
                              <Col md="6">
                                <div className="mb-3">
                                  <Label htmlFor="name" className="form-label">
                                    Application Name{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Field
                                    type="text"
                                    value={values.name}
                                    name="name"
                                    className={
                                      "form-control" +
                                      (errors.name && touched.name
                                        ? " is-invalid"
                                        : "")
                                    }
                                    // placeholder={this.state.themeData?.name}
                                    disabled={isView}
                                  />
                                  <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label
                                    htmlFor="mobile"
                                    className="form-label"
                                  >
                                    Mobile{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Field
                                    type="numeric"
                                    name="mobile"
                                    value={values.mobile}
                                    className={
                                      "form-control" +
                                      (errors.mobile && touched.mobile
                                        ? " is-invalid"
                                        : "")
                                    }
                                    // placeholder="Enter mobile number"
                                    disabled={isView}
                                  />
                                  <ErrorMessage
                                    name="mobile"
                                    component="div"
                                    className="text-danger"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label htmlFor="email" className="form-label">
                                E-Mail <span className="text-danger">*</span>
                              </Label>
                              <Field
                                type="text"
                                value={values.email}
                                name="email"
                                className={
                                  "form-control" +
                                  (errors.email && touched.email
                                    ? " is-invalid"
                                    : "")
                                }
                                // placeholder="Enter Valid Email"
                                disabled={isView}
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </Col>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label htmlFor="mailer" className="form-label">
                                Mailer <span className="text-danger">*</span>
                              </Label>
                              <Field
                                type=" text"
                                name="mailer"
                                value={values.mailer}
                                className={
                                  "form-control" +
                                  (errors.mailer && touched.mailer
                                    ? " is-invalid"
                                    : "")
                                }
                                // placeholder="asd4sw"
                                disabled={isView}
                              />
                              <ErrorMessage
                                name="mailer"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6">
                            <div className="mb-3">
                              <Label htmlFor="address" className="form-label">
                                Address
                              </Label>
                              <Field
                                type="textarea"
                                name="address"
                                value={values.address}
                                className={
                                  "form-control" +
                                  (errors.address && touched.address
                                    ? " is-invalid"
                                    : "")
                                }
                                // placeholder="Address"
                                rows="3"
                                disabled={isView}
                              />
                              {/* <ErrorMessage
                                name="address"
                                component="div"
                                className="text-danger"
                              /> */}
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="mb-3">
                              <Label
                                htmlFor="description"
                                className="form-label"
                              >
                                Description
                              </Label>
                              <Field
                                type="textarea"
                                name="description"
                                value={values.description}
                                className={
                                  "form-control" +
                                  (errors.description && touched.description
                                    ? " is-invalid"
                                    : "")
                                }
                                // placeholder="Enter Description"
                                rows="3"
                                disabled={isView}
                              />
                              {/* <ErrorMessage
                                name="description"
                                component="div"
                                className="text-danger"
                              /> */}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label
                                htmlFor="recaptcha_key"
                                className="form-label"
                              >
                                Recaptcha Key
                              </Label>
                              <Field
                                type=" text"
                                name="recaptcha_key"
                                value={values.recaptcha_key}
                                className={
                                  "form-control" +
                                  (errors.recaptcha_key && touched.recaptcha_key
                                    ? " is-invalid"
                                    : "")
                                }
                                // placeholder="asd4sw"
                                disabled={isView}
                              />
                              {/* <ErrorMessage
                                name="recaptcha_key"
                                component="div"
                                className="text-danger"
                              /> */}
                            </div>
                          </Col>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label
                                htmlFor="recaptcha_secret"
                                className="form-label"
                              >
                                Recaptcha Secret
                              </Label>
                              <Field
                                type="text"
                                name="recaptcha_secret"
                                value={values.recaptcha_secret}
                                className={
                                  "form-control" +
                                  (errors.recaptcha_secret &&
                                  touched.recaptcha_secret
                                    ? " is-invalid"
                                    : "")
                                }
                                // placeholder="Enter mobile number"
                                disabled={isView}
                              />
                              {/* <ErrorMessage
                                name="recaptcha_secret"
                                component="div"
                                className="text-danger"
                              /> */}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label
                                htmlFor="google_play_store_link"
                                className="form-label"
                              >
                                Google Play Store Link
                              </Label>
                              <Field
                                type=" text"
                                name="google_play_store_link"
                                value={values.google_play_store_link}
                                className={
                                  "form-control" +
                                  (errors.google_play_store_link &&
                                  touched.google_play_store_link
                                    ? " is-invalid"
                                    : "")
                                }
                                // placeholder="asd5d"
                                disabled={isView}
                              />
                            </div>
                          </Col>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label
                                htmlFor="ios_play_store_link"
                                value={values.ios_play_store_link}
                                className="form-label"
                              >
                                IOS Play Store Link
                              </Label>
                              <Field
                                type="text"
                                name="ios_play_store_link"
                                className={
                                  "form-control" +
                                  (errors.ios_play_store_link &&
                                  touched.ios_play_store_link
                                    ? " is-invalid"
                                    : "")
                                }
                                // placeholder="52dd"
                                disabled={isView}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label
                                htmlFor="facebook_link"
                                className="form-label"
                              >
                                Facebook Link
                              </Label>
                              <Field
                                type=" text"
                                name="facebook_link"
                                value={values.facebook_link}
                                className={
                                  "form-control" +
                                  (errors.facebook_link && touched.facebook_link
                                    ? " is-invalid"
                                    : "")
                                }
                                // placeholder="asd4sw"
                                disabled={isView}
                              />
                            </div>
                          </Col>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label
                                htmlFor="instagram_link"
                                className="form-label"
                              >
                                Instagram Link
                              </Label>
                              <Field
                                type="text"
                                name="instagram_link"
                                value={values.instagram_link}
                                className={
                                  "form-control" +
                                  (errors.instagram_link &&
                                  touched.instagram_link
                                    ? " is-invalid"
                                    : "")
                                }
                                // placeholder="sdfds"
                                disabled={isView}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label
                                htmlFor="youtube_link"
                                value={values.youtube_link}
                                className="form-label"
                              >
                                Youtube Link
                              </Label>
                              <Field
                                type="text"
                                name="youtube_link"
                                className={
                                  "form-control" +
                                  (errors.youtube_link && touched.youtube_link
                                    ? " is-invalid"
                                    : "")
                                }
                                // placeholder="sdfds"
                                disabled={isView}
                              />
                            </div>
                          </Col>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label htmlFor="port" className="form-label">
                                Port <span className="text-danger">*</span>
                              </Label>
                              <Field
                                type=" text"
                                value={values.port}
                                name="port"
                                className={
                                  "form-control" +
                                  (errors.port && touched.port
                                    ? " is-invalid"
                                    : "")
                                }
                                // placeholder="asd4sw"
                                disabled={isView}
                              />
                              <ErrorMessage
                                name="port"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label htmlFor="smtphost" className="form-label">
                                SMTP Host <span className="text-danger">*</span>
                              </Label>
                              <Field
                                type=" text"
                                name="smtphost"
                                value={values.smtphost}
                                className={
                                  "form-control" +
                                  (errors.smtphost && touched.smtphost
                                    ? " is-invalid"
                                    : "")
                                }
                                // placeholder="SMTP Host"
                                disabled={isView}
                              />
                              <ErrorMessage
                                name="smtphost"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </Col>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label
                                htmlFor="smtppassword"
                                className="form-label"
                              >
                                SMTP Password{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <Field
                                type="text"
                                value={values.smtppassword}
                                name="smtppassword"
                                className={
                                  "form-control" +
                                  (errors.smtppassword && touched.smtppassword
                                    ? " is-invalid"
                                    : "")
                                }
                                // placeholder="sdfds"
                                disabled={isView}
                              />
                              <ErrorMessage
                                name="smtppassword"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <div className="mb-3">
                              <Label
                                htmlFor="ssl_tls_type"
                                className="form-label"
                              >
                                SSL TLS Type{" "}
                                <span className="text-danger">*</span>
                              </Label>
                              <Field
                                type="text"
                                value={values.ssl_tls_type}
                                name="ssl_tls_type"
                                className={
                                  "form-control" +
                                  (errors.ssl_tls_type && touched.ssl_tls_type
                                    ? " is-invalid"
                                    : "")
                                }
                                // placeholder="ssl_tls_type"
                                disabled={isView}
                              />
                              <ErrorMessage
                                name="ssl_tls_type"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </Col>
                        </Row>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Button
                              onClick={this.testMail}
                              className="mt-3"
                              style={{ margin: "0px 5px" }}
                              color="success"
                            >
                              Test Mail
                            </Button>
                          </div>
                          <div
                            style={{ display: "flex", justifyContent: "end" }}
                          >
                            {!isView && (
                              <Button
                                onClick={this.validateForm}
                                className="mt-3"
                                style={{ float: "right" }}
                                color="primary"
                                type="submit"
                                disabled={isSubmitting}
                              >
                                Save
                              </Button>
                            )}

                            <Button
                              // onSubmit={this.}
                              className="mt-3"
                              style={{ margin: "0px 5px" }}
                              color="danger"
                            >
                              Cancel
                            </Button>
                          </div>
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
