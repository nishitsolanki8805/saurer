import React, { useEffect, useState } from "react";
// import { Formik, Form, Field } from 'formik';
import {
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Label,
  Row,
  BreadcrumbItem,
  Button,
} from "reactstrap";
import { AvForm, AvGroup, AvInput } from "availity-reactstrap-validation";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import {
  GET_ALL_PERMISSION_BY_SEARCH,
  NEW_GET_ROLE_BY_ID,
  ROLE_PERMISSION_BY_SEARCH,
  UPDATE_ROLE_PERMISSION_BY_ID,
} from "../../global";
import Breadcrumb from "./../../components/Common/Breadcrumb";
// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import { BASE_URL } from "../../global";
// import { ThreeDots } from "react-loader-spinner";

// const initialValues = {
//   product_type: false,
//   expense_management: false
// };

const PermissionPage = () => {
  const { id } = useParams();
  console.log("id===>", id);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [getAllPermissionData, setGetAllPermissionData] = useState({});
  const [getRoleById, setRoleById] = useState();
  const breadcrumbItems = [
    { title: "Saurer", link: "#" },
    { title: "Role Permission", link: "#" },
  ];

  // This is Reference Example
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

  // Above Reference Example

  useEffect(() => {
    GetAllPermission();
    GetRoleById();
  }, [id]);

  const GetAllPermission = async () => {
    setIsLoading(true);
    // const StoredData = localStorage.getItem("authJansm");
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(`${GET_ALL_PERMISSION_BY_SEARCH}`, {
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
            // setIsLoading(false)
            GetPermissionByRoleID(responseJson.data);
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const GetRoleById = async () => {
    setIsLoading(true);
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(`${NEW_GET_ROLE_BY_ID}` + id, {
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
            setRoleById(responseJson.data);
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const GetPermissionByRoleID = async (roleData) => {
    const Data = JSON.parse(localStorage.getItem("authUser"));
    await fetch(`${ROLE_PERMISSION_BY_SEARCH}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + Data.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role_id_encode: id,
      }),
    })
      .then((response) => {
        response.json().then((responseJson) => {
          if (responseJson.data) {
            const combinedData = roleData?.map((itemMain) => {
              const matchingDataItem = responseJson.data.find(
                (item) => item.permission_id === itemMain.id
              );
              if (matchingDataItem) {
                // If a matching item is found in data, add additional fields to the itemMain
                return {
                  ...itemMain,
                  role_id: matchingDataItem.role_id,
                  id_encode: matchingDataItem.id,
                  permission_id: matchingDataItem.permission_id,
                  permission_value: matchingDataItem.permission_value,
                };
              } else {
                // If no matching item is found in data, return the original itemMain
                return itemMain;
              }
            });
            const permissionsByGroup = combinedData?.reduce((groups, item) => {
              const group = groups[item.group_name] || [];
              group.push(item);
              groups[item.group_name] = group;
              return groups;
            }, {});
            setGetAllPermissionData(permissionsByGroup);
            setIsLoading(false);
          }
        });
      })
      .catch((error) => {
        console.log("Fetch Error", error);
      });
  };
  // const setPermissionByRoleID = async () => {
  //   const Data = JSON.parse(localStorage.getItem("authJansm"));
  //   await fetch(`${BASE_URL}/rolepermissionbysearch`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: "Bearer " + Data.access_token,
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       role_id_encode: id,
  //     }),
  //   })
  //     .then((response) => {
  //       response.json().then((responseJson) => {
  //         if (responseJson.data) {
  //           localStorage.setItem(
  //             "permission",
  //             JSON.stringify(responseJson.data)
  //           );
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("Fetch Error", error);
  //     });
  // };

  // // Update Role Permission API
  const updateUserPermission = async (item, value) => {
    // return false
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    if (item?.id_encode) {
      await fetch(`${UPDATE_ROLE_PERMISSION_BY_ID}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Token.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_encode: item.id_encode,
          module_id_encode: item.module_id,
          role_id_encode: item.role_id,
          permission_id_encode: item.permission_id,
          permission_value: value ? "1" : "0", // Ensure correct status for updating
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          // setPermissionByRoleID();
          toast.success("Successfully Updated Permission");
        })

        .catch((err) => {});
    } else {
      await fetch(`${UPDATE_ROLE_PERMISSION_BY_ID}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Token.access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          permission_id_encode: item.id,
          module_id_encode: item.module_id,
          role_id_encode: id,
          permission_value: value ? "1" : "0", // Ensure correct status for updating
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          toastr.success("Successfully Updated Permission");
        })
        .catch((err) => {});
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb
            title="Roles Permission"
            breadcrumbItems={breadcrumbItems}
          />
          {isLoading ? (
            <>
              <p>Loading ...</p>
            </>
          ) : (
            <>
              <Card>
                <CardBody>
                  <AvForm>
                    <Row>
                      <p>Role Name : {getRoleById?.name}</p>
                      {getAllPermissionData &&
                        Object.keys(getAllPermissionData).map(
                          (groupName, groupIndex) => (
                            <>
                              <h3>{capitalizeFirstLetter(groupName)}</h3>
                              {getAllPermissionData[groupName].map(
                                (item, ind) => (
                                  <Col lg={4} className="mb-1 mt-1" key={ind}>
                                    <FormGroup key={item.key}>
                                      <AvGroup check>
                                        <AvInput
                                          type="checkbox"
                                          name="reverse_check"
                                          value={
                                            item.permission_value === "1"
                                              ? true
                                              : false
                                          }
                                          className="form-check-input"
                                          onChange={(val) => {
                                            updateUserPermission(
                                              item,
                                              val.target.checked
                                            );
                                            console.log("use code");
                                          }}
                                        />
                                        <Label check for="checkbox">
                                          {item.field_name}
                                        </Label>
                                      </AvGroup>
                                    </FormGroup>
                                  </Col>
                                )
                              )}
                              <hr></hr>
                            </>
                          )
                        )}
                      {/* Old method */}
                      {/* {getAllPermissionData?.map((item, ind) => (

                                                    <Col lg={4} className="mb-1 mt-1" key={ind}>
                                                        <FormGroup key={item.key}>
                                                            <AvGroup check>
                                                                <AvInput
                                                                    type="checkbox"
                                                                    name="reverse_check"
                                                                    value={item.permission_value === "1" ? true : false}
                                                                    className="form-check-input"
                                                                    onChange={(val) => {
                                                                        updateUserPermission(item, val.target.checked)
                                                                    }}
                                                                />
                                                                <Label check for="checkbox">
                                                                    {item.field_name}
                                                                </Label>
                                                            </AvGroup>
                                                        </FormGroup>
                                                    </Col>
                                                ))} */}
                    </Row>
                  </AvForm>
                </CardBody>
              </Card>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PermissionPage;
