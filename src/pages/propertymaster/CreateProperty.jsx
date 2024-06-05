import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  TabContent,
  TabPane,
  NavItem,
  NavLink,
  Form,
  Container,
  Button,
  BreadcrumbItem,
  Breadcrumb,
} from "reactstrap";

import classnames from "classnames";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
// import './radiocard.css'

//Import Breadcrumb
import RadioSelect from "./RadioSelect";
import RadioSelectForType from "./RadioSelectForType";
import {
  CREATE_PROPERTY_MASTER,
  DELETE_OWNERSHIP_USER_BY_ID,
  DELETE_UNIT_BY_ID,
  GET_ALL_USER,
  GET_PROPERTY_MASTER_BY_ID,
  GET_PROPERTY_TYPE_NO_PAGE,
  UPDATE_PROPERTY_MASTER_BY_ID,
} from "../../global";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CustomFileInputFieldArray from "../../components/Common/CustomFIleInputFieladArray";
import { toast } from "react-toastify";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";

class CreateProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        {
          title: "SAURER.",
          link: process.env.PUBLIC_URL + "/dashboard",
        },
        {
          title: "Property Master",
          link: process.env.PUBLIC_URL + "/property-list",
        },
        {
          title: this.props.match.params.id
            ? "Edit Property"
            : "Create Property",
          link: "#",
        },
      ],
      isEdit: false,
      activeTab: 1,
      activeTabProgress: 1,
      progressValue: 25,
      isLoading: false,
      adminList: [],
      partnerList: [],
      clientList: [],
      firstStep: {},
      secondStep: {},
      dataByID: {},
      getAllPropertyType: [],
      unitArray: [],
      isPartner: false,
      themData: "",
    };
    this.toggleTab.bind(this);
    this.toggleTabProgress.bind(this);
    this.updateLoading = this.updateLoading.bind(this);
    this.isHandleChangePartner = this.isHandleChangePartner.bind(this);
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      if (tab >= 1 && tab <= 3) {
        this.setState({
          activeTab: tab,
        });
      }
    }
  }

  toggleTabProgress(tab) {
    if (this.state.activeTabProgress !== tab) {
      if (tab >= 1 && tab <= 3) {
        this.setState({
          activeTabProgress: tab,
        });

        if (tab === 1) {
          this.setState({ progressValue: 25 });
        }
        if (tab === 2) {
          this.setState({ progressValue: 50 });
        }
        if (tab === 3) {
          this.setState({ progressValue: 75 });
        }
        // if (tab === 4) { this.setState({ progressValue: 100 }) }
      }
    }
  }
  property_master_details_val = {
    units_name: "",
    units_beds: "",
    units_baths: "",
    units_size: "",
    market_rent: "",
    property_photo_1: "",
    property_photo_2: "",
    property_photo_3: "",
    property_status: "",
  };
  // componentDidMount() {
  //     this.getAllAdmin()
  //     this.getAllClient()
  //     this.getAllPartner()
  // }
  getAllAdmin = async () => {
    const StoredData = localStorage.getItem("authUser");
    // const ThemeStoredData = localStorage.getItem("theme_data");
    const ThemeStoredData = localStorage.getItem("Theme");
    const themData = JSON.parse(ThemeStoredData);
    console.log("TheameData", themData);
    this.setState({ themData: themData });
    const Token = JSON.parse(StoredData);
    await fetch(GET_ALL_USER, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        per_page: "",
        field_db: "role_id",
        search_val: "NxOpZowo9GmjKqdR",
        pagination: "no-pagination",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // this.setState({
        //     isLoading: false
        // })
        if (res.data) {
          // setAllUserData(res.data);
          // console.log('data---', res.data)
          this.setState({
            adminList: res.data,
          });
        } else {
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  getAllClient = async (id) => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_ALL_USER, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        per_page: "",
        field_db: "role_id",
        search_val: "XbPW7awNkzl83LD6",
        pagination: "no-pagination",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // this.setState({
        //     isLoading: false
        // })
        if (res.data) {
          // setAllUserData(res.data);
          this.setState({
            clientList: res.data,
          });
        } else {
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  getAllPartner = async (id) => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_ALL_USER, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        per_page: "",
        field_db: "role_id",
        search_val: "aYOxlpzRMwrX3gD7",
        pagination: "no-pagination",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // this.setState({
        //     isLoading: false
        // })
        if (res.data) {
          // setAllUserData(res.data);
          this.setState({
            partnerList: res.data,
          });
        } else {
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  componentDidMount() {
    this.getAllAdmin();
    this.getAllClient();
    this.getAllPartner();
    const id = this.props.match.params.id;
    if (!id) {
      this.getPropertyType();
    }

    if (id) {
      this.setState({ isEdit: true });
      this.GetPropertyById(id);
    }
  }
  async GetPropertyById(id, type) {
    this.setState({ isLoading: true });
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_PROPERTY_MASTER_BY_ID + id, {
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
            this.getPropertyType();
            // this.setState({ isLoading: false });
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  async getPropertyType() {
    if (!this.state.isEdit) {
      this.setState({ isLoading: true });
    }
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_PROPERTY_TYPE_NO_PAGE, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        response.json().then((responseJson) => {
          if (responseJson.data) {
            this.setState({
              getAllPropertyType: responseJson.data,
            });
            this.setState({ isLoading: false });
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  createProperty = async (data) => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    console.log("dataatatat", data);
    try {
      const response = await fetch(CREATE_PROPERTY_MASTER, {
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
        toast("Property Created Successfully", {
          type: "success",
        });
        this.props.history.goBack();
      } else {
        toast("Unable to Create", {
          type: "warning",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };
  updateProperty = async (data) => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    try {
      const response = await fetch(
        UPDATE_PROPERTY_MASTER_BY_ID + this.state.dataByID.id,
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
        toast("Property Update Successfully", {
          type: "success",
        });
        this.props.history.goBack();
      } else {
        toast("Unable to Create", {
          type: "warning",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };
  async deleteUnitById(id) {
    // this.setState({ isLoading: true });

    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(DELETE_UNIT_BY_ID + id, {
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
        console.log(response);
        response.json().then((responseJson) => {
          if (responseJson.data) {
            // this.setState({ taskById: responseJson.data })
            // this.setState({ isLoading: false });
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  async deleteUser(id) {
    // this.setState({ isLoading: true });

    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(DELETE_OWNERSHIP_USER_BY_ID + id, {
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
        console.log(response);
        response.json().then((responseJson) => {
          if (responseJson.data) {
            // this.setState({ taskById: responseJson.data })
            // this.setState({ isLoading: false });
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  // handleSubmit(event, values) {
  //     if (this.state.activeTab == 1) {
  //         this.StepOneSubmit(event, values);
  //     }
  //     else if (this.state.activeTab == 2) {
  //         this.StepTwoSubmit(event, values);
  //         this.getAllContacts();
  //     }
  //     else if (this.state.activeTab == 3) {
  //         this.StepThreeSubmit(event, values);
  //         // console.log(values, "=======>valuesStepThreeSubmit")
  //     }
  //     else if (this.state.activeTab == 4) {
  //         this.StepFourSubmit(event, values);
  //         // this.props.history.push('/parasmanierp/marketingleadlist');
  //         // this.getAllMarketinglists();
  //     }
  //     else if (this.state.activeTab == 5) {
  //         this.StepFiveSubmit(event, values);
  //         // this.props.history.push('/parasmanierp/marketingleadlist');
  //         this.getAllMarketinglists();
  //     }
  //     else {
  //         return
  //     }
  //     return

  // }

  updateLoading(loading) {
    this.setState({ isLoading: loading });
  }
  isHandleChangePartner(val) {
    this.setState({ isPartner: val });
  }

  renderError = (message) => <p className="text-danger">{message}</p>;

  render() {
    const itemsLength = this.state.breadcrumbItems.length;

    const partnerAdminarr = [
      ...this.state.adminList,
      ...this.state.partnerList,
    ];
    console.log("isPartner---", this.state.isPartner);
    const { themData } = this.state;
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
                      ? "Edit Property"
                      : "Create Property"}
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
              <Row>
                <Col lg="12">
                  <Card>
                    <CardBody>
                      {/* <h4 className="card-title mb-4">Basic pills Wizard</h4> */}

                      <div
                        id="basic-pills-wizard"
                        className="twitter-bs-wizard"
                      >
                        <ul className="twitter-bs-wizard-nav nav nav-pills nav-justified">
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: this.state.activeTab === 1,
                              })}
                              onClick={() => {
                                // this.toggleTab(1);
                              }}
                            >
                              <span className="step-number">01</span>
                              <span className="step-title">Type</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: this.state.activeTab === 2,
                              })}
                              onClick={() => {
                                // this.toggleTab(2);
                              }}
                            >
                              <span className="step-number">02</span>
                              <span className="step-title">Address</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: this.state.activeTab === 3,
                              })}
                              onClick={() => {
                                // this.toggleTab(3);
                              }}
                            >
                              <span className="step-number">03</span>
                              <span className="step-title">Unit</span>
                            </NavLink>
                          </NavItem>
                          {/* <NavItem>
                                                    <NavLink className={classnames({ active: this.state.activeTab === 4 })} onClick={() => { this.toggleTab(4); }} >
                                                        <span className="step-number">04</span>
                                                        <span className="step-title">Confirm Detail</span>
                                                    </NavLink>
                                                </NavItem> */}
                        </ul>
                        <TabContent
                          activeTab={this.state.activeTab}
                          className="twitter-bs-wizard-tab-content"
                        >
                          <TabPane tabId={1}>
                            <Formik
                              initialValues={{
                                type_id: this.state.isEdit
                                  ? this.state.dataByID?.type_id
                                  : "",
                                type: this.state.isEdit
                                  ? this.state.dataByID.type
                                  : "",
                                property_owner: this.state.isEdit
                                  ? this.state.dataByID.property_owner
                                  : "",
                                // property_owner_id: this.state.isEdit ? this.state.dataByID.property_owner_id : "",
                                property_owner_commission_amount: this.state
                                  .isEdit
                                  ? this.state.dataByID
                                      .property_owner_commission_amount
                                  : themData?.partner_client_commision,
                                property_owner_commission_percentage: this.state
                                  .isEdit
                                  ? this.state.dataByID
                                      .property_owner_commission_percentage
                                  : themData?.partner_client_min_percentage,
                                property_share: this.state.isEdit
                                  ? this.state.dataByID.property_share_details
                                  : [
                                      {
                                        id: "",
                                        pro_property_master_id: "",
                                        property_owner_id: "",
                                        ownership_share: "",
                                      },
                                    ],
                              }}
                              validationSchema={
                                this.state.isPartner
                                  ? Yup.object().shape({
                                      type: Yup.string().required(
                                        "Type is required"
                                      ),
                                      property_owner: Yup.string().required(
                                        "Property Owner is required"
                                      ),

                                      property_owner_commission_amount:
                                        Yup.number()
                                          .typeError(
                                            "Commission Amount must be a number"
                                          )
                                          .required(
                                            "Commission Amount is required"
                                          ),
                                      property_owner_commission_percentage:
                                        Yup.number()
                                          .typeError(
                                            "Commission Percentage must be a number"
                                          )
                                          .required(
                                            "Commission Percentage is required"
                                          )
                                          .min(
                                            0,
                                            "Commission Percentage must be greater than or equal to 0"
                                          )
                                          .max(
                                            100,
                                            "Commission Percentage must be less than or equal to 100"
                                          ),
                                      property_share: Yup.array().of(
                                        Yup.object().shape({
                                          ownership_share: Yup.number()
                                            .required(
                                              "Ownership share is required"
                                            )
                                            .typeError(
                                              "Ownership share must be a number"
                                            )
                                            .min(
                                              0,
                                              "Ownership share must be greater than or equal to 0"
                                            )
                                            .max(
                                              100,
                                              "Ownership share must be less than or equal to 100"
                                            ),
                                          property_owner_id:
                                            Yup.string().required(
                                              "Select User is required"
                                            ),
                                        })
                                      ),
                                    })
                                  : Yup.object().shape({
                                      type: Yup.string().required(
                                        "Type is required"
                                      ),
                                      property_owner: Yup.string().required(
                                        "Property Owner is required"
                                      ),
                                      // property_owner_id: Yup.string().required("Property Owner ID is required"),

                                      property_owner_commission_amount:
                                        Yup.number()
                                          .typeError(
                                            "Commission Amount must be a number"
                                          )
                                          .required(
                                            "Commission Amount is required"
                                          ),
                                      property_owner_commission_percentage:
                                        Yup.number()
                                          .typeError(
                                            "Commission Percentage must be a number"
                                          )
                                          .required(
                                            "Commission Percentage is required"
                                          )
                                          .min(
                                            0,
                                            "Commission Percentage must be greater than or equal to 0"
                                          )
                                          .max(
                                            100,
                                            "Commission Percentage must be less than or equal to 100"
                                          ),
                                      property_share: Yup.array().of(
                                        Yup.object().shape({
                                          ownership_share: Yup.number()
                                            .required(
                                              "Ownership share is required"
                                            )
                                            .typeError(
                                              "Ownership share must be a number"
                                            )
                                            .min(
                                              0,
                                              "Ownership share must be greater than or equal to 0"
                                            )
                                            .max(
                                              100,
                                              "Ownership share must be less than or equal to 100"
                                            ),
                                          property_owner_id:
                                            Yup.string().required(
                                              "Select User is required"
                                            ),
                                        })
                                      ),
                                    })
                              }
                              onSubmit={(values) => {
                                // console.log("values--", values);
                                const sumOwnershipShare =
                                  values.property_share.reduce((sum, item) => {
                                    if (
                                      item.hasOwnProperty("ownership_share")
                                    ) {
                                      return (
                                        parseInt(sum) +
                                        parseInt(item.ownership_share || 0)
                                      );
                                    }
                                    return sum;
                                  }, 0);
                                if (sumOwnershipShare <= 100) {
                                  this.setState({
                                    firstStep: values,
                                  });
                                  this.toggleTab(this.state.activeTab + 1);
                                } else {
                                  toast.warning(
                                    "Sum Of Ownership Share Not Greter Than 100"
                                  );
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
                                <Form onSubmit={handleSubmit}>
                                  <div>
                                    <Row>
                                      <Row>
                                        <Col lg={1}></Col>
                                        <Col lg={10}>
                                          <RadioSelectForType
                                            setFieldValue={setFieldValue}
                                            updateLoading={this.updateLoading}
                                            values={
                                              this.state.isEdit
                                                ? this.state.dataByID.type_id
                                                : values.type_id
                                            }
                                            getAllPropertyType={
                                              this.state.getAllPropertyType
                                            }
                                          />
                                          <div style={{ textAlign: "center" }}>
                                            <ErrorMessage
                                              name="type"
                                              render={this.renderError}
                                            />
                                          </div>
                                        </Col>
                                        <Col lg={1}></Col>
                                        <Col lg={4}></Col>
                                        <Col lg={4}>
                                          <div style={{ textAlign: "center" }}>
                                            <label
                                              className="label"
                                              htmlFor="rating"
                                              style={{
                                                fontWeight: "700",
                                                fontSize: "24px",
                                                paddingLeft: "20px",
                                              }}
                                            >
                                              Select Property Owner
                                            </label>
                                          </div>

                                          <RadioSelect
                                            defaultValue={
                                              this.state.dataByID.property_owner
                                            }
                                            setFieldValue={setFieldValue}
                                            values={values.property_owner}
                                            handleIsPartner={(val) => {
                                              this.isHandleChangePartner(val);
                                              if (this.state.isEdit) {
                                                if (
                                                  this.state.dataByID
                                                    .property_owner ===
                                                  values.property_owner
                                                ) {
                                                  this.GetPropertyById(
                                                    this.props.match?.params
                                                      ?.id,
                                                    "edit"
                                                  );
                                                }
                                              }
                                            }}
                                            isEdit={this.state.isEdit}
                                            isEditData={values.property_share}
                                          />

                                          <div style={{ textAlign: "center" }}>
                                            <ErrorMessage
                                              name="property_owner"
                                              render={this.renderError}
                                            />
                                          </div>
                                        </Col>
                                        <Col lg={4}></Col>
                                      </Row>
                                      <Row>
                                        {/* Select Admin Role Id */}
                                        {values.property_owner ==
                                          "NxOpZowo9GmjKqdR" && (
                                          <>
                                            <Col lg={4}>
                                              <FieldArray name="property_share">
                                                {({ push, remove }) => (
                                                  <>
                                                    {values.property_share?.map(
                                                      (_, index) =>
                                                        index < 1 ? (
                                                          <div
                                                            key={index}
                                                            style={{}}
                                                          >
                                                            <div className="mb-3">
                                                              <div className="field">
                                                                <label
                                                                  className="label"
                                                                  htmlFor="rating"
                                                                >
                                                                  Admin
                                                                  <span className="text-danger">
                                                                    *
                                                                  </span>
                                                                </label>
                                                                <Autocomplete
                                                                  name={`property_share[${index}].property_owner_id`}
                                                                  id="size-small-outlined"
                                                                  size="small"
                                                                  options={
                                                                    this.state
                                                                      .adminList
                                                                  }
                                                                  getOptionLabel={(
                                                                    option
                                                                  ) =>
                                                                    `${option.first_name} ${option.last_name}`
                                                                  }
                                                                  // value={this.state.adminList.find(option => option?.id === values?.property_owner_id)}
                                                                  value={this.state.adminList.find(
                                                                    (
                                                                      option
                                                                    ) => {
                                                                      return (
                                                                        option?.id ===
                                                                        values
                                                                          .property_share[
                                                                          index
                                                                        ]
                                                                          .property_owner_id
                                                                      );
                                                                    }
                                                                  )}
                                                                  onChange={(
                                                                    e,
                                                                    newValue
                                                                  ) => {
                                                                    setFieldValue(
                                                                      `property_share[${index}].property_owner_id`,
                                                                      newValue?.id
                                                                    );
                                                                    setFieldValue(
                                                                      `property_share[${index}].ownership_share`,
                                                                      100
                                                                    );
                                                                    // setFieldValue(`property_owner_id`, 'XbPW7awNkzl83LD6')
                                                                  }}
                                                                  renderInput={(
                                                                    params
                                                                  ) => (
                                                                    <TextField
                                                                      {...params}
                                                                      placeholder="Enter Admin"
                                                                    />
                                                                  )}
                                                                />
                                                                {errors.property_share &&
                                                                  errors
                                                                    .property_share[
                                                                    index
                                                                  ] &&
                                                                  errors
                                                                    .property_share[
                                                                    index
                                                                  ]
                                                                    .property_owner_id &&
                                                                  touched.property_share &&
                                                                  touched
                                                                    .property_share[
                                                                    index
                                                                  ] &&
                                                                  touched
                                                                    .property_share[
                                                                    index
                                                                  ]
                                                                    .property_owner_id && (
                                                                    <div className="text-danger">
                                                                      {
                                                                        errors
                                                                          .property_share[
                                                                          index
                                                                        ]
                                                                          .property_owner_id
                                                                      }
                                                                    </div>
                                                                  )}
                                                              </div>
                                                            </div>
                                                          </div>
                                                        ) : (
                                                          <></>
                                                        )
                                                    )}
                                                  </>
                                                )}
                                              </FieldArray>
                                            </Col>
                                            <Col lg={4}>
                                              <div className="mb-3">
                                                <div className="field">
                                                  <label
                                                    className="label"
                                                    htmlFor="rating"
                                                  >
                                                    Property Owner Commission
                                                    Amount ($)
                                                  </label>
                                                  <div className="control">
                                                    <Field
                                                      // disabled
                                                      name="property_owner_commission_amount"
                                                      value={
                                                        values.property_owner_commission_amount
                                                      }
                                                      type="number"
                                                      className={`form-control ${
                                                        errors.property_owner_commission_amount &&
                                                        touched.property_owner_commission_amount
                                                          ? "is-invalid"
                                                          : ""
                                                      }`}
                                                      placeholder="Enter Property Owner Commission Amount"
                                                      error={
                                                        errors.property_owner_commission_amount &&
                                                        touched.property_owner_commission_amount
                                                      }
                                                      onChange={handleChange} // Ensure to call handleChange
                                                      onBlur={handleBlur}
                                                    />
                                                    <ErrorMessage
                                                      name="property_owner_commission_amount"
                                                      render={this.renderError}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </Col>
                                            <Col lg={4}>
                                              <div className="mb-3">
                                                <div className="field">
                                                  <label
                                                    className="label"
                                                    htmlFor="rating"
                                                  >
                                                    Commission (%)
                                                  </label>
                                                  <div className="control">
                                                    <Field
                                                      // disabled
                                                      name="property_owner_commission_percentage"
                                                      value={
                                                        values.property_owner_commission_percentage
                                                      }
                                                      type="number"
                                                      className={`form-control ${
                                                        errors.property_owner_commission_percentage &&
                                                        touched.property_owner_commission_percentage
                                                          ? "is-invalid"
                                                          : ""
                                                      }`}
                                                      placeholder="Enter Property Owner Commission Amount"
                                                      error={
                                                        errors.property_owner_commission_percentage &&
                                                        touched.property_owner_commission_percentage
                                                      }
                                                      onChange={handleChange} // Ensure to call handleChange
                                                      onBlur={handleBlur}
                                                    />
                                                    <ErrorMessage
                                                      name="property_owner_commission_percentage"
                                                      render={this.renderError}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </Col>
                                          </>
                                        )}
                                        {/* Select Client Role Id*/}
                                        {values.property_owner ==
                                          "XbPW7awNkzl83LD6" && (
                                          // <>
                                          //   <FieldArray name="property_share">
                                          //     {({ push, remove }) => (
                                          //       <>
                                          //         <Row>
                                          //           <Col lg={12}>
                                          //             <Button
                                          //               variant="outlined"
                                          //               style={{
                                          //                 float: "right",
                                          //               }}
                                          //               onClick={() =>
                                          //                 push({
                                          //                   ownership_share: "",
                                          //                   property_owner_id:
                                          //                     "",
                                          //                 })
                                          //               }
                                          //             >
                                          //               Add Client
                                          //             </Button>
                                          //           </Col>
                                          //         </Row>
                                          //         {values.property_share?.map(
                                          //           (_, index) => (
                                          //             <div
                                          //               key={index}
                                          //               style={{}}
                                          //             >
                                          //               {/* <div className="mb-3">
                                          //                   <div className="field">
                                          //                     <label
                                          //                       className="label"
                                          //                       htmlFor="rating"
                                          //                     >
                                          //                       Client
                                          //                       <span className="text-danger">
                                          //                         *
                                          //                       </span>
                                          //                     </label>
                                          //                     <Autocomplete
                                          //                       name={`property_share[${index}].property_owner_id`}
                                          //                       id="size-small-outlined"
                                          //                       size="small"
                                          //                       options={
                                          //                         this.state
                                          //                           .clientList
                                          //                       }
                                          //                       getOptionLabel={(
                                          //                         option
                                          //                       ) =>
                                          //                         option.first_name
                                          //                       }
                                          //                       // value={this.state.clientList.find(option => option?.id === values?.property_owner_id)}
                                          //                       value={this.state.clientList.find(
                                          //                         (option) =>
                                          //                           option?.id ===
                                          //                           values
                                          //                             .property_share[
                                          //                             index
                                          //                           ]
                                          //                             .property_owner_id
                                          //                       )}
                                          //                       onChange={(
                                          //                         e,
                                          //                         newValue
                                          //                       ) => {
                                          //                         setFieldValue(
                                          //                           `property_share[${index}].property_owner_id`,
                                          //                           newValue?.id
                                          //                         );
                                          //                         setFieldValue(
                                          //                           `property_share[${index}].ownership_share`,
                                          //                           100
                                          //                         );
                                          //                         // setFieldValue(`property_owner_id`, 'XbPW7awNkzl83LD6')
                                          //                       }}
                                          //                       renderInput={(
                                          //                         params
                                          //                       ) => (
                                          //                         <TextField
                                          //                           {...params}
                                          //                           placeholder="Enter Client"
                                          //                         />
                                          //                       )}
                                          //                     />
                                          //                     {errors.property_share &&
                                          //                       errors
                                          //                         .property_share[
                                          //                         index
                                          //                       ] &&
                                          //                       errors
                                          //                         .property_share[
                                          //                         index
                                          //                       ]
                                          //                         .property_owner_id &&
                                          //                       touched.property_share &&
                                          //                       touched
                                          //                         .property_share[
                                          //                         index
                                          //                       ] &&
                                          //                       touched
                                          //                         .property_share[
                                          //                         index
                                          //                       ]
                                          //                         .property_owner_id && (
                                          //                         <div className="text-danger">
                                          //                           {
                                          //                             errors
                                          //                               .property_share[
                                          //                               index
                                          //                             ]
                                          //                               .property_owner_id
                                          //                           }
                                          //                         </div>
                                          //                       )}
                                          //                   </div>
                                          //                 </div> */}
                                          //               <Row lg={14}>
                                          //                 <Col lg={6}>
                                          //                   <div className="mb-3">
                                          //                     <div className="field">
                                          //                       <label
                                          //                         className="label"
                                          //                         htmlFor="rating"
                                          //                       >
                                          //                         User
                                          //                         <span className="text-danger">
                                          //                           *
                                          //                         </span>
                                          //                       </label>
                                          //                       <Autocomplete
                                          //                         name={`property_share[${index}].property_owner_id`}
                                          //                         id="size-small-outlined"
                                          //                         size="small"
                                          //                         options={
                                          //                           this.state
                                          //                             .clientList
                                          //                         }
                                          //                         getOptionLabel={(
                                          //                           option
                                          //                         ) =>
                                          //                           option.first_name
                                          //                         }
                                          //                         // value={this.state.clientList.find(option => option?.id === values?.property_owner_id)}
                                          //                         value={this.state.clientList.find(
                                          //                           (option) =>
                                          //                             option?.id ===
                                          //                             values
                                          //                               .property_share[
                                          //                               index
                                          //                             ]
                                          //                               .property_owner_id
                                          //                         )}
                                          //                         onChange={(
                                          //                           e,
                                          //                           newValue
                                          //                         ) => {
                                          //                           setFieldValue(
                                          //                             `property_share[${index}].property_owner_id`,
                                          //                             newValue?.id
                                          //                           );
                                          //                           // setFieldValue(`property_owner_id`, 'XbPW7awNkzl83LD6')
                                          //                         }}
                                          //                         renderInput={(
                                          //                           params
                                          //                         ) => (
                                          //                           <TextField
                                          //                             {...params}
                                          //                             placeholder="Enter Client"
                                          //                           />
                                          //                         )}
                                          //                       />
                                          //                       {errors.property_share &&
                                          //                         errors
                                          //                           .property_share[
                                          //                           index
                                          //                         ] &&
                                          //                         errors
                                          //                           .property_share[
                                          //                           index
                                          //                         ]
                                          //                           .property_owner_id &&
                                          //                         touched.property_share &&
                                          //                         touched
                                          //                           .property_share[
                                          //                           index
                                          //                         ] &&
                                          //                         touched
                                          //                           .property_share[
                                          //                           index
                                          //                         ]
                                          //                           .property_owner_id && (
                                          //                           <div className="text-danger">
                                          //                             {
                                          //                               errors
                                          //                                 .property_share[
                                          //                                 index
                                          //                               ]
                                          //                                 .property_owner_id
                                          //                             }
                                          //                           </div>
                                          //                         )}
                                          //                     </div>
                                          //                   </div>
                                          //                 </Col>
                                          //                 <Col
                                          //                   lg={
                                          //                     index > 0
                                          //                       ? values.property_owner ==
                                          //                         "XbPW7awNkzl83LD6"
                                          //                         ? 5
                                          //                         : 6
                                          //                       : 6
                                          //                   }
                                          //                 >
                                          //                   <div className="mb-3">
                                          //                     <div className="field">
                                          //                       <label
                                          //                         className="label"
                                          //                         htmlFor={`property_share[${index}].ownership_share`}
                                          //                       >
                                          //                         Ownership
                                          //                         Share (%)
                                          //                         <span className="text-danger">
                                          //                           *
                                          //                         </span>
                                          //                       </label>
                                          //                       <div className="control">
                                          //                         <Field
                                          //                           name={`property_share[${index}].ownership_share`}
                                          //                           value={
                                          //                             values
                                          //                               .property_share[
                                          //                               index
                                          //                             ]
                                          //                               .ownership_share
                                          //                           }
                                          //                           type="number"
                                          //                           className={`form-control ${
                                          //                             errors.property_share &&
                                          //                             errors
                                          //                               .property_share[
                                          //                               index
                                          //                             ] &&
                                          //                             errors
                                          //                               .property_share[
                                          //                               index
                                          //                             ]
                                          //                               .ownership_share &&
                                          //                             touched.property_share &&
                                          //                             touched
                                          //                               .property_share[
                                          //                               index
                                          //                             ] &&
                                          //                             touched
                                          //                               .property_share[
                                          //                               index
                                          //                             ]
                                          //                               .ownership_share
                                          //                               ? "is-invalid"
                                          //                               : ""
                                          //                           }`}
                                          //                           placeholder="Enter ownership share"
                                          //                           onChange={
                                          //                             handleChange
                                          //                           } // Ensure to call handleChange
                                          //                           onBlur={
                                          //                             handleBlur
                                          //                           }
                                          //                         />
                                          //                         {errors.property_share &&
                                          //                           errors
                                          //                             .property_share[
                                          //                             index
                                          //                           ] &&
                                          //                           errors
                                          //                             .property_share[
                                          //                             index
                                          //                           ]
                                          //                             .ownership_share &&
                                          //                           touched.property_share &&
                                          //                           touched
                                          //                             .property_share[
                                          //                             index
                                          //                           ] &&
                                          //                           touched
                                          //                             .property_share[
                                          //                             index
                                          //                           ]
                                          //                             .ownership_share && (
                                          //                             <div className="text-danger">
                                          //                               {
                                          //                                 errors
                                          //                                   .property_share[
                                          //                                   index
                                          //                                 ]
                                          //                                   .ownership_share
                                          //                               }
                                          //                             </div>
                                          //                           )}
                                          //                       </div>
                                          //                     </div>
                                          //                   </div>
                                          //                 </Col>
                                          //                 {index > 0 && (
                                          //                   <Col lg={1}>
                                          //                     <Button
                                          //                       className="danger"
                                          //                       style={{
                                          //                         marginTop:
                                          //                           "29px",
                                          //                         marginBottom:
                                          //                           "29px",
                                          //                       }}
                                          //                       onClick={() => {
                                          //                         remove(index);
                                          //                       }}
                                          //                     >
                                          //                       Delete
                                          //                     </Button>
                                          //                   </Col>
                                          //                 )}
                                          //               </Row>
                                          //             </div>
                                          //           )
                                          //         )}
                                          //       </>
                                          //     )}
                                          //   </FieldArray>

                                          //   <Row>
                                          //     <Col lg={6}>
                                          //       <div className="mb-3">
                                          //         <div className="field">
                                          //           <label
                                          //             className="label"
                                          //             htmlFor="rating"
                                          //           >
                                          //             Property Owner Commission
                                          //             Amount ($)
                                          //           </label>
                                          //           <div className="control">
                                          //             <Field
                                          //               // disabled
                                          //               name="property_owner_commission_amount"
                                          //               value={
                                          //                 values.property_owner_commission_amount
                                          //               }
                                          //               type="number"
                                          //               className={`form-control ${
                                          //                 errors.property_owner_commission_amount &&
                                          //                 touched.property_owner_commission_amount
                                          //                   ? "is-invalid"
                                          //                   : ""
                                          //               }`}
                                          //               placeholder="Enter Property Owner Commission Amount"
                                          //               error={
                                          //                 errors.property_owner_commission_amount &&
                                          //                 touched.property_owner_commission_amount
                                          //               }
                                          //               onChange={handleChange} // Ensure to call handleChange
                                          //               onBlur={handleBlur}
                                          //             />
                                          //             <ErrorMessage
                                          //               name="property_owner_commission_amount"
                                          //               render={
                                          //                 this.renderError
                                          //               }
                                          //             />
                                          //           </div>
                                          //         </div>
                                          //       </div>
                                          //     </Col>
                                          //     <Col lg={6}>
                                          //       <div className="mb-3">
                                          //         <div className="field">
                                          //           <label
                                          //             className="label"
                                          //             htmlFor="rating"
                                          //           >
                                          //             Commission (%)
                                          //           </label>
                                          //           <div className="control">
                                          //             <Field
                                          //               // disabled
                                          //               name="property_owner_commission_percentage"
                                          //               value={
                                          //                 values.property_owner_commission_percentage
                                          //               }
                                          //               type="number"
                                          //               className={`form-control ${
                                          //                 errors.property_owner_commission_percentage &&
                                          //                 touched.property_owner_commission_percentage
                                          //                   ? "is-invalid"
                                          //                   : ""
                                          //               }`}
                                          //               placeholder="Enter Property Owner Commission Amount"
                                          //               error={
                                          //                 errors.property_owner_commission_percentage &&
                                          //                 touched.property_owner_commission_percentage
                                          //               }
                                          //               onChange={handleChange} // Ensure to call handleChange
                                          //               onBlur={handleBlur}
                                          //             />
                                          //             <ErrorMessage
                                          //               name="property_owner_commission_percentage"
                                          //               render={
                                          //                 this.renderError
                                          //               }
                                          //             />
                                          //           </div>
                                          //         </div>
                                          //       </div>
                                          //     </Col>
                                          //   </Row>
                                          // </>

                                          <>
                                            <FieldArray name="property_share">
                                              {({ push, remove }) => (
                                                <>
                                                  <Row>
                                                    <Col lg={12}>
                                                      <Button
                                                        variant="outlined"
                                                        style={{
                                                          float: "right",
                                                        }}
                                                        onClick={() =>
                                                          push({
                                                            ownership_share: "",
                                                            property_owner_id:
                                                              "",
                                                          })
                                                        }
                                                      >
                                                        Add Client
                                                      </Button>
                                                    </Col>
                                                  </Row>
                                                  {values.property_share?.map(
                                                    (_, index) => (
                                                      <div
                                                        key={index}
                                                        style={
                                                          {
                                                            // padding: '15px 20px',
                                                            // boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)',
                                                            // borderRadius: '10px',
                                                            // margin: '20px 0px'
                                                          }
                                                        }
                                                      >
                                                        <Row lg={14}>
                                                          <Col lg={6}>
                                                            <div className="mb-3">
                                                              <div className="field">
                                                                <label
                                                                  className="label"
                                                                  htmlFor="rating"
                                                                >
                                                                  User
                                                                  <span className="text-danger">
                                                                    *
                                                                  </span>
                                                                </label>
                                                                <Autocomplete
                                                                  name={`property_share[${index}].property_owner_id`}
                                                                  id="size-small-outlined"
                                                                  className="x"
                                                                  size="small"
                                                                  options={
                                                                    this.state
                                                                      .clientList
                                                                  }
                                                                  getOptionLabel={(
                                                                    option
                                                                  ) =>
                                                                    `${option.first_name} ${option.last_name}`
                                                                  }
                                                                  value={this.state.clientList.find(
                                                                    (option) =>
                                                                      option?.id ===
                                                                      values
                                                                        .property_share[
                                                                        index
                                                                      ]
                                                                        .property_owner_id
                                                                  )}
                                                                  onChange={(
                                                                    e,
                                                                    newValue
                                                                  ) => {
                                                                    setFieldValue(
                                                                      `property_share[${index}].property_owner_id`,
                                                                      newValue?.id
                                                                    );
                                                                    // setFieldValue(`property_owner_id`, 'XbPW7awNkzl83LD6')
                                                                  }}
                                                                  renderInput={(
                                                                    params
                                                                  ) => (
                                                                    <TextField
                                                                      className={`form-control ${
                                                                        errors.property_share &&
                                                                        errors
                                                                          .property_share[
                                                                          index
                                                                        ] &&
                                                                        errors
                                                                          .property_share[
                                                                          index
                                                                        ]
                                                                          .property_owner_id &&
                                                                        touched.property_share &&
                                                                        touched
                                                                          .property_share[
                                                                          index
                                                                        ] &&
                                                                        touched
                                                                          .property_share[
                                                                          index
                                                                        ]
                                                                          .property_owner_id
                                                                          ? "is-invalid"
                                                                          : ""
                                                                      }`}
                                                                      {...params}
                                                                      placeholder="Enter User"
                                                                    />
                                                                  )}
                                                                />
                                                                {errors.property_share &&
                                                                  errors
                                                                    .property_share[
                                                                    index
                                                                  ] &&
                                                                  errors
                                                                    .property_share[
                                                                    index
                                                                  ]
                                                                    .property_owner_id &&
                                                                  touched.property_share &&
                                                                  touched
                                                                    .property_share[
                                                                    index
                                                                  ] &&
                                                                  touched
                                                                    .property_share[
                                                                    index
                                                                  ]
                                                                    .property_owner_id && (
                                                                    <div className="text-danger">
                                                                      {
                                                                        errors
                                                                          .property_share[
                                                                          index
                                                                        ]
                                                                          .property_owner_id
                                                                      }
                                                                    </div>
                                                                  )}
                                                              </div>
                                                            </div>
                                                          </Col>
                                                          <Col
                                                            lg={
                                                              index > 0
                                                                ? values.property_owner ==
                                                                  "XbPW7awNkzl83LD6"
                                                                  ? 5
                                                                  : 6
                                                                : 6
                                                            }
                                                          >
                                                            <div className="mb-3">
                                                              <div className="field">
                                                                <label
                                                                  className="label"
                                                                  htmlFor={`property_share[${index}].ownership_share`}
                                                                >
                                                                  Ownership
                                                                  Share (%)
                                                                  <span className="text-danger">
                                                                    *
                                                                  </span>
                                                                </label>
                                                                <div className="control">
                                                                  <Field
                                                                    name={`property_share[${index}].ownership_share`}
                                                                    value={
                                                                      values
                                                                        .property_share[
                                                                        index
                                                                      ]
                                                                        .ownership_share
                                                                    }
                                                                    type="number"
                                                                    className={`form-control ${
                                                                      errors.property_share &&
                                                                      errors
                                                                        .property_share[
                                                                        index
                                                                      ] &&
                                                                      errors
                                                                        .property_share[
                                                                        index
                                                                      ]
                                                                        .ownership_share &&
                                                                      touched.property_share &&
                                                                      touched
                                                                        .property_share[
                                                                        index
                                                                      ] &&
                                                                      touched
                                                                        .property_share[
                                                                        index
                                                                      ]
                                                                        .ownership_share
                                                                        ? "is-invalid"
                                                                        : ""
                                                                    }`}
                                                                    placeholder="Enter ownership share"
                                                                    onChange={
                                                                      handleChange
                                                                    } // Ensure to call handleChange
                                                                    onBlur={
                                                                      handleBlur
                                                                    }
                                                                  />
                                                                  {errors.property_share &&
                                                                    errors
                                                                      .property_share[
                                                                      index
                                                                    ] &&
                                                                    errors
                                                                      .property_share[
                                                                      index
                                                                    ]
                                                                      .ownership_share &&
                                                                    touched.property_share &&
                                                                    touched
                                                                      .property_share[
                                                                      index
                                                                    ] &&
                                                                    touched
                                                                      .property_share[
                                                                      index
                                                                    ]
                                                                      .ownership_share && (
                                                                      <div className="text-danger">
                                                                        {
                                                                          errors
                                                                            .property_share[
                                                                            index
                                                                          ]
                                                                            .ownership_share
                                                                        }
                                                                      </div>
                                                                    )}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </Col>
                                                          {index > 0 && (
                                                            <Col lg={1}>
                                                              <Button
                                                                className="danger"
                                                                style={{
                                                                  marginTop:
                                                                    "29px",
                                                                  marginBottom:
                                                                    "29px",
                                                                }}
                                                                onClick={() => {
                                                                  console.log(
                                                                    "property_share",
                                                                    values.property_share
                                                                  );
                                                                  remove(index);
                                                                  this.deleteUser(
                                                                    values
                                                                      .property_share[
                                                                      index
                                                                    ].id
                                                                  );
                                                                }}
                                                              >
                                                                Delete
                                                              </Button>
                                                            </Col>
                                                          )}
                                                        </Row>
                                                      </div>
                                                    )
                                                  )}
                                                </>
                                              )}
                                            </FieldArray>
                                            <Col lg={6}>
                                              <div className="mb-3">
                                                <div className="field">
                                                  <label
                                                    className="label"
                                                    htmlFor="rating"
                                                  >
                                                    Property Owner Commission
                                                    Amount ($)
                                                  </label>
                                                  <div className="control">
                                                    <Field
                                                      // disabled
                                                      name="property_owner_commission_amount"
                                                      value={
                                                        values.property_owner_commission_amount
                                                      }
                                                      type="number"
                                                      className={`form-control ${
                                                        errors.property_owner_commission_amount &&
                                                        touched.property_owner_commission_amount
                                                          ? "is-invalid"
                                                          : ""
                                                      }`}
                                                      placeholder="Enter Property Owner Commission Amount"
                                                      error={
                                                        errors.property_owner_commission_amount &&
                                                        touched.property_owner_commission_amount
                                                      }
                                                      onChange={handleChange} // Ensure to call handleChange
                                                      onBlur={handleBlur}
                                                    />
                                                    <ErrorMessage
                                                      name="property_owner_commission_amount"
                                                      render={this.renderError}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </Col>
                                            <Col lg={6}>
                                              <div className="mb-3">
                                                <div className="field">
                                                  <label
                                                    className="label"
                                                    htmlFor="rating"
                                                  >
                                                    Commission (%)
                                                  </label>
                                                  <div className="control">
                                                    <Field
                                                      // disabled
                                                      name="property_owner_commission_percentage"
                                                      value={
                                                        values.property_owner_commission_percentage
                                                      }
                                                      type="number"
                                                      className={`form-control ${
                                                        errors.property_owner_commission_percentage &&
                                                        touched.property_owner_commission_percentage
                                                          ? "is-invalid"
                                                          : ""
                                                      }`}
                                                      placeholder="Enter Property Owner Commission Amount"
                                                      error={
                                                        errors.property_owner_commission_percentage &&
                                                        touched.property_owner_commission_percentage
                                                      }
                                                      onChange={handleChange} // Ensure to call handleChange
                                                      onBlur={handleBlur}
                                                    />
                                                    <ErrorMessage
                                                      name="property_owner_commission_percentage"
                                                      render={this.renderError}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </Col>
                                          </>
                                        )}
                                        {/* Select Partner Role Id*/}
                                        {values.property_owner ==
                                          "aYOxlpzRMwrX3gD7" && (
                                          <>
                                            <FieldArray name="property_share">
                                              {({ push, remove }) => (
                                                <>
                                                  <Row>
                                                    <Col lg={12}>
                                                      <Button
                                                        variant="outlined"
                                                        style={{
                                                          float: "right",
                                                        }}
                                                        onClick={() =>
                                                          push({
                                                            ownership_share: "",
                                                            property_owner_id:
                                                              "",
                                                          })
                                                        }
                                                      >
                                                        Add Partner
                                                      </Button>
                                                    </Col>
                                                  </Row>
                                                  {values.property_share?.map(
                                                    (_, index) => (
                                                      <div
                                                        key={index}
                                                        style={
                                                          {
                                                            // padding: '15px 20px',
                                                            // boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)',
                                                            // borderRadius: '10px',
                                                            // margin: '20px 0px'
                                                          }
                                                        }
                                                      >
                                                        <Row lg={14}>
                                                          <Col lg={6}>
                                                            <div className="mb-3">
                                                              <div className="field">
                                                                <label
                                                                  className="label"
                                                                  htmlFor="rating"
                                                                >
                                                                  User
                                                                  <span className="text-danger">
                                                                    *
                                                                  </span>
                                                                </label>
                                                                <Autocomplete
                                                                  name={`property_share[${index}].property_owner_id`}
                                                                  id="size-small-outlined"
                                                                  className="x"
                                                                  size="small"
                                                                  options={
                                                                    partnerAdminarr
                                                                  }
                                                                  getOptionLabel={(
                                                                    option
                                                                  ) =>
                                                                    `${option.first_name} ${option.last_name}`
                                                                  }
                                                                  value={partnerAdminarr.find(
                                                                    (option) =>
                                                                      option?.id ===
                                                                      values
                                                                        .property_share[
                                                                        index
                                                                      ]
                                                                        .property_owner_id
                                                                  )}
                                                                  onChange={(
                                                                    e,
                                                                    newValue
                                                                  ) => {
                                                                    setFieldValue(
                                                                      `property_share[${index}].property_owner_id`,
                                                                      newValue?.id
                                                                    );
                                                                    // setFieldValue(`property_owner_id`, 'XbPW7awNkzl83LD6')
                                                                  }}
                                                                  renderInput={(
                                                                    params
                                                                  ) => (
                                                                    <TextField
                                                                      className={`form-control ${
                                                                        errors.property_share &&
                                                                        errors
                                                                          .property_share[
                                                                          index
                                                                        ] &&
                                                                        errors
                                                                          .property_share[
                                                                          index
                                                                        ]
                                                                          .property_owner_id &&
                                                                        touched.property_share &&
                                                                        touched
                                                                          .property_share[
                                                                          index
                                                                        ] &&
                                                                        touched
                                                                          .property_share[
                                                                          index
                                                                        ]
                                                                          .property_owner_id
                                                                          ? "is-invalid"
                                                                          : ""
                                                                      }`}
                                                                      {...params}
                                                                      placeholder="Enter User"
                                                                    />
                                                                  )}
                                                                />
                                                                {errors.property_share &&
                                                                  errors
                                                                    .property_share[
                                                                    index
                                                                  ] &&
                                                                  errors
                                                                    .property_share[
                                                                    index
                                                                  ]
                                                                    .property_owner_id &&
                                                                  touched.property_share &&
                                                                  touched
                                                                    .property_share[
                                                                    index
                                                                  ] &&
                                                                  touched
                                                                    .property_share[
                                                                    index
                                                                  ]
                                                                    .property_owner_id && (
                                                                    <div className="text-danger">
                                                                      {
                                                                        errors
                                                                          .property_share[
                                                                          index
                                                                        ]
                                                                          .property_owner_id
                                                                      }
                                                                    </div>
                                                                  )}
                                                              </div>
                                                            </div>
                                                          </Col>
                                                          <Col
                                                            lg={
                                                              index > 0
                                                                ? values.property_owner ==
                                                                  "aYOxlpzRMwrX3gD7"
                                                                  ? 5
                                                                  : 6
                                                                : 6
                                                            }
                                                          >
                                                            <div className="mb-3">
                                                              <div className="field">
                                                                <label
                                                                  className="label"
                                                                  htmlFor={`property_share[${index}].ownership_share`}
                                                                >
                                                                  Ownership
                                                                  Share (%)
                                                                  <span className="text-danger">
                                                                    *
                                                                  </span>
                                                                </label>
                                                                <div className="control">
                                                                  <Field
                                                                    name={`property_share[${index}].ownership_share`}
                                                                    value={
                                                                      values
                                                                        .property_share[
                                                                        index
                                                                      ]
                                                                        .ownership_share
                                                                    }
                                                                    type="number"
                                                                    className={`form-control ${
                                                                      errors.property_share &&
                                                                      errors
                                                                        .property_share[
                                                                        index
                                                                      ] &&
                                                                      errors
                                                                        .property_share[
                                                                        index
                                                                      ]
                                                                        .ownership_share &&
                                                                      touched.property_share &&
                                                                      touched
                                                                        .property_share[
                                                                        index
                                                                      ] &&
                                                                      touched
                                                                        .property_share[
                                                                        index
                                                                      ]
                                                                        .ownership_share
                                                                        ? "is-invalid"
                                                                        : ""
                                                                    }`}
                                                                    placeholder="Enter ownership share"
                                                                    onChange={
                                                                      handleChange
                                                                    } // Ensure to call handleChange
                                                                    onBlur={
                                                                      handleBlur
                                                                    }
                                                                  />
                                                                  {errors.property_share &&
                                                                    errors
                                                                      .property_share[
                                                                      index
                                                                    ] &&
                                                                    errors
                                                                      .property_share[
                                                                      index
                                                                    ]
                                                                      .ownership_share &&
                                                                    touched.property_share &&
                                                                    touched
                                                                      .property_share[
                                                                      index
                                                                    ] &&
                                                                    touched
                                                                      .property_share[
                                                                      index
                                                                    ]
                                                                      .ownership_share && (
                                                                      <div className="text-danger">
                                                                        {
                                                                          errors
                                                                            .property_share[
                                                                            index
                                                                          ]
                                                                            .ownership_share
                                                                        }
                                                                      </div>
                                                                    )}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </Col>
                                                          {index > 0 && (
                                                            <Col lg={1}>
                                                              <Button
                                                                className="danger"
                                                                style={{
                                                                  marginTop:
                                                                    "29px",
                                                                  marginBottom:
                                                                    "29px",
                                                                }}
                                                                onClick={() => {
                                                                  remove(index);
                                                                  this.deleteUser(
                                                                    values
                                                                      .property_share[
                                                                      index
                                                                    ].id
                                                                  );
                                                                }}
                                                              >
                                                                Delete
                                                              </Button>
                                                            </Col>
                                                          )}
                                                        </Row>
                                                      </div>
                                                    )
                                                  )}
                                                </>
                                              )}
                                            </FieldArray>
                                            <Col lg={6}>
                                              <div className="mb-3">
                                                <div className="field">
                                                  <label
                                                    className="label"
                                                    htmlFor="rating"
                                                  >
                                                    Property Owner Commission
                                                    Amount ($)
                                                  </label>
                                                  <div className="control">
                                                    <Field
                                                      // disabled
                                                      name="property_owner_commission_amount"
                                                      value={
                                                        values.property_owner_commission_amount
                                                      }
                                                      type="number"
                                                      className={`form-control ${
                                                        errors.property_owner_commission_amount &&
                                                        touched.property_owner_commission_amount
                                                          ? "is-invalid"
                                                          : ""
                                                      }`}
                                                      placeholder="Enter Property Owner Commission Amount"
                                                      error={
                                                        errors.property_owner_commission_amount &&
                                                        touched.property_owner_commission_amount
                                                      }
                                                      onChange={handleChange} // Ensure to call handleChange
                                                      onBlur={handleBlur}
                                                    />
                                                    <ErrorMessage
                                                      name="property_owner_commission_amount"
                                                      render={this.renderError}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </Col>
                                            <Col lg={6}>
                                              <div className="mb-3">
                                                <div className="field">
                                                  <label
                                                    className="label"
                                                    htmlFor="rating"
                                                  >
                                                    Commission (%)
                                                  </label>
                                                  <div className="control">
                                                    <Field
                                                      // disabled
                                                      name="property_owner_commission_percentage"
                                                      value={
                                                        values.property_owner_commission_percentage
                                                      }
                                                      type="number"
                                                      className={`form-control ${
                                                        errors.property_owner_commission_percentage &&
                                                        touched.property_owner_commission_percentage
                                                          ? "is-invalid"
                                                          : ""
                                                      }`}
                                                      placeholder="Enter Property Owner Commission Amount"
                                                      error={
                                                        errors.property_owner_commission_percentage &&
                                                        touched.property_owner_commission_percentage
                                                      }
                                                      onChange={handleChange} // Ensure to call handleChange
                                                      onBlur={handleBlur}
                                                    />
                                                    <ErrorMessage
                                                      name="property_owner_commission_percentage"
                                                      render={this.renderError}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </Col>
                                          </>
                                        )}
                                      </Row>
                                    </Row>

                                    <div className="d-flex justify-content-between mt-3">
                                      <Button
                                        color="primary"
                                        className={
                                          this.state.activeTab === 1
                                            ? "previous disabled"
                                            : "previous"
                                        }
                                        onClick={() => {
                                          this.toggleTab(1);
                                        }}
                                      >
                                        {" "}
                                        Previous
                                      </Button>
                                      <Button
                                        color="primary"
                                        type="submit"
                                        style={{ float: "right" }}
                                      >
                                        Next
                                      </Button>
                                    </div>
                                  </div>
                                </Form>
                              )}
                            </Formik>
                          </TabPane>
                          <TabPane tabId={2}>
                            <Formik
                              initialValues={{
                                property_address_1: this.state.isEdit
                                  ? this.state.dataByID?.property_address_1
                                  : "",
                                property_address_2: this.state.isEdit
                                  ? this.state.dataByID?.property_address_2
                                  : "",
                                property_city: this.state.isEdit
                                  ? this.state.dataByID?.property_city
                                  : "",
                                property_state: this.state.isEdit
                                  ? this.state.dataByID?.property_state
                                  : "",
                                property_country: this.state.isEdit
                                  ? this.state.dataByID?.property_country
                                  : "",
                                property_zipcode: this.state.isEdit
                                  ? this.state.dataByID?.property_zipcode
                                  : "",
                                property_name: this.state.isEdit
                                  ? this.state.dataByID?.property_name
                                  : "",
                                firm_name: this.state.isEdit
                                  ? this.state.dataByID?.firm_name
                                  : "",
                                property_purchase_price: this.state.isEdit
                                  ? this.state.dataByID?.property_purchase_price
                                  : "",
                                property_purchase_date: this.state.isEdit
                                  ? this.state.dataByID?.property_purchase_date
                                  : "",
                                property_current_market_value: this.state.isEdit
                                  ? this.state.dataByID
                                      ?.property_current_market_value
                                  : "",
                              }}
                              validationSchema={Yup.object().shape({
                                // property_address_1: Yup.string().required(
                                //   "Office Address is required"
                                // ),
                                property_address_2: Yup.string().required(
                                  "Property Address is required"
                                ),
                                property_name: Yup.string().required(
                                  "Property Name is required"
                                ),
                                firm_name: Yup.string().required(
                                  "Firm Name is required"
                                ),
                                property_city:
                                  Yup.string().required("City is required"),
                                property_state:
                                  Yup.string().required("State is required"),
                                property_country: Yup.string().required(
                                  "Country is required"
                                ),
                                property_zipcode: Yup.string()
                                  .required("Zipcode is required")
                                  .min(5, "zip code have minimum five digits")
                                  .max(5, "zip code have maximum five digits"),
                                property_purchase_price: Yup.number().min(
                                  0,
                                  "Property Purchase Price Should Be Greater Than 0"
                                )
                                .nullable(),
                                property_current_market_value: Yup.number().min(
                                  0,
                                  "Property Current Market Price Should Be Greater Than 0"
                                ).nullable(),
                              })}
                              onSubmit={(values) => {
                                // console.log("values--", values);
                                // Proceed to the next tab
                                this.setState({
                                  secondStep: values,
                                });
                                this.toggleTab(this.state.activeTab + 1);
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
                                <Form onSubmit={handleSubmit}>
                                  <div>
                                    <Row>
                                      <Row>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <div className="field">
                                              <label
                                                className="label"
                                                htmlFor="rating"
                                              >
                                                Property Name
                                                <span className="text-danger">
                                                  *
                                                </span>
                                              </label>
                                              <div className="control">
                                                <Field
                                                  name="property_name"
                                                  value={values.property_name}
                                                  type="text"
                                                  className={`form-control ${
                                                    errors.property_name &&
                                                    touched.property_name
                                                      ? "is-invalid"
                                                      : ""
                                                  }`}
                                                  placeholder="Enter Property name"
                                                  error={
                                                    errors.property_name &&
                                                    touched.property_name
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="property_name"
                                                  render={this.renderError}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </Col>
                                        <Col lg={6}>
                                          <div className="mb-3">
                                            <div className="field">
                                              <label
                                                className="label"
                                                htmlFor="rating"
                                              >
                                                Firm Name
                                                <span className="text-danger">
                                                  *
                                                </span>
                                              </label>
                                              <div className="control">
                                                <Field
                                                  name="firm_name"
                                                  value={values.firm_name}
                                                  type="text"
                                                  className={`form-control ${
                                                    errors.firm_name &&
                                                    touched.firm_name
                                                      ? "is-invalid"
                                                      : ""
                                                  }`}
                                                  placeholder="Enter Firm name"
                                                  error={
                                                    errors.firm_name &&
                                                    touched.firm_name
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="firm_name"
                                                  render={this.renderError}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col lg={4}>
                                          <div className="mb-3">
                                            <div className="field">
                                              <label
                                                className="label"
                                                htmlFor="rating"
                                              >
                                                Property Purchase Price
                                              </label>
                                              <div className="control">
                                                <Field
                                                  name="property_purchase_price"
                                                  value={
                                                    values.property_purchase_price
                                                  }
                                                  type="number"
                                                  className={`form-control ${
                                                    errors.property_purchase_price &&
                                                    touched.property_purchase_price
                                                      ? "is-invalid"
                                                      : ""
                                                  }`}
                                                  placeholder="Enter Property Purchase Price"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <ErrorMessage
                                            name="property_purchase_price"
                                            render={this.renderError}
                                          />
                                        </Col>
                                        <Col lg={4}>
                                          <label
                                            className="property_purchase_date"
                                            htmlFor={`property_purchase_date`}
                                          >
                                            Property Purchase Date
                                          </label>

                                          <Flatpickr
                                            name="property_purchase_date"
                                            // data-enable-time
                                            value={
                                              new Date(
                                                values.property_purchase_date
                                              )
                                            }
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

                                              const formattedDate = `${year}-${month}-${day}`;
                                              setFieldValue(
                                                "property_purchase_date",
                                                formattedDate
                                              );
                                            }}
                                            className={`form-control ${
                                              errors.property_purchase_date &&
                                              touched.property_purchase_date
                                                ? "is-invalid"
                                                : ""
                                            }`}
                                            placeholder="Enter Property Purchase Date"
                                            options={{
                                              // enableTime: true,
                                              dateFormat: "m-d-Y",
                                            }}
                                          />
                                        </Col>
                                        <Col lg={4}>
                                          <div className="mb-3">
                                            <div className="field">
                                              <label
                                                className="label"
                                                htmlFor="rating"
                                              >
                                                Property Current Market Value
                                              </label>
                                              <div className="control">
                                                <Field
                                                  name="property_current_market_value"
                                                  value={
                                                    values.property_current_market_value
                                                  }
                                                  type="number"
                                                  className={`form-control ${
                                                    errors.property_current_market_value &&
                                                    touched.property_current_market_value
                                                      ? "is-invalid"
                                                      : ""
                                                  }`}
                                                  placeholder="Enter Current Market Value"
                                                  error={
                                                    errors.property_current_market_value &&
                                                    touched.property_current_market_value
                                                  }
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <ErrorMessage
                                            name="property_current_market_value"
                                            render={this.renderError}
                                          />
                                        </Col>
                                      </Row>
                                      <Row>
                                        {/* <Col lg={4}>
                                          <div className="mb-3">
                                            <div className="field">
                                              <label
                                                className="label"
                                                htmlFor="rating"
                                              >
                                                Office Address
                                                <span className="text-danger">
                                                  *
                                                </span>
                                              </label>
                                              <div className="control">
                                                <Field
                                                  name="property_address_1"
                                                  value={
                                                    values.property_address_1
                                                  }
                                                  type="text"
                                                  className={`form-control ${
                                                    errors.property_address_1 &&
                                                    touched.property_address_1
                                                      ? "is-invalid"
                                                      : ""
                                                  }`}
                                                  placeholder="Enter office Address"
                                                  error={
                                                    errors.property_address_1 &&
                                                    touched.property_address_1
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="property_address_1"
                                                  render={this.renderError}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </Col> */}
                                        <Col lg={4}>
                                          <div className="mb-3">
                                            <div className="field">
                                              <label
                                                className="label"
                                                htmlFor="rating"
                                              >
                                                Property Address
                                                <span className="text-danger">
                                                  *
                                                </span>
                                              </label>
                                              <div className="control">
                                                <Field
                                                  name="property_address_2"
                                                  value={
                                                    values.property_address_2
                                                  }
                                                  type="text"
                                                  className={`form-control ${
                                                    errors.property_address_2 &&
                                                    touched.property_address_2
                                                      ? "is-invalid"
                                                      : ""
                                                  }`}
                                                  placeholder="Enter Property Address"
                                                  error={
                                                    errors.property_address_2 &&
                                                    touched.property_address_2
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="property_address_2"
                                                  render={this.renderError}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </Col>
                                        <Col lg={4}>
                                          <div className="mb-3">
                                            <div className="field">
                                              <label
                                                className="label"
                                                htmlFor="rating"
                                              >
                                                City
                                                <span className="text-danger">
                                                  *
                                                </span>
                                              </label>
                                              <div className="control">
                                                <Field
                                                  name="property_city"
                                                  value={values.property_city}
                                                  type="text"
                                                  className={`form-control ${
                                                    errors.property_city &&
                                                    touched.property_city
                                                      ? "is-invalid"
                                                      : ""
                                                  }`}
                                                  placeholder="Enter Property City"
                                                  error={
                                                    errors.property_city &&
                                                    touched.property_city
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="property_city"
                                                  render={this.renderError}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </Col>

                                        <Col lg={4}>
                                          <div className="mb-3">
                                            <div className="field">
                                              <label
                                                className="label"
                                                htmlFor="rating"
                                              >
                                                State
                                                <span className="text-danger">
                                                  *
                                                </span>
                                              </label>
                                              <div className="control">
                                                <Field
                                                  name="property_state"
                                                  value={values.property_state}
                                                  type="text"
                                                  className={`form-control ${
                                                    errors.property_state &&
                                                    touched.property_state
                                                      ? "is-invalid"
                                                      : ""
                                                  }`}
                                                  placeholder="Enter Property State"
                                                  error={
                                                    errors.property_state &&
                                                    touched.property_state
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="property_state"
                                                  render={this.renderError}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </Col>
                                        <Col lg={4}>
                                          <div className="mb-3">
                                            <div className="field">
                                              <label
                                                className="label"
                                                htmlFor="rating"
                                              >
                                                Country
                                                <span className="text-danger">
                                                  *
                                                </span>
                                              </label>
                                              <div className="control">
                                                <Field
                                                  name="property_country"
                                                  value={
                                                    values.property_country
                                                  }
                                                  type="text"
                                                  className={`form-control ${
                                                    errors.property_country &&
                                                    touched.property_country
                                                      ? "is-invalid"
                                                      : ""
                                                  }`}
                                                  placeholder="Enter Country"
                                                  error={
                                                    errors.property_country &&
                                                    touched.property_country
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="property_country"
                                                  render={this.renderError}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </Col>

                                        <Col lg={4}>
                                          <div className="mb-3">
                                            <div className="field">
                                              <label
                                                className="label"
                                                htmlFor="rating"
                                              >
                                                Zip Code
                                                <span className="text-danger">
                                                  *
                                                </span>
                                              </label>
                                              <div className="control">
                                                <Field
                                                  name="property_zipcode"
                                                  value={
                                                    values.property_zipcode
                                                  }
                                                  type="text"
                                                  className={`form-control ${
                                                    errors.property_zipcode &&
                                                    touched.property_zipcode
                                                      ? "is-invalid"
                                                      : ""
                                                  }`}
                                                  onChange={(e) => {
                                                    setFieldValue(
                                                      "property_zipcode",
                                                      e.target.value.replace(
                                                        /[^0-9]/g,
                                                        ""
                                                      )
                                                    );
                                                  }}
                                                  placeholder="Enter Property Zipcode"
                                                  error={
                                                    errors.property_zipcode &&
                                                    touched.property_zipcode
                                                  }
                                                />
                                                <ErrorMessage
                                                  name="property_zipcode"
                                                  render={this.renderError}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Row>

                                    <div className="d-flex justify-content-between mt-3">
                                      <Button
                                        color="primary"
                                        className={
                                          this.state.activeTab === 1
                                            ? "previous disabled"
                                            : "previous"
                                        }
                                        onClick={() => {
                                          this.toggleTab(1);
                                        }}
                                      >
                                        {" "}
                                        Previous
                                      </Button>
                                      <Button
                                        color="primary"
                                        type="submit"
                                        style={{ float: "right" }}
                                      >
                                        Next
                                      </Button>
                                    </div>
                                  </div>
                                </Form>
                              )}
                            </Formik>
                          </TabPane>
                          <TabPane tabId={3}>
                            <div>
                              <Formik
                                initialValues={{
                                  property_master_details: this.state.isEdit
                                    ? this.state.dataByID
                                        .property_master_details
                                    : [
                                        {
                                          units_name: "",
                                          units_beds: "",
                                          units_baths: "",
                                          units_size: "",
                                          market_rent: "",
                                          property_photo_1: "",
                                          property_photo_2: "",
                                          property_photo_3: "",
                                          property_status: "1",
                                          // property_status: ""
                                        },
                                      ],
                                }}
                                validationSchema={Yup.object().shape({
                                  property_master_details: Yup.array().of(
                                    Yup.object().shape({
                                      units_name: Yup.string().required(
                                        "Units Name is required"
                                      ),
                                      property_status: Yup.string().required(
                                        "Select Property status is required"
                                      ),
                                      units_beds: Yup.number()
                                        .required("Beds is required")
                                        .positive(
                                          "Beds must be a positive number"
                                        ),
                                      units_baths: Yup.number()
                                        .required("Baths is required")
                                        .positive(
                                          "Baths must be a positive number"
                                        ),
                                      // units_size: Yup.number()
                                      //   .required("Size is required")
                                      //   .positive(
                                      //     "Size must be a positive number"
                                      //   ),
                                      market_rent: Yup.number()
                                        .required("Market Rent is required")
                                        .positive(
                                          "Market Rent must be a positive number"
                                        ),
                                      // property_photo_1: Yup.string().required(
                                      //   "Photo one is required"
                                      // ),
                                      property_photo_1: Yup.string(),
                                      property_photo_2: Yup.string(),
                                      property_photo_3: Yup.string(),
                                      // property_status: Yup.string().required("Status is required")
                                    })
                                  ),
                                })}
                                onSubmit={(values) => {
                                  // console.log("final value ----", { ...this.state.firstStep, ...this.state.secondStep, ...values });
                                  const { property_share, ...newData } =
                                    this.state.firstStep;
                                  const {
                                    property_master_details,
                                    ...newDataas
                                  } = values;
                                  const updatedArrayForImg =
                                    property_master_details?.map((data) => {
                                      return {
                                        ...data,
                                        property_photo_1:
                                          data.property_photo_1.includes(
                                            "data:image/png;base64"
                                          )
                                            ? data.property_photo_1
                                            : "",
                                        property_photo_2:
                                          data.property_photo_2.includes(
                                            "data:image/png;base64"
                                          )
                                            ? data.property_photo_2
                                            : "",
                                        property_photo_3:
                                          data.property_photo_3.includes(
                                            "data:image/png;base64"
                                          )
                                            ? data.property_photo_3
                                            : "",
                                      };
                                    });
                                  const updatedImg = {
                                    property_master_details: updatedArrayForImg,
                                  };

                                  if (this.state.isEdit) {
                                    const finalData = {
                                      ...this.state.firstStep,
                                      ...this.state.secondStep,
                                      ...updatedImg,
                                      status: "6",
                                    };
                                    console.log("finalData-----", finalData);
                                    this.updateProperty(finalData);
                                  } else {
                                    const finalData = {
                                      ...this.state.firstStep,
                                      ...this.state.secondStep,
                                      ...values,
                                      status: "6",
                                    };
                                    // console.log('data---11111', finalData)
                                    this.createProperty(finalData);
                                  }
                                  // Proceed to the next tab
                                  // this.toggleTab(this.state.activeTab + 1);
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
                                  setFieldValue, // Add setFieldValue to manually update errors
                                }) => (
                                  <Form onSubmit={handleSubmit}>
                                    <FieldArray name="property_master_details">
                                      {({ push, remove }) => (
                                        <>
                                          <Row>
                                            <Col lg={12}>
                                              <Button
                                                variant="outlined"
                                                style={{ float: "right" }}
                                                onClick={() =>
                                                  push({
                                                    units_name: "",
                                                    units_beds: "",
                                                    units_baths: "",
                                                    units_size: "",
                                                    market_rent: "",
                                                    property_photo_2: "",
                                                    property_photo_1: "",
                                                    property_photo_3: "",
                                                    property_status: "",
                                                  })
                                                }
                                              >
                                                Add Unit
                                              </Button>
                                            </Col>
                                          </Row>
                                          {values.property_master_details?.map(
                                            (_, index) => (
                                              <div
                                                key={index}
                                                style={{
                                                  padding: "15px 20px",
                                                  boxShadow:
                                                    "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
                                                  borderRadius: "10px",
                                                  margin: "20px 0px",
                                                }}
                                              >
                                                <Row>
                                                  <Col lg={2}>
                                                    <div className="mb-3">
                                                      <div className="field">
                                                        <label
                                                          className="label"
                                                          htmlFor={`property_master_details[${index}].units_name`}
                                                        >
                                                          Units Name
                                                          <span className="text-danger">
                                                            *
                                                          </span>
                                                        </label>
                                                        <div className="control">
                                                          <Field
                                                            name={`property_master_details[${index}].units_name`}
                                                            value={
                                                              values
                                                                .property_master_details[
                                                                index
                                                              ].units_name
                                                            }
                                                            type="text"
                                                            className={`form-control ${
                                                              errors.property_master_details &&
                                                              errors
                                                                .property_master_details[
                                                                index
                                                              ] &&
                                                              errors
                                                                .property_master_details[
                                                                index
                                                              ].units_name &&
                                                              touched.property_master_details &&
                                                              touched
                                                                .property_master_details[
                                                                index
                                                              ] &&
                                                              touched
                                                                .property_master_details[
                                                                index
                                                              ].units_name
                                                                ? "is-invalid"
                                                                : ""
                                                            }`}
                                                            placeholder="Enter Unit Name"
                                                            onChange={
                                                              handleChange
                                                            } // Ensure to call handleChange
                                                            onBlur={handleBlur} // Ensure to call handleBlur
                                                          />
                                                          {errors.property_master_details &&
                                                            errors
                                                              .property_master_details[
                                                              index
                                                            ] &&
                                                            errors
                                                              .property_master_details[
                                                              index
                                                            ].units_name &&
                                                            touched.property_master_details &&
                                                            touched
                                                              .property_master_details[
                                                              index
                                                            ] &&
                                                            touched
                                                              .property_master_details[
                                                              index
                                                            ].units_name && (
                                                              <div className="text-danger">
                                                                {
                                                                  errors
                                                                    .property_master_details[
                                                                    index
                                                                  ].units_name
                                                                }
                                                              </div>
                                                            )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </Col>
                                                  <Col lg={2}>
                                                    <div className="mb-3">
                                                      <div className="field">
                                                        <label
                                                          className="label"
                                                          htmlFor={`property_master_details[${index}].units_beds`}
                                                        >
                                                          Beds
                                                          <span className="text-danger">
                                                            *
                                                          </span>
                                                        </label>
                                                        <div className="control">
                                                          <Field
                                                            name={`property_master_details[${index}].units_beds`}
                                                            value={
                                                              values
                                                                .property_master_details[
                                                                index
                                                              ].units_beds
                                                            }
                                                            type="number"
                                                            className={`form-control ${
                                                              errors.property_master_details &&
                                                              errors
                                                                .property_master_details[
                                                                index
                                                              ] &&
                                                              errors
                                                                .property_master_details[
                                                                index
                                                              ].units_beds &&
                                                              touched.property_master_details &&
                                                              touched
                                                                .property_master_details[
                                                                index
                                                              ] &&
                                                              touched
                                                                .property_master_details[
                                                                index
                                                              ].units_beds
                                                                ? "is-invalid"
                                                                : ""
                                                            }`}
                                                            placeholder="Enter Beds"
                                                            onChange={
                                                              handleChange
                                                            } // Ensure to call handleChange
                                                            onBlur={handleBlur} // Ensure to call handleBlur
                                                          />
                                                          {errors.property_master_details &&
                                                            errors
                                                              .property_master_details[
                                                              index
                                                            ] &&
                                                            errors
                                                              .property_master_details[
                                                              index
                                                            ].units_beds &&
                                                            touched.property_master_details &&
                                                            touched
                                                              .property_master_details[
                                                              index
                                                            ] &&
                                                            touched
                                                              .property_master_details[
                                                              index
                                                            ].units_beds && (
                                                              <div className="text-danger">
                                                                {
                                                                  errors
                                                                    .property_master_details[
                                                                    index
                                                                  ].units_beds
                                                                }
                                                              </div>
                                                            )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </Col>
                                                  <Col lg={2}>
                                                    <div className="mb-3">
                                                      <div className="field">
                                                        <label
                                                          className="label"
                                                          htmlFor={`property_master_details[${index}].units_baths`}
                                                        >
                                                          Baths
                                                          <span className="text-danger">
                                                            *
                                                          </span>
                                                        </label>
                                                        <div className="control">
                                                          <Field
                                                            name={`property_master_details[${index}].units_baths`}
                                                            value={
                                                              values
                                                                .property_master_details[
                                                                index
                                                              ].units_baths
                                                            }
                                                            type="number"
                                                            className={`form-control ${
                                                              errors.property_master_details &&
                                                              errors
                                                                .property_master_details[
                                                                index
                                                              ] &&
                                                              errors
                                                                .property_master_details[
                                                                index
                                                              ].units_baths &&
                                                              touched.property_master_details &&
                                                              touched
                                                                .property_master_details[
                                                                index
                                                              ] &&
                                                              touched
                                                                .property_master_details[
                                                                index
                                                              ].units_baths
                                                                ? "is-invalid"
                                                                : ""
                                                            }`}
                                                            placeholder="Enter Baths"
                                                            onChange={
                                                              handleChange
                                                            } // Ensure to call handleChange
                                                            onBlur={handleBlur} // Ensure to call handleBlur
                                                          />
                                                          {errors.property_master_details &&
                                                            errors
                                                              .property_master_details[
                                                              index
                                                            ] &&
                                                            errors
                                                              .property_master_details[
                                                              index
                                                            ].units_baths &&
                                                            touched.property_master_details &&
                                                            touched
                                                              .property_master_details[
                                                              index
                                                            ] &&
                                                            touched
                                                              .property_master_details[
                                                              index
                                                            ].units_baths && (
                                                              <div className="text-danger">
                                                                {
                                                                  errors
                                                                    .property_master_details[
                                                                    index
                                                                  ].units_baths
                                                                }
                                                              </div>
                                                            )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </Col>
                                                  <Col lg={2}>
                                                    <div className="mb-3">
                                                      <div className="field">
                                                        <label
                                                          className="label"
                                                          htmlFor={`property_master_details[${index}].units_size`}
                                                        >
                                                          Size
                                                          {/* <span className="text-danger">
                                                            *
                                                          </span> */}
                                                        </label>
                                                        <div className="control">
                                                          <Field
                                                            name={`property_master_details[${index}].units_size`}
                                                            value={
                                                              values
                                                                .property_master_details[
                                                                index
                                                              ].units_size
                                                            }
                                                            type="number"
                                                            className={`form-control ${
                                                              errors.property_master_details &&
                                                              errors
                                                                .property_master_details[
                                                                index
                                                              ] &&
                                                              errors
                                                                .property_master_details[
                                                                index
                                                              ].units_size &&
                                                              touched.property_master_details &&
                                                              touched
                                                                .property_master_details[
                                                                index
                                                              ] &&
                                                              touched
                                                                .property_master_details[
                                                                index
                                                              ].units_size
                                                                ? "is-invalid"
                                                                : ""
                                                            }`}
                                                            placeholder="Enter Size"
                                                            onChange={
                                                              handleChange
                                                            } // Ensure to call handleChange
                                                            onBlur={handleBlur} // Ensure to call handleBlur
                                                          />
                                                          {/* {errors.property_master_details &&
                                                            errors
                                                              .property_master_details[
                                                              index
                                                            ] &&
                                                            errors
                                                              .property_master_details[
                                                              index
                                                            ].units_size &&
                                                            touched.property_master_details &&
                                                            touched
                                                              .property_master_details[
                                                              index
                                                            ] &&
                                                            touched
                                                              .property_master_details[
                                                              index
                                                            ].units_size && (
                                                              <div className="text-danger">
                                                                {
                                                                  errors
                                                                    .property_master_details[
                                                                    index
                                                                  ].units_size
                                                                }
                                                              </div>
                                                            )} */}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </Col>
                                                  <Col lg={2}>
                                                    <div className="mb-3">
                                                      <div className="field">
                                                        <label
                                                          className="label"
                                                          htmlFor={`property_master_details[${index}].market_rent`}
                                                        >
                                                          Rent ($)
                                                          <span className="text-danger">
                                                            *
                                                          </span>
                                                        </label>
                                                        <div className="control">
                                                          <Field
                                                            name={`property_master_details[${index}].market_rent`}
                                                            value={
                                                              values
                                                                .property_master_details[
                                                                index
                                                              ].market_rent
                                                            }
                                                            type="number"
                                                            className={`form-control ${
                                                              errors.property_master_details &&
                                                              errors
                                                                .property_master_details[
                                                                index
                                                              ] &&
                                                              errors
                                                                .property_master_details[
                                                                index
                                                              ].market_rent &&
                                                              touched.property_master_details &&
                                                              touched
                                                                .property_master_details[
                                                                index
                                                              ] &&
                                                              touched
                                                                .property_master_details[
                                                                index
                                                              ].market_rent
                                                                ? "is-invalid"
                                                                : ""
                                                            }`}
                                                            placeholder="Enter Rent"
                                                            onChange={
                                                              handleChange
                                                            } // Ensure to call handleChange
                                                            onBlur={handleBlur} // Ensure to call handleBlur
                                                          />
                                                          {errors.property_master_details &&
                                                            errors
                                                              .property_master_details[
                                                              index
                                                            ] &&
                                                            errors
                                                              .property_master_details[
                                                              index
                                                            ].market_rent &&
                                                            touched.property_master_details &&
                                                            touched
                                                              .property_master_details[
                                                              index
                                                            ] &&
                                                            touched
                                                              .property_master_details[
                                                              index
                                                            ].market_rent && (
                                                              <div className="text-danger">
                                                                {
                                                                  errors
                                                                    .property_master_details[
                                                                    index
                                                                  ].market_rent
                                                                }
                                                              </div>
                                                            )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </Col>
                                                  <Col lg={1}>
                                                    <label
                                                      className="label"
                                                      htmlFor={`property_master_details[${index}].property_status`}
                                                    >
                                                      Status
                                                      <span className="text-danger">
                                                        *
                                                      </span>
                                                    </label>
                                                    <Field
                                                      name={`property_master_details[${index}].property_status`}
                                                      value={
                                                        values
                                                          .property_master_details[
                                                          index
                                                        ].property_status
                                                      }
                                                      as="select"
                                                      className={`form-control ${
                                                        errors.property_master_details &&
                                                        errors
                                                          .property_master_details[
                                                          index
                                                        ] &&
                                                        errors
                                                          .property_master_details[
                                                          index
                                                        ].property_status &&
                                                        touched.property_master_details &&
                                                        touched
                                                          .property_master_details[
                                                          index
                                                        ] &&
                                                        touched
                                                          .property_master_details[
                                                          index
                                                        ].property_status
                                                          ? "is-invalid"
                                                          : ""
                                                      }`}
                                                      onChange={handleChange} // Ensure to call handleChange
                                                      onBlur={handleBlur} // Ensure to call handleBlur
                                                    >
                                                      <option value="">
                                                        Select Property Status
                                                      </option>
                                                      <option value="1">
                                                        Active
                                                      </option>
                                                      <option value="2">
                                                        Rental
                                                      </option>
                                                      <option value="9">
                                                        Maintenance
                                                      </option>
                                                      <option value="0">
                                                        Inactive
                                                      </option>
                                                      {/* 1- active , 2 - rental , 9 - maintenance, 0 - inactive */}
                                                      {/* Add more options if needed */}
                                                    </Field>
                                                    {errors.property_master_details &&
                                                      errors
                                                        .property_master_details[
                                                        index
                                                      ] &&
                                                      errors
                                                        .property_master_details[
                                                        index
                                                      ].property_status &&
                                                      touched.property_master_details &&
                                                      touched
                                                        .property_master_details[
                                                        index
                                                      ] &&
                                                      touched
                                                        .property_master_details[
                                                        index
                                                      ].property_status && (
                                                        <div className="text-danger">
                                                          {
                                                            errors
                                                              .property_master_details[
                                                              index
                                                            ].property_status
                                                          }
                                                        </div>
                                                      )}
                                                  </Col>
                                                  {index > 0 && (
                                                    <Col lg={1}>
                                                      <Button
                                                        className="danger"
                                                        style={{
                                                          marginTop: "29px",
                                                        }}
                                                        onClick={() => {
                                                          if (
                                                            values
                                                              .property_master_details[
                                                              index
                                                            ].id
                                                          ) {
                                                            remove(index);
                                                            this.deleteUnitById(
                                                              values
                                                                .property_master_details[
                                                                index
                                                              ].id
                                                            );
                                                          } else {
                                                            remove(index);
                                                          }
                                                          // setFieldValue(`property_master_details[${index}].units_name`, "");
                                                        }}
                                                      >
                                                        Delete
                                                      </Button>
                                                    </Col>
                                                  )}
                                                </Row>

                                                <Row>
                                                  <Col lg="3">
                                                    <label
                                                      className="form-label mb-2"
                                                      htmlFor={`property_master_details[${index}].property_photo_1`}
                                                    >
                                                      Property Photo one
                                                      {/* <span className="text-danger">
                                                        *
                                                      </span> */}
                                                    </label>

                                                    <CustomFileInputFieldArray
                                                      name={`property_master_details[${index}].property_photo_1`} // Use 'name' instead of 'field'
                                                      // form={{ setFieldValue }} // Pass the setFieldValue function from Formik
                                                      setFieldValue={
                                                        setFieldValue
                                                      }
                                                      defaultFile={
                                                        values
                                                          .property_master_details[
                                                          index
                                                        ].property_photo_1
                                                      }
                                                      // error={
                                                      //   errors.property_master_details &&
                                                      //   errors
                                                      //     .property_master_details[
                                                      //     index
                                                      //   ] &&
                                                      //   errors
                                                      //     .property_master_details[
                                                      //     index
                                                      //   ].property_photo_1 &&
                                                      //   touched.property_master_details &&
                                                      //   touched
                                                      //     .property_master_details[
                                                      //     index
                                                      //   ] &&
                                                      //   touched
                                                      //     .property_master_details[
                                                      //     index
                                                      //   ].property_photo_1
                                                      // }
                                                    />
                                                    {/* <ErrorMessage
                                                      name={`property_master_details[${index}].property_photo_1`}
                                                      component="div"
                                                      className="text-danger"
                                                    /> */}
                                                  </Col>
                                                  <Col lg="3">
                                                    <label
                                                      className="form-label mb-2"
                                                      htmlFor={`property_master_details[${index}].property_photo_2`}
                                                    >
                                                      Property Photo two
                                                    </label>

                                                    <CustomFileInputFieldArray
                                                      name={`property_master_details[${index}].property_photo_2`} // Use 'name' instead of 'field'
                                                      // form={{ setFieldValue }} // Pass the setFieldValue function from Formik
                                                      defaultFile={
                                                        values
                                                          .property_master_details[
                                                          index
                                                        ].property_photo_2
                                                      }
                                                      setFieldValue={
                                                        setFieldValue
                                                      }
                                                      error={
                                                        errors.property_master_details &&
                                                        errors
                                                          .property_master_details[
                                                          index
                                                        ] &&
                                                        errors
                                                          .property_master_details[
                                                          index
                                                        ].property_photo_2 &&
                                                        touched.property_master_details &&
                                                        touched
                                                          .property_master_details[
                                                          index
                                                        ] &&
                                                        touched
                                                          .property_master_details[
                                                          index
                                                        ].property_photo_2
                                                      }
                                                    />
                                                    {/* <ErrorMessage
                                                                                                                name={`property_master_details[${index}].property_photo_2`}
                                                                                                                component="div"
                                                                                                                className="text-danger"
                                                                                                            /> */}
                                                  </Col>
                                                  <Col lg="3">
                                                    <label
                                                      className="form-label mb-2"
                                                      htmlFor={`property_master_details[${index}].property_photo_3`}
                                                    >
                                                      Property Photo three
                                                    </label>

                                                    <CustomFileInputFieldArray
                                                      name={`property_master_details[${index}].property_photo_3`} // Use 'name' instead of 'field'
                                                      // form={{ setFieldValue }} // Pass the setFieldValue function from Formik
                                                      defaultFile={
                                                        values
                                                          .property_master_details[
                                                          index
                                                        ].property_photo_3
                                                      }
                                                      setFieldValue={
                                                        setFieldValue
                                                      }
                                                      error={
                                                        errors.property_master_details &&
                                                        errors
                                                          .property_master_details[
                                                          index
                                                        ] &&
                                                        errors
                                                          .property_master_details[
                                                          index
                                                        ].property_photo_3 &&
                                                        touched.property_master_details &&
                                                        touched
                                                          .property_master_details[
                                                          index
                                                        ] &&
                                                        touched
                                                          .property_master_details[
                                                          index
                                                        ].property_photo_3
                                                      }
                                                    />
                                                    {/* <ErrorMessage
                                                                                                                name={`property_master_details[${index}].property_photo_3`}
                                                                                                                component="div"
                                                                                                                className="text-danger"
                                                                                                            /> */}
                                                  </Col>
                                                </Row>
                                              </div>
                                            )
                                          )}
                                          {/* <Row>
                                                                                        <Col lg={1}>
                                                                                            <Button variant="outlined" onClick={() => push({
                                                                                                units_name: "",
                                                                                                units_beds: "",
                                                                                                units_baths: "",
                                                                                                units_size: "",
                                                                                                market_rent: "",
                                                                                                property_photo_2: '',
                                                                                                property_photo_1: '',
                                                                                                property_photo_3: '',
                                                                                            })}>Add Unit</Button>
                                                                                        </Col>
                                                                                    </Row> */}
                                        </>
                                      )}
                                    </FieldArray>
                                    <div className="d-flex justify-content-between mt-3">
                                      <Button
                                        color="primary"
                                        className={
                                          this.state.activeTab === 1
                                            ? "previous disabled"
                                            : "previous"
                                        }
                                        onClick={() => {
                                          this.toggleTab(2);
                                        }}
                                      >
                                        {" "}
                                        Previous
                                      </Button>
                                      <Button
                                        color="primary"
                                        type="submit"
                                        style={{ float: "right" }}
                                      >
                                        Submit
                                      </Button>
                                    </div>
                                  </Form>
                                )}
                              </Formik>
                            </div>
                          </TabPane>
                        </TabContent>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateProperty;
