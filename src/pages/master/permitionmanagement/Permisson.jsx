import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Card, CardBody, Col, Container, FormGroup, Label, Row, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { GET_ALL_PERMISSION, GET_ALL_PERMISSION_BY_ROLE_ID, GET_ROLE_BY_ID, UPDATE_PERMISSION_BY_ID } from '../../../global';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// const initialValues = {
//   product_type: false,
//   expense_management: false
// };

const Permission = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [getAllPermissionData, setGetAllPermissionData] = useState();
  const [getAllPermissionDataByRoleID, setGetAllPermissionByRoleID] = useState();
  const [getRoleById, setRoleById] = useState();
  const breadcrumbItems = [
    {
      title: "SAURER.",
      link: process.env.PUBLIC_URL + "/dashboard",
    },
    {
      title: "Permission List",
      link: process.env.PUBLIC_URL + "/expense-list",
    },
    {
      title: id ? "Edit Role Permission" : "Edit Role Permission",
      link: "#",
    },

  ]
  const itemsLength = breadcrumbItems.length;

  // const dataMain = [
  //   {
  //     object: "pro_permission",
  //     id: "NxOpZowo9GmjKqdR",
  //     name: "Product Type",
  //     key: "product_type",
  //     created_at: "2024-02-26T11:01:22.000000Z",
  //     updated_at: "2024-02-26T06:31:25.000000Z"
  //   },
  //   {
  //     object: "pro_permission",
  //     id: "XbPW7awNkzl83LD6",
  //     name: "Expense Management",
  //     key: "expense_management",
  //     created_at: "2024-02-29T09:33:39.000000Z",
  //     updated_at: "2024-02-29T05:03:42.000000Z"
  //   }
  // ];

  // const data = [
  //   {
  //     object: "pro_role_permission",
  //     id: "39n0Z12OZGKERJgW",
  //     role_id: "XbPW7awNkzl83LD6",
  //     permission_id: "XbPW7awNkzl83LD6",
  //     status: "1",
  //     created_at: "2024-02-29T11:52:07.000000Z",
  //     updated_at: "2024-02-29T11:52:07.000000Z"
  //   }
  // ];
  useEffect(() => {
    GetAllPermission();
    GetRoleById();
  }, [])


  const GetAllPermission = async () => {

    setIsLoading(true)
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_ALL_PERMISSION, {
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
          
            // console.log('dataByID', responseJson.data)
            // setIsLoading(false)
            GetPermissionByRoleID(responseJson.data)
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }
  const GetRoleById = async () => {

    setIsLoading(true)
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_ROLE_BY_ID + id, {
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
            setRoleById(responseJson.data)
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  const GetPermissionByRoleID = async (roleData) => {

    setIsLoading(true)
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_ALL_PERMISSION_BY_ROLE_ID + id, {
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
           
            const combinedData = roleData?.map(itemMain => {
              const matchingDataItem = responseJson.data.find(item => item.permission_id === itemMain.id);

              if (matchingDataItem) {
                // If a matching item is found in data, add additional fields to the itemMain
                return {
                  ...itemMain,
                  role_id: matchingDataItem.role_id,
                  status: matchingDataItem.status,
                  id_decode: matchingDataItem.id
                }
              } else {
                // If no matching item is found in data, return the original itemMain
                return itemMain;
              }
            });
            setGetAllPermissionData(combinedData)
            // console.log('dataByID', responseJson.data)
          
            setIsLoading(false)
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  // // Find items in dataMain where id matches permission_id in data
  // const combinedData = dataMain.map(itemMain => {
  //   const matchingDataItem = data.find(item => item.permission_id === itemMain.id);

  //   if (matchingDataItem) {
  //     // If a matching item is found in data, add additional fields to the itemMain
  //     return {
  //       ...itemMain,
  //       role_id: matchingDataItem.role_id,
  //       status: matchingDataItem.status
  //     }
  //   } else {
  //     // If no matching item is found in data, return the original itemMain
  //     return itemMain;
  //   }
  // });


  // Update USERRolePermission API
  const updateUserPermission = async (item, value) => {
    // return false
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    if (item?.id_decode) {
      await fetch(UPDATE_PERMISSION_BY_ID, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Token.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_decode: item.id_decode,
          role_id: id,
          permission_id: item.id,
          status: value ? "1" : "0", // Ensure correct status for updating
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          // console.log("RES=====CREATE USERDATA===========", res);
              toast("Successfully Updated Permission", {
                type: "success",
              });
          if (res.result == true) {
            //   setIsLoading(false);
            //   toast("SuccessFully Updated Profile", {
            //     type: "success",
            //   });
            //   history.push(process.env.PUBLIC_URL + "/dashboard");
            // toast("Role Permission updated successfully!", {
            //     type: "success",
            // });
          } else {
            //   setIsLoading(false);
            // toast(res.message, {
            //     type: "warning",
            // });
          }
        })

        .catch((err) => {
          // toast("Unable to update/create Role Permission", {
          //     type: "err",
          // });
        });
    } else {

      await fetch(UPDATE_PERMISSION_BY_ID, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Token.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          permission_id: item.id,
          role_id: id,
          // permission_id_encode: item.permission_id,
          status: value ? "1" : "0", // Ensure correct status for updating
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          // console.log("RES=====CREATE USERDATA===========", res);
            toast("Successfully Updated Permission", {
                type: "success",
              });
          if (res.result == true) {
            //   setIsLoading(false);
            //   toast("SuccessFully Updated Profile", {
            //     type: "success",
            //   });
            //   history.push(process.env.PUBLIC_URL + "/dashboard");
            // toast("Role Permission created successfully!", {
            //     type: "success",
            // });
          } else {
            //   setIsLoading(false);
            // toast(res.message, {
            //     type: "warning",
            // });
          }
        })

        .catch((err) => {
          // toast("Unable to update/create Role Permission", {
          //     type: "err",
          // });
        });
    }

  };


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="align-items-center">
            <div className="d-flex justify-content-between">
              {/* <Col xs={12} lg={8} className="justify-content-center"> */}
              <div className="page-title-box d-flex align-items-center justify-content-center">
                <h4 className="mb-0">{"Edit Role Permission"}</h4>
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
                    {breadcrumbItems.map((item, key) =>
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
                  // onClick={() => this.props.history.goBack()}
                  onClick={() => history.goBack()}
                  className="waves-effect waves-light me-1"
                >
                  <i className="ri-arrow-left-line align-middle me-2"></i>
                  Back
                </Button>
              </div>
            </div>
          </Row>
          {
            isLoading ?
              <>
                <p>Loading ...</p>
              </>

              :
              <>
                <Card>
                  <CardBody>
                    <AvForm>
                      <Row>
                        <p>Role Name : {getRoleById?.name}</p>
                        {getAllPermissionData?.map(item => (

                          <Col lg={4} className="mb-1 mt-1" key={item.key}>
                            <FormGroup key={item.key}>
                              <AvGroup check>
                                <AvInput
                                  type="checkbox"
                                  name="reverse_check"
                                  value={item.status === "1" ? true : false}
                                  className="form-check-input"
                                  onChange={(val) => {
                                    updateUserPermission(item, val.target.checked)
                                  }}
                                />
                                <Label check for="checkbox">
                                  {item.name}
                                </Label>
                              </AvGroup>
                            </FormGroup>
                          </Col>
                        ))}
                      </Row>
                    </AvForm>
                  </CardBody>
                </Card>
              </>
          }

        </Container>
      </div>
    </React.Fragment>
  );
};

export default Permission;
