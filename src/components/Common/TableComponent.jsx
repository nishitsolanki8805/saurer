import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Input, Row, Col, Card, CardBody } from "reactstrap";
import "flatpickr/dist/flatpickr.css";
import Flatpickr from "react-flatpickr";

const TableComponent = ({
  allUserData,
  perPage,

  selectedUser,
  filterUserDataBtn,
  setFilterUser,
  filterUserData,

  selectedUnit,
  filterUnitDataBtn,
  setFilterUnit,
  filterUnitData,

  selectedStatus,
  filterStatusDataBtn,
  setFilterStatus,
  filterStatusData,

  selectedStartDate,
  filterStartDateDataBtn,
  setFilterStartDate,
  filterStartDateData,

  selectedEndDate,
  filterEndDateDataBtn,
  setFilterEndDate,
  filterEndDateData,

  selectedProperty,
  filterPropertyBtn,
  setFilterProperty,
  filterPropertyData,
  currentpageIndex,
  pageTotal,
  history,
  setPerPage,
  setIsUserID,
  setShow,
  getAllUsers,
  renderTdContent,
  renderTHContent,
  addData,
  editData,
  viewData,
  btnName,
  isDropDown = true,
  SearchData,
  isDeleteUser = true,
  isActionShow = true,
  isBtnShow = true,
  keyValue,
  pagination,
}) => {
  const [searchQuery, setSearchQuery] = useState(""); // Step 2
  const [filteredData, setFilteredData] = useState(allUserData);
  const isOnFleetListPage = window.location.pathname.includes("/fleetlist");
  useEffect(() => {
    const filtered = allUserData?.filter((item) => {
      if (SearchData) {
        return SearchData?.some((field) =>
          item[field]?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    });
    setFilteredData(filtered);
  }, [searchQuery]);

  // console.log('filteredData---', isOnFleetListPage)

  return (
    <div>
      <Row>
        <Col xl="12" sm="12">
          {isBtnShow && (
            <div className="text-end mb-3">
              <Button
                type="button"
                className="waves-effect waves-light me-1"
                onClick={() => history.push(process.env.PUBLIC_URL + addData)}
              >
                <i className=" ri-add-fill align-middle me-2"></i>
                {btnName}
              </Button>
              {/* </Link> */}
            </div>
          )}
          <Card>
            <CardBody>
              {keyValue == "report" ? (
                <Row className="mb-3">
                  {!pagination ? (
                    <Col className="mt-2" md={"3"}>
                      <select
                        className="form-select"
                        value={perPage}
                        onChange={async (e) => {
                          await setPerPage(parseInt(e.target.value));
                          getAllUsers(
                            currentpageIndex,
                            parseInt(e.target.value)
                          );
                        }}
                      >
                        {isDropDown
                          ? [10, 20, 30, 40, 50].map((pageSize) => {
                              return (
                                <option key={pageSize} value={pageSize}>
                                  Show {pageSize}
                                </option>
                              );
                            })
                          : [10].map((pageSize) => {
                              return (
                                <option key={pageSize} value={pageSize}>
                                  Show {pageSize}
                                </option>
                              );
                            })}
                      </select>
                    </Col>
                  ) : (
                    <></>
                  )}
                  {filterUserDataBtn ? (
                    <Col className="mt-2" md={"2"}>
                      <select
                        className="form-select"
                        value={selectedUser}
                        onChange={async (e) => {
                          await setFilterUser(e.target.value);
                          getAllUsers(1);
                        }}
                      >
                        {filterUserData ? (
                          filterUserData.map((item) => {
                            return (
                              <option key={item.id} value={item.id}>
                                {item.first_name} {item.last_name}
                              </option>
                            );
                          })
                        ) : (
                          <option>Select User</option>
                        )}
                      </select>
                    </Col>
                  ) : (
                    <></>
                  )}
                  {filterPropertyBtn ? (
                    <Col className="mt-2" md={!filterUserDataBtn ? "5" : "2"}>
                      <select
                        className="form-select"
                        value={selectedProperty}
                        onChange={async (e) => {
                          await setFilterProperty(e.target.value);
                          getAllUsers(1);
                        }}
                      >
                        {filterPropertyData ? (
                          filterPropertyData.map((item) => {
                            return (
                              <option
                                key={item.property_master_id}
                                value={item.property_master_id}
                              >
                                {item.property_name}
                              </option>
                            );
                          })
                        ) : (
                          <option>Select Property</option>
                        )}
                      </select>
                    </Col>
                  ) : (
                    <></>
                  )}
                  <Col className="mt-2" md={"3"}>
                    <Input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)} // Step 4
                    />
                  </Col>
                  {filterUnitDataBtn ? (
                    <Col className="mt-2" md={"3"}>
                      <select
                        disabled={selectedProperty ? false : true}
                        className="form-select"
                        value={selectedUnit ? selectedUnit : "Select Unit"}
                        onChange={async (e) => {
                          await setFilterUnit(e.target.value);
                          getAllUsers(1);
                        }}
                      >
                        {filterUnitData.length > 0 ? (
                          filterUnitData.map((item) => {
                            return (
                              <option key={item.id} value={item.id}>
                                {item.units_name}
                              </option>
                            );
                          })
                        ) : (
                          //  console.log("DATA______+_+_+_+_+__+_",filterUnitData)
                          <option>Select Unit</option>
                        )}
                      </select>
                    </Col>
                  ) : (
                    <></>
                  )}

                  {filterStartDateDataBtn ? (
                    <Col className="mt-2" md={keyValue ? "3" : "2"}>
                      <div className="control">
                        <Flatpickr
                          name="start_date"
                          value={new Date(selectedStartDate)}
                          onChange={async (e) => {
                            console.log("object", e);
                            const dateObject = new Date(e);

                            const year = dateObject.getFullYear();
                            const month = String(
                              dateObject.getMonth() + 1
                            ).padStart(2, "0");
                            const day = String(dateObject.getDate()).padStart(
                              2,
                              "0"
                            );

                            const formattedDate = `${year}-${month}-${day}`;

                            await setFilterStartDate(formattedDate);
                            getAllUsers(1);
                          }}
                          className={`form-control `}
                          placeholder="Enter Start Date"
                          options={{
                            dateFormat: "m-d-Y",
                          }}
                        />
                      </div>
                    </Col>
                  ) : (
                    <></>
                  )}
                  {filterEndDateDataBtn ? (
                    <Col className="mt-2" md={keyValue ? "3" : "2"}>
                      <div className="control">
                        <Flatpickr
                          name="end_date"
                          value={new Date(selectedEndDate)}
                          onChange={async (e) => {
                            console.log("object", e);
                            const dateObject = new Date(e);

                            const year = dateObject.getFullYear();
                            const month = String(
                              dateObject.getMonth() + 1
                            ).padStart(2, "0");
                            const day = String(dateObject.getDate()).padStart(
                              2,
                              "0"
                            );

                            const formattedDate = `${year}-${month}-${day}`;

                            await setFilterEndDate(formattedDate);
                            getAllUsers(1);
                          }}
                          className={`form-control `}
                          placeholder="Enter End Date"
                          options={{
                            dateFormat: "m-d-Y",
                          }}
                        />
                      </div>
                    </Col>
                  ) : (
                    <></>
                  )}
                  {filterStatusDataBtn ? (
                    <Col className="mt-2" md={"3"}>
                      <select
                        className="form-select"
                        value={selectedStatus}
                        onChange={async (e) => {
                          await setFilterStatus(e.target.value);
                          await getAllUsers(e.target.value);
                        }}
                      >
                        {filterStatusData ? (
                          filterStatusData.map((item) => {
                            return (
                              <option key={item.id} value={item.id}>
                                {item.title}
                              </option>
                            );
                          })
                        ) : (
                          <option>Select Status</option>
                        )}
                      </select>
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
              ) : (
                <Row className="mb-2">
                  <div className="d-flex justify-content-between">
                    {!pagination ? (
                      <Col className="mt-2" md={"3"}>
                        <select
                          className="form-select"
                          value={perPage}
                          onChange={async (e) => {
                            await setPerPage(parseInt(e.target.value));
                            getAllUsers(
                              currentpageIndex,
                              parseInt(e.target.value)
                            );
                          }}
                        >
                          {isDropDown
                            ? [10, 20, 30, 40, 50].map((pageSize) => {
                                return (
                                  <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                  </option>
                                );
                              })
                            : [10].map((pageSize) => {
                                return (
                                  <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                  </option>
                                );
                              })}
                        </select>
                      </Col>
                    ) : (
                      <></>
                    )}
                    {filterUserDataBtn ? (
                      <Col className="mt-2" md={"2"}>
                        <select
                          className="form-select"
                          value={selectedUser}
                          onChange={async (e) => {
                            await setFilterUser(e.target.value);
                            getAllUsers(1);
                          }}
                        >
                          {filterUserData ? (
                            filterUserData.map((item) => {
                              return (
                                <option key={item.id} value={item.id}>
                                  {item.first_name} {item.last_name}
                                </option>
                              );
                            })
                          ) : (
                            <option>Select User</option>
                          )}
                        </select>
                      </Col>
                    ) : (
                      <></>
                    )}
                    {filterPropertyBtn ? (
                      <Col className="mt-2" md={!filterUserDataBtn ? "5" : "2"}>
                        <select
                          className="form-select"
                          value={selectedProperty}
                          onChange={async (e) => {
                            await setFilterProperty(e.target.value);
                            getAllUsers(1);
                          }}
                        >
                          {filterPropertyData ? (
                            filterPropertyData.map((item) => {
                              return (
                                <option
                                  key={item.property_master_id}
                                  value={item.property_master_id}
                                >
                                  {item.property_name}
                                </option>
                              );
                            })
                          ) : (
                            <option>Select Property</option>
                          )}
                        </select>
                      </Col>
                    ) : (
                      <></>
                    )}
                    <Col className="mt-2" md={"3"}>
                      <Input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Step 4
                      />
                    </Col>
                  </div>

                  <div
                    className="d-flex justify-content-between"
                    // style={{
                    //   flexFlow: keyValue == "report" ? "row-reverse" : "row",
                    // }}
                  >
                    {filterUnitDataBtn ? (
                      <Col className="mt-2" md={"3"}>
                        <select
                          disabled={selectedProperty ? false : true}
                          className="form-select"
                          value={selectedUnit ? selectedUnit : "Select Unit"}
                          onChange={async (e) => {
                            await setFilterUnit(e.target.value);
                            getAllUsers(1);
                          }}
                        >
                          {filterUnitData.length > 0 ? (
                            filterUnitData.map((item) => {
                              return (
                                <option key={item.id} value={item.id}>
                                  {item.units_name}
                                </option>
                              );
                            })
                          ) : (
                            //  console.log("DATA______+_+_+_+_+__+_",filterUnitData)
                            <option>Select Unit</option>
                          )}
                        </select>
                      </Col>
                    ) : (
                      <></>
                    )}

                    {filterStartDateDataBtn ? (
                      <Col className="mt-2" md={keyValue ? "3" : "2"}>
                        <div className="control">
                          <Flatpickr
                            name="start_date"
                            value={new Date(selectedStartDate)}
                            onChange={async (e) => {
                              console.log("object", e);
                              const dateObject = new Date(e);

                              const year = dateObject.getFullYear();
                              const month = String(
                                dateObject.getMonth() + 1
                              ).padStart(2, "0");
                              const day = String(dateObject.getDate()).padStart(
                                2,
                                "0"
                              );

                              const formattedDate = `${year}-${month}-${day}`;

                              await setFilterStartDate(formattedDate);
                              getAllUsers(1);
                            }}
                            className={`form-control `}
                            placeholder="Enter Start Date"
                            options={{
                              dateFormat: "m-d-Y",
                            }}
                          />
                        </div>
                      </Col>
                    ) : (
                      <></>
                    )}
                    {filterEndDateDataBtn ? (
                      <Col className="mt-2" md={keyValue ? "3" : "2"}>
                        <div className="control">
                          <Flatpickr
                            name="end_date"
                            value={new Date(selectedEndDate)}
                            onChange={async (e) => {
                              console.log("object", e);
                              const dateObject = new Date(e);

                              const year = dateObject.getFullYear();
                              const month = String(
                                dateObject.getMonth() + 1
                              ).padStart(2, "0");
                              const day = String(dateObject.getDate()).padStart(
                                2,
                                "0"
                              );

                              const formattedDate = `${year}-${month}-${day}`;

                              await setFilterEndDate(formattedDate);
                              getAllUsers(1);
                            }}
                            className={`form-control `}
                            placeholder="Enter End Date"
                            options={{
                              dateFormat: "m-d-Y",
                            }}
                          />
                        </div>
                      </Col>
                    ) : (
                      <></>
                    )}
                    {filterStatusDataBtn ? (
                      <Col className="mt-2" md={"3"}>
                        <select
                          className="form-select"
                          value={selectedStatus}
                          onChange={async (e) => {
                            await setFilterStatus(e.target.value);
                            await getAllUsers(e.target.value);
                          }}
                        >
                          {filterStatusData ? (
                            filterStatusData.map((item) => {
                              return (
                                <option key={item.id} value={item.id}>
                                  {item.title}
                                </option>
                              );
                            })
                          ) : (
                            <option>Select Status</option>
                          )}
                        </select>
                      </Col>
                    ) : (
                      <></>
                    )}
                  </div>
                </Row>
              )}

              <Row>
                <Col lg={12}>
                  <div className="table-responsive">
                    <Table className="table-centered mb-0 table-nowrap">
                      <thead className="bg-light">
                        {/* <tr>
                          <th className="text-center">Action</th>
                          <th>Company Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                        </tr> */}
                        {renderTHContent()}
                      </thead>
                      <tbody>
                        {/* {allUserData?.map((item, index) => { */}
                        {filteredData?.map((item, index) => {
                          return <tr key={item.id}>{renderTdContent(item)}</tr>;
                        })}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!pagination ? (
        <Row className="justify-content-md-end justify-content-center align-items-center mb-2">
          <Col className="col-md-auto">
            <div className="d-flex gap-1">
              <Button
                // color="primary"
                onClick={() => getAllUsers(0)}
                disabled={currentpageIndex == 1}
                style={{
                  backgroundColor: `var(--bs-header-bg`,
                  borderColor: "#fff",
                }}
              >
                {"<<"}
              </Button>
              <Button
                // color="primary"
                onClick={() => getAllUsers(currentpageIndex - 1)}
                disabled={currentpageIndex == 1}
                style={{
                  backgroundColor: `var(--bs-header-bg`,
                  borderColor: "#fff",
                }}
              >
                {"<"}
              </Button>
            </div>
          </Col>
          <Col className="col-md-auto d-none d-md-block">
            Page{" "}
            <strong>
              {currentpageIndex} of {pageTotal}
            </strong>
          </Col>
          <Col className="col-md-auto">
            <Input
              type="number"
              min={1}
              style={{ width: 70 }}
              max={allUserData?.length}
              defaultValue={currentpageIndex}
              onClick={(event) => event.target.select()}
              onChange={(e) => getAllUsers(parseInt(e.target.value))}
            />
          </Col>
          <Col className="col-md-auto">
            <div className="d-flex gap-1">
              <Button
                // color="primary"
                onClick={() => getAllUsers(currentpageIndex + 1)}
                disabled={currentpageIndex === pageTotal}
                style={{
                  backgroundColor: `var(--bs-header-bg`,
                  borderColor: "#fff",
                }}
              >
                {">"}
              </Button>
              <Button
                // color="primary"
                onClick={() => getAllUsers(pageTotal)}
                disabled={currentpageIndex === pageTotal}
                style={{
                  backgroundColor: `var(--bs-header-bg`,
                  borderColor: "#fff",
                }}
              >
                {">>"}
              </Button>
            </div>
          </Col>
        </Row>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TableComponent;
