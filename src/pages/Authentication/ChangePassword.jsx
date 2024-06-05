import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { CHANGE_PASSWORD } from "../../global";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const validationSchema = Yup.object({
    newpassword: Yup.string()
      // .min(8, "Minimum 8 characters")
      .required("Enter Password"),
    newrepassword: Yup.string()
      .oneOf([Yup.ref("newpassword")], "Password's not match")
      .required("Enter Re-type Password"),
  });

  const initialValues = {
    newpassword: "",
    newrepassword: "",
  };
  // const changePsw = async (data) => {

  //     const StoredData = localStorage.getItem("authUser");
  //     const Token = JSON.parse(StoredData);
  //     var userID = await localStorage.getItem("authUserId");

  //     await fetch(

  //         `${CHANGE_PASSWORD}`,
  //         {
  //             method: "POST",
  //             headers: {
  //                 Authorization: "Bearer " + Token.access_token,
  //                 Accept: "application/json",
  //                 "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ ...data, user_id: userID }),
  //         }
  //     )
  //         .then((res) => {
  //             return res.json();
  //         })
  //         .then((res) => {
  //             // if (res.result == true) {

  //                 toast("SuccessFully Change Password", {
  //                     type: "success",
  //                 });
  //                 // history.push(process.env.PUBLIC_URL + "/dashboard");
  //             // }
  //             // else {
  //             //     toast(res.message, {
  //             //         type: "warning",
  //             //     });
  //             // }
  //         })
  //         .catch((err) => {
  //
  //         });
  // };

  const changePsw = async (data) => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    var userID = await localStorage.getItem("authUserId");
    try {
      const response = await fetch(`${CHANGE_PASSWORD}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Token.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, user_id: userID }),
      });
      // if (!response.ok) {
      //     throw new Error("Network response was not ok");
      // }

      // Handle successful response
      if (response.status == 200) {
        toast("Change Password Successfully", {
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
  const renderError = (message) => <p className="text-danger">{message}</p>;

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Card>
            <CardBody>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  changePsw(values);
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
                        <Col md="12">
                          <div className="mb-3">
                            <div className="field">
                              <label className="label" htmlFor="rating">
                                New Password
                              </label>

                              <div className="control">
                                <Field
                                  name="newpassword"
                                  type="password"
                                  className={`form-control ${
                                    errors.newpassword && touched.newpassword
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Enter Password"
                                  error={
                                    errors.newpassword && touched.newpassword
                                  }
                                />
                                <ErrorMessage
                                  name="newpassword"
                                  render={renderError}
                                />
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col md="12">
                          <div className="mb-3">
                            <div className="field">
                              <label className="label" htmlFor="rating">
                                Re-type Password
                              </label>

                              <div className="control">
                                <Field
                                  name="newrepassword"
                                  type="password"
                                  className={`form-control ${
                                    errors.newpassword && touched.newpassword
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  placeholder="Enter Re-type Password"
                                  error={
                                    errors.newrepassword &&
                                    touched.newrepassword
                                  }
                                />
                                <ErrorMessage
                                  name="newrepassword"
                                  render={renderError}
                                />
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <Button
                        type="submit"
                        style={{
                          float: "right",
                          background: `var(--bs-header-bg`,
                          borderColor:'#fff'
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ChangePassword;
