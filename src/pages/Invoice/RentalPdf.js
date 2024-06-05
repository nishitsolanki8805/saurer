import React, { useEffect } from "react";
import { usePDF } from "react-to-pdf";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import companyLogo from "./../../assets/images/Pdf_logo.png";

const RentalPdf = ({ isOpen, setIsOpen, data }) => {
  const { toPDF, targetRef } = usePDF({
    filename: `${data?.property_name}.pdf`,
    // filename: `01.pdf`,
  });
  const [Loading, setLoading] = React.useState(false);
  console.log("Data ==== >", data);
  const calculateSumOfAmounts = (expenseDetails) => {
    return expenseDetails.reduce(
      (sum, detail) => sum + parseFloat(detail.amount),
      0
    );
  };

  const formatDate = (date) => {
    if(date){

      const dateObj = date instanceof Date ? date : new Date(date);
      
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      
      // Return the formatted date string
      return `${month}-${day}-${year}`;
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} backdrop="static" size="xl">
        <ModalHeader
          toggle={() => {
            setIsOpen(false);
          }}
        >
          <h2>Rental Invoice</h2>
        </ModalHeader>
        {Loading ? (
          <>
            <p>Loading ...</p>
          </>
        ) : (
          <ModalBody>
            <div className="mt-4 d-flex justify-content-end px-4 pb-6">
              <button
                className="btn btn-outline-primary"
                onClick={() => toPDF()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ width: "1.5rem", height: "1.5rem" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>Download</span>
              </button>
            </div>
            <div ref={targetRef}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="">
                  <div className="p4" id="print" style={{ padding: "1rem" }}>
                    <div className="container">
                      <Row style={{ padding: 10 }}>
                        <Col lg={8} style={{ textAlign: "left" }}>
                          <h4>
                            <span
                              style={{
                                fontWeight: "normal",
                                color: "#5593bd",
                              }}
                            >
                              INVOICE :{" "}
                              <span
                                style={{
                                  fontWeight: "bold",
                                  color:  data.status == 0 ? "#ff4444" : "#5cb85b",
                                }}
                              >
                                {data.status == 0 ? "PENDING" : "PAID"}
                              </span>
                            </span>
                          </h4>
                          {/* Company Description */}
                          <p>
                            <span style={{ fontWeight: "bold" }}>
                              Company Name:{" "}
                            </span>{" "}
                            {data?.company_name}
                          </p>
                          <p>
                            <span style={{ fontWeight: "bold" }}>
                              Address:{" "}
                            </span>{" "}
                            {data?.company_address}
                          </p>
                          <p>
                            <span style={{ fontWeight: "bold" }}>Email: </span>{" "}
                            {data?.company_email}
                          </p>
                        </Col>
                        <Col lg={4}>
                          {/* Displaying logo using base64 data URL */}
                          <div className="d-flex justify-content-center">
                            <img
                              src={companyLogo}
                              alt="Company Logo"
                              width={"300px"}
                            />
                          </div>
                        </Col>
                        <Row style={{ paddingTop: "20px" }}>
                          <Col
                            lg={9}
                            style={{
                              textAlign: "left",
                              alignContent: "flex-end",
                            }}
                          >
                            <h4>
                              <span
                                style={{
                                  fontWeight: "lighter",
                                  color: "#5593bd",
                                }}
                              >
                                INVOICE{" "}
                              </span>
                            </h4>

                            <br />
                            <span style={{ fontWeight: "bold" }}>
                              Property: {data?.property_name}{" "}
                            </span>
                            <br />
                            <span style={{ fontWeight: "bold" }}>
                              Unit: {data?.units_name}
                            </span>
                            <br />
                            <span style={{ fontWeight: "bold" }}>
                              Amount: ${data?.amount_total}
                            </span>
                          </Col>
                          <Col
                            lg={3}
                            style={{
                              textAlign: "initial",
                              alignContent: "flex-end",
                            }}
                          >
                            <h4>
                              <span
                                style={{
                                  fontWeight: "lighter",
                                  color: "#5593bd",
                                }}
                              ></span>
                            </h4>
                            <br />
                            <span
                              style={{
                                fontWeight: "lighter",
                                color: "grey",
                                fontSize: 12,
                                textAlign: "left",
                              }}
                            >
                              INVOICE TYPE:{" "}
                            </span>
                            {data?.units_name}
                            <br />
                            <span
                              style={{
                                fontWeight: "lighter",
                                color: "grey",
                                fontSize: 12,
                                textAlign: "left",
                              }}
                            >
                              GENERATE DATE :{" "}
                            </span>
                            {formatDate(data.invoice_date_gen)}
                            <br />
                            <span
                              style={{
                                fontWeight: "lighter",
                                color: "grey",
                                fontSize: 12,
                                textAlign: "left",
                              }}
                            >
                              TRANSACTION NO. :{" "}
                            </span>
                            {data?.transaction_number}
                            <br />
                            <span
                              style={{
                                fontWeight: "lighter",
                                color: "grey",
                                fontSize: 12,
                                textAlign: "left",
                              }}
                            >
                              TRANSACTION DATE :{" "}
                            </span>
                            {formatDate(data.transaction_date)}
                          </Col>
                        </Row>

                        <div
                          className="col-12"
                          style={{ margin: "20px 0px" }}
                        ></div>

                        {/* Part 6: Table */}
                        <Col lg={12}>
                          <table
                            className="table"
                            style={{ borderBottom: "1px dotted #69a0c4" }}
                          >
                            <thead>
                              <tr style={{ backgroundColor: "#dce9f1" }}>
                                <th
                                  style={{
                                    borderRight: "1px solid ##69a0c4",
                                    color: "#5f9ac1",
                                  }}
                                >
                                  SR NO.
                                </th>
                                <th
                                  style={{
                                    width: "500px",
                                    borderRight: "1px solid ##69a0c4",
                                    color: "#5f9ac1",
                                  }}
                                >
                                  DESCRIPTION
                                </th>
                                <th
                                  style={{ color: "#5f9ac1", textAlign: "end" }}
                                >
                                  Amount ($)
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* Rows go here */}
                              {data?.invoice_details.map((item, index) => (
                                <tr style={{}}>
                                  <td
                                    style={{
                                      fontWeight: "600",
                                      fontSize: 12,
                                    }}
                                  >
                                    {index + 1}
                                  </td>
                                  <td
                                    style={{
                                      fontWeight: "600",
                                      fontSize: 12,
                                    }}
                                  >
                                    {item.description}
                                  </td>
                                  <td
                                    style={{
                                      textAlign: "end",
                                      fontWeight: "600",
                                      fontSize: 12,
                                    }}
                                  >
                                    $ {item.amount}
                                  </td>
                                </tr>
                              ))}
                              {/* ... */}
                              <tr>
                                <td
                                  style={{ fontWeight: "600", fontSize: 18 }}
                                ></td>
                                <td
                                  style={{ fontWeight: "600", fontSize: 18 }}
                                ></td>
                                <td
                                  style={{
                                    fontWeight: "800",
                                    fontSize: 17,
                                    textAlign: "-webkit-right",
                                    color: "#5f9ac1",
                                  }}
                                >
                                  Total Amount : $
                                  {calculateSumOfAmounts(data?.invoice_details)}
                                </td>
                              </tr>
                              {/* Add more rows as needed */}
                            </tbody>
                          </table>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        )}
      </Modal>
    </>
  );
};

export default RentalPdf;
