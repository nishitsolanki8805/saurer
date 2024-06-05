import React, { Component } from "react";
import {
  Col,
  Container,
  Form,
  ModalHeader,
  Row,
  ModalBody,
  Modal,
  Table,
  Button,
  Input,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  CREATE_RENTAL_INVOICE_TRANSACTION,
  DELETE_RENTAL_LATE_FEES_DETAILS,
  GET_ALL_INVOICE_DATA_BY_SEARCH,
  GET_ALL_MAINTENANCE_DATA,
  GET_ALL_MAINTENANCE_DATA_BY_SEARCH,
  GET_ALL_RENTAL_PROPERTY,
  GET_ALL_RENTAL_PROPERTY_BY_SEARCH,
  GET_ALL_USER_NO_PAGE,
  GET_PROPERTY_MASTER_BY_ID,
  UPDATE_RENTAL_INVOICE_DATA,
  UPDATE_RENTAL_LATE_FEES_DETAILS,
  UPDATE_RENTAL_OWNER_INVOICES,
} from "../../global";
import { AiTwotoneCreditCard, AiTwotoneEdit } from "react-icons/ai";
import TableComponent from "../../components/Common/TableComponent";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { ImEye } from "react-icons/im";
import { toast } from "react-toastify";
import MoneyGave from "./../../assets/images/svg/pendingMoney.svg";
import MoneyGet from "./../../assets/images/svg/HandGet.svg";
import * as Yup from "yup";

import { ErrorMessage, Field, Formik } from "formik";

export class InvoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        {
          title: "SAURER.",
          link: process.env.PUBLIC_URL + "/dashboard",
        },
        {
          title: "Rental Bill Management",
          link: "/#",
        },
      ],
      isLoading: false,
      data: [],
      selectedData: [],
      selectedUserData: [],
      usersList: [],
      propertyList: [],
      unitList: [],
      statusList: [
        { id: "", title: "Select Status" },
        { id: 0, title: "Pending" },
        { id: 1, title: "Paid" },
      ],
      receiveStatusList: [
        { id: "", title: "Select Status" },
        { id: 0, title: "Not-Receive" },
        { id: 1, title: "Receive" },
      ],
      selectedProperty: "",
      selectedUnit: "",
      selectedStatus: "",
      selectedStartDate: "",
      selectedEndDate: "",
      pageTotal: 0,
      currentPageIndex: 0,
      pageNo: 10,
      selectedUser: "",
      modal: false,
      userModal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.userModalToggle = this.userModalToggle.bind(this);
  }
  componentDidMount() {
    this.getAllUser();
    this.getAllProperty();
    // this.getAllUnit();
    if (this.props.state?.page) {
      this.getAllInvoiceData(this.props.state?.page, this.props.state?.perPage);
    } else {
      this.getAllInvoiceData();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.state?.page !== prevProps.state?.page) {
      if (this.props.state?.page) {
        this.getAllInvoiceData(
          this.props.state?.page,
          this.props.state?.perPage
        );
      } else {
        this.getAllInvoiceData();
      }
    }
  }
  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  }
  userModalToggle() {
    this.setState((prevState) => ({
      userModal: !prevState.userModal,
    }));
  }
  getAllUser = async (id) => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_ALL_USER_NO_PAGE, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        per_page: "",
        field_db: "",
        search_val: "",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.data) {
          const newData = { first_name: "Select Owner", id: "" };
          const usersList = [newData, ...res.data];
          this.setState({ usersList });
        } else {
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  getAllProperty = async (page, perpage) => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_ALL_RENTAL_PROPERTY+"?flag=reports", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.data) {
          const newData = {
            property_name: "Select Property",
            property_master_id: "",
          };
          const propertyList = [newData, ...res.data];
          this.setState({ propertyList });
        } else {
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  getAllUnit = async (id) => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_PROPERTY_MASTER_BY_ID + this.state.selectedProperty, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.data) {
          const newData = { units_name: "Select Unit", id: "" };
          const unitList = [newData, ...res.data.property_master_details];
          this.setState({ unitList });
        } else {
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  getAllInvoiceData = async (page, perpage) => {
    console.log("selectedUser", this.state.selectedProperty);
    const { pageNo } = this.state;
    this.setState({ isLoading: true });
    try {
      const StoredData = localStorage.getItem("authUser");
      const Token = JSON.parse(StoredData);

      const response = await fetch(
        page
          ? `${GET_ALL_INVOICE_DATA_BY_SEARCH}?page=${page}`
          : `${GET_ALL_INVOICE_DATA_BY_SEARCH}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + Token.access_token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: this.state.selectedUser ? this.state.selectedUser : "",
            property_master_id: this.state.selectedProperty
              ? this.state.selectedProperty
              : "",
            pro_property_master_details_id: this.state.selectedUnit
              ? this.state.selectedUnit
              : "",
            status: this.state.selectedStatus ? this.state.selectedStatus : "",
            from: this.state.selectedStartDate
              ? this.state.selectedStartDate
              : "",
            to: this.state.selectedEndDate ? this.state.selectedEndDate : "",
          }),
        }
      );

      const res = await response.json();
      console.log("API response data:", res.data);

      if (res.data) {
        this.setState({
          data: res.data,
          pageTotal: res.meta?.pagination.total_pages,
          currentPageIndex: res.meta?.pagination.current_page,
          isLoading: false,
        });
      }
      if (this.state.selectedProperty) {
        this.getAllUnit();
      }
    } catch (error) {
      console.error("Error fetching maintenance data:", error);
      this.setState({ isLoading: false });
    }
  };

  openModal = async (item) => {
    await this.setState({ selectedData: item }, () => {
      this.toggle();
    });
  };
  openUserModal = async (item) => {
    console.log("Called", item);
    await this.setState({ selectedUserData: item }, () => {
      this.userModalToggle();
    });
  };
  handleUpdateInvoice = async (value) => {
    try {
      const StoredData = localStorage.getItem("authUser");
      const Token = JSON.parse(StoredData);

      const response = await fetch(CREATE_RENTAL_INVOICE_TRANSACTION, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Token.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rental_invoice_id: value.id,
          amount_type: value.amount_type,
          amount: value.amount,
          status: value.status,
          transaction_number: value.transaction_number,
          notes: value.status,
        }),
      });

      const res = await response;
      console.log("API response data:", res);

      if (res.status == 200) {
        toast.success("Rental Invoice Updated");
        this.getAllInvoiceData();
        this.toggle();
      }
    } catch (error) {
      console.error("Error fetching maintenance data:", error);
    }

    if (value.pending_amount > 0) {
      // return;
      try {
        const StoredData = localStorage.getItem("authUser");
        const Token = JSON.parse(StoredData);

        const response = await fetch(UPDATE_RENTAL_INVOICE_DATA + value.id, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + Token.access_token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: 1,
            transaction_number: "",
            notes: "",
          }),
        });

        const res = await response;
        console.log("API response data:", res);

        if (res.status == 200) {
          // toast.success("Rental Invoice Updated");
          // this.getAllInvoiceData();
          // this.toggle();
        }
      } catch (error) {
        console.error("Error fetching maintenance data:", error);
      }
    }
  };
  handleStatusChange = (index, event) => {
    const newStatus = event.target.value;
    this.setState((prevState) => {
      const updatedData = [...prevState.selectedUserData];
      updatedData[index].status = parseInt(newStatus);
      return { selectedUserData: updatedData };
    });
  };
  hanldleTransactionUpdate = (index, event) => {
    const newTranction = event.target.value;
    this.setState((prevState) => {
      const updatedData = [...prevState.selectedUserData];
      updatedData[index].amount = newTranction;
      return { selectedUserData: updatedData };
    });
  };
  handleUpdateLateFees = async (value) => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(UPDATE_RENTAL_LATE_FEES_DETAILS + value.id, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: value.description,
        amount: value.amount,
        status: "0",
      }),
    })
      .then((res) => {
        // return res.json();
        if (res.status == 200) {
          console.log("Result", res.status);
          toast.success("Late Fees Details Update Successfully");
          this.getAllInvoiceData();
          this.userModalToggle();
        }
      })
      .then((res) => {
        if (res.data) {
          // const newData = { first_name: "Select Owner", id: "" };
          // const usersList = [newData, ...res.data];
          // this.setState({ usersList });
        } else {
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  deleteLateFees = async (value) => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(DELETE_RENTAL_LATE_FEES_DETAILS + value.id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   description: value.description,
      //   amount: value.amount,
      //   status: "0",
      // }),
    })
      .then((res) => {
        // return res.json();
        if (res.status == 200) {
          console.log("Result", res.status);
          this.getAllInvoiceData();
          toast.success("Late Fees Details Update Successfully");
          // this.userModalToggle();
        }
      })
      .then((res) => {
        if (res.data) {
          // const newData = { first_name: "Select Owner", id: "" };
          // const usersList = [newData, ...res.data];
          // this.setState({ usersList });
        } else {
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  render() {
    const {
      data,
      pageNo,
      currentPageIndex,
      pageTotal,
      selectedUser,
      selectedProperty,
      selectedUnit,
      selectedStatus,
      selectedStartDate,
      selectedEndDate,
    } = this.state;

    const renderTHContent = () => {
      return (
        <>
          <tr style={{ verticalAlign: "middle" }}>
            <th>Property Name</th>
            <th>Unit Name</th>
            <th>Tenant</th>
            <th>Invoice Date</th>
            <th>Total Amount ($)</th>
            <th>Pending Amount ($)</th>
            <th>Amount Status</th>
            <th>Transaction Date</th>
            <th>Transaction No.</th>
            <th>Action</th>
          </tr>
        </>
      );
    };
    const renderTdContent = (item) => {
      const dateFormat = (invoiceData) => {
        if (invoiceData) {
          const workerDate = new Date(invoiceData);

          const year = workerDate.getFullYear();
          const month = String(workerDate.getMonth() + 1).padStart(2, "0");
          const day = String(workerDate.getDate()).padStart(2, "0");

          // return `${year}-${month}-${day}`;
          return `${month}-${day}-${year}`;
        }
      };
      return (
        <>
          <Modal
            isOpen={this.state.modal}
            className={this.props.className}
            id="event-modal"
          >
            <ModalHeader
              toggle={() => {
                this.toggle();
              }}
              tag="h4"
            >
              {"Update Invoice"}
            </ModalHeader>
            <ModalBody>
              <Row style={{ paddingBottom: "10px" }}>
                <Row
                  style={{
                    paddingBottom: "10px",
                    paddingTop: "10px",
                    textAlign: "center",
                  }}
                >
                  <h5 className="mb-0" style={{ color: "#5664d2" }}>
                    Invoice Details
                  </h5>
                </Row>
                <hr class="hr-blurry" />
                <Col lg={6}>
                  <h6 className="mb-0">
                    Invoice Type :{" "}
                    <h8 className="mb-0">
                      {this.state.selectedData.invoice_type}
                    </h8>
                  </h6>
                </Col>
                <Col lg={6}>
                  <h6 className="mb-0">
                    Invoice Date :{" "}
                    <h8 className="mb-0">
                      {dateFormat(this.state.selectedData.invoice_date_gen)}
                    </h8>
                  </h6>
                </Col>

                <hr class="hr-blurry my-2" />
                <Col lg={6}>
                  <h6 className="mb-0">
                    Total Amount :{" "}
                    <h8 className="mb-0">
                      $ {this.state.selectedData.amount_total}
                    </h8>
                  </h6>
                </Col>
                <Col lg={6}>
                  <h6 className="mb-0">
                    Pending Amount :{" "}
                    <h8 className="mb-0">
                      ${this.state.selectedData.pending_amount}
                    </h8>
                  </h6>
                </Col>
              </Row>
              <hr class="hr-blurry" />

              <Formik
                initialValues={{
                  id: this.state.selectedData ? this.state.selectedData.id : "",
                  status: 0,
                  amount_type: 1,
                  transaction_number: "",
                  amount: "",
                  notes: "",
                  pending_amount: this.state.selectedData
                    ? this.state.selectedData.pending_amount
                    : 0,
                }}
                onSubmit={(values) => {
                  this.handleUpdateInvoice(values);
                }}
              >
                {({
                  isSubmitting,
                  setFieldValue,
                  handleSubmit,
                  errors,
                  touched,
                  values,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <div className="field">
                            <label className="label" htmlFor="status">
                              Amount Status
                            </label>
                            <div className="control">
                              <Field
                                name="status"
                                value={values.status}
                                as="select"
                                className={`form-control ${
                                  errors.status && touched.status
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Select Status"
                              >
                                <option value="">Select Status</option>
                                <option value="0">Paid</option>
                                <option value="1">Pending</option>
                              </Field>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="mb-3">
                          <div className="field">
                            <label className="label" htmlFor="amount_type">
                              Amount Type
                            </label>
                            <div className="control">
                              <Field
                                name="amount_type"
                                value={values.amount_type}
                                as="select"
                                className={`form-control ${
                                  errors.amount_type && touched.amount_type
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Select Payment Type"
                              >
                                <option value="">Select Payment Type</option>
                                <option value="1">Cash</option>
                                <option value="2">Check</option>
                              </Field>
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col className="col-12 mb-3">
                        <label className="title" htmlFor={`amount`}>
                          Amount ($)
                        </label>
                        <Field
                          name="amount"
                          type="text"
                          value={values.amount}
                          placeholder="Amount."
                          className={`form-control ${
                            errors.amount && touched.amount ? "is-invalid" : ""
                          }`}
                        />
                      </Col>
                      <Col className="col-12 mb-3">
                        <label className="title" htmlFor={`transaction_number`}>
                          Transaction No.
                        </label>
                        <Field
                          name="transaction_number"
                          type="text"
                          value={values.transaction_number}
                          placeholder="Transaction No."
                          className={`form-control ${
                            errors.transaction_number &&
                            touched.transaction_number
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                      </Col>

                      <Col className="col-12 mb-3">
                        <label className="notes" htmlFor={`notes`}>
                          Notes
                        </label>
                        <Field
                          name="notes"
                          type="textarea"
                          rows={3}
                          value={values.notes}
                          placeholder="Notes"
                          className={`form-control ${
                            errors.notes && touched.notes ? "is-invalid" : ""
                          }`}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <div className="text-end">
                          <button
                            type="button"
                            className="btn btn-light me-2"
                            onClick={this.toggle}
                          >
                            Close
                          </button>

                          <button
                            type="submit"
                            className="btn btn-success save-event"
                          >
                            Save
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </Modal>
          <Modal
            size="lg"
            isOpen={this.state.userModal}
            className={this.props.className}
            id="event-modal"
          >
            <ModalHeader
              toggle={() => {
                this.userModalToggle();
              }}
              tag="h4"
            >
              {"Update Late Fees Details"}
            </ModalHeader>
            <ModalBody>
              <Row style={{ paddingBottom: "10px" }}>
                <Row
                  style={{
                    paddingBottom: "10px",
                    paddingTop: "10px",
                    textAlign: "center",
                  }}
                >
                  <div className="table-responsive">
                    <Table className="table-centered mb-0 table-nowrap">
                      <thead className="bg-light">
                        <tr>
                          <th>Description</th>
                          <th>Amount($)</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state?.selectedUserData.map((val, key) => {
                          return (
                            <tr style={{ verticalAlign: "middle" }} key={key}>
                              <td>{val.description || "-"}</td>
                              <td>
                                <Input
                                  type="number"
                                  placeholder="Amount"
                                  value={val?.amount}
                                  onChange={(e) =>
                                    this.hanldleTransactionUpdate(key, e)
                                  } // Step 4
                                />
                              </td>

                              <td style={{ display: "inline-flex" }}>
                                <div>
                                  <Button
                                    color="success"
                                    type="submit"
                                    style={{ marginRight: "3px" }}
                                    onClick={
                                      () => this.handleUpdateLateFees(val)
                                      // console.log("object---->", val)
                                    }
                                  >
                                    Update
                                  </Button>
                                </div>
                                <div>
                                  <Button
                                    color="danger"
                                    type="submit"
                                    // style={{ float: "right" }}
                                    onClick={
                                      () => this.deleteLateFees(val)
                                      // console.log("object---->", val)
                                    }
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </Row>
                <hr class="hr-blurry" />
              </Row>
            </ModalBody>
          </Modal>
          <td>
            <h5 className="font-size-14 text-truncate"></h5>
            <p className="mb-0">
              <span className="fw-medium">{item.property_name}</span>
            </p>
          </td>{" "}
          <td>
            <h5 className="font-size-14 text-truncate"></h5>
            <p className="mb-0">
              <span className="fw-medium">{item.units_name}</span>
            </p>
          </td>
          <td>
            <h5 className="font-size-14 text-truncate"></h5>
            <p className="mb-0">
              <span className="fw-medium">{item.tenant_name}</span>
            </p>
          </td>
          <td>
            <h5 className="font-size-14 text-truncate"></h5>
            <p className="mb-0">
              <span className="fw-medium">
                {dateFormat(item.invoice_date_gen)}
              </span>
            </p>
          </td>
          <td>
            <h5 className="font-size-14 text-truncate"></h5>
            <p className="mb-0">
              <span className="fw-medium"> $ {item.amount_total}</span>
            </p>
          </td>
          <td>
            <h5 className="font-size-14 text-truncate"></h5>
            <p className="mb-0">
              <span className="fw-medium"> $ {item.pending_amount}</span>
            </p>
          </td>
          <td>
            <h5 className="font-size-14 text-truncate"></h5>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <p className="mb-0">
                <span className="fw-medium">
                  {parseInt(item.pending_amount) > 0
                    ? "Not-Receive"
                    : "Receive"}
                </span>
              </p>
              {item.pending_amount > 0 && (
                <div
                  style={{ paddingLeft: "5px" }}
                  onClick={() => this.openModal(item)}
                >
                  <img
                    src={MoneyGave}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: "50%",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "#1B2A30",
                      padding: "5px",
                    }}
                  />
                </div>
              )}
            </div>
          </td>
          <td>
            <h5 className="font-size-14 text-truncate"></h5>
            <p className="mb-0">
              <span className="fw-medium">
                {dateFormat(item.transaction_date) || "-"}
              </span>
            </p>
          </td>
          <td>
            <h5 className="font-size-14 text-truncate"></h5>
            <p className="mb-0">
              <span className="fw-medium">
                {item.transaction_number || "-"}
              </span>
            </p>
          </td>
          <td style={{ width: "90px" }} className="text-center">
            <>
              <>
                <ImEye
                  style={{
                    // color: "#5664d2",
                    height: "20px",
                    width: "20px",
                    marginTop: "8px",
                    marginRight: "5px",
                  }}
                  onClick={() =>
                    this.props.history.push(
                      process.env.PUBLIC_URL + "/view-rental-invoice/" + item.id
                    )
                  }
                />
                <AiTwotoneEdit
                  style={{
                    // color: "#5664d2",
                    height: "20px",
                    width: "20px",
                    marginTop: "8px",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    item.pending_amount > 0
                      ? item.late_fees_details.length > 0
                        ? this.openUserModal(item.late_fees_details)
                        : toast("No Late Fees Exist On This Bill", {
                            type: "warning",
                          })
                      : toast("Amount Already Paid", {
                          type: "warning",
                        })
                  }
                />
              </>
            </>
          </td>
        </>
      );
    };
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              title="Rental Bill Management"
              breadcrumbItems={this.state.breadcrumbItems}
            />
            {this.state.isLoading ? (
              <>
                <p>Loading .....</p>
              </>
            ) : (
              <>
                <TableComponent
                  allUserData={data}
                  perPage={pageNo}
                  selectedUser={selectedUser}
                  selectedProperty={selectedProperty}
                  selectedUnit={selectedUnit}
                  selectedStatus={selectedStatus}
                  selectedStartDate={selectedStartDate}
                  selectedEndDate={selectedEndDate}
                  currentpageIndex={currentPageIndex}
                  pageTotal={pageTotal}
                  renderTHContent={renderTHContent}
                  renderTdContent={renderTdContent}
                  setPerPage={(value) => this.setState({ pageNo: value })}
                  setFilterUser={(value) =>
                    this.setState({ selectedUser: value })
                  }
                  setFilterProperty={(value) =>
                    this.setState({ selectedProperty: value })
                  }
                  setFilterUnit={(value) =>
                    this.setState({ selectedUnit: value })
                  }
                  setFilterStatus={(value) =>
                    this.setState({ selectedStatus: value })
                  }
                  setFilterStartDate={(value) =>
                    this.setState({ selectedStartDate: value })
                  }
                  setFilterEndDate={(value) =>
                    this.setState({ selectedEndDate: value })
                  }
                  getAllUsers={this.getAllInvoiceData}
                  filterUserDataBtn={true}
                  filterPropertyBtn={true}
                  filterUnitDataBtn={true}
                  filterStatusDataBtn={true}
                  filterStartDateDataBtn={true}
                  filterEndDateDataBtn={true}
                  filterUserData={this.state.usersList}
                  filterPropertyData={this.state.propertyList}
                  filterUnitData={this.state.unitList}
                  filterStatusData={this.state.receiveStatusList}
                  isBtnShow={false}
                  editData={"/#"}
                  viewData={"/#"}
                  SearchData={[
                    "property_name",
                    "units_name",
                    "tenant_name",
                    "invoice_date_gen",
                    "transaction_number",
                    // "worker_mobile_no",
                  ]}
                  isDeleteUser={false}
                />
              </>
            )}
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(InvoiceList);
