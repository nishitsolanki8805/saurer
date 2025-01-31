import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Label,
    Container,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import { ThreeDots } from "react-loader-spinner";
import Switch from "react-switch";
import { useHistory } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { GET_ALL_USER, USER_UPDATE_BY_FIELD } from "../../../global";
import TableComponent from "../../../components/Common/TableComponent";

import { IoMdCloseCircle } from "react-icons/io";
import { ImEyeBlocked } from "react-icons/im";
import { TbEditOff } from "react-icons/tb";
import { AiTwotoneEdit } from "react-icons/ai";




const Offsymbol = () => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 12,
            color: "#fff",
            paddingRight: 2,
        }}
    >
        No
    </div>
);

const OnSymbol = () => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: 12,
            color: "#fff",
            paddingRight: 2,
        }}
    >
        Yes
    </div>
);

const EmployeeList = () => {
    const { state } = useLocation();

    const [breadcrumbItems] = useState([
        {
            title: "SAURER.",
            link: process.env.PUBLIC_URL + "/dashboard",
        },

        {
            title: "Employee List",
            link: "#",
        },
    ]);

    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentpageIndex, setCurrentpageIndex] = useState(0);
    const [pageTotal, setPageTotal] = useState(0);
    const [show, setShow] = useState(false);
    const [VerifyModal, setVerifyModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);
    const [VerifyData, setVerifyData] = useState();
    const [rejectData, setRejectData] = useState();
    const [perPage, setPerPage] = useState(10);
    const [allUserData, setAllUserData] = useState([]);
    const [isUserID, setIsUserID] = useState(false);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (state?.page) {
            getAllUsers(state?.page, state?.perPage);
        } else {
            getAllUsers();
        }
    }, [state?.page]);

    const history = useHistory();

    const getAllUsers = async (page, perpage) => {
        setIsLoading(true);
        const StoredData = localStorage.getItem("authUser");
        const Token = JSON.parse(StoredData);
        await fetch(
            page
                ? `${GET_ALL_USER}?page=${page}`
                : GET_ALL_USER,
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token.access_token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    per_page: perpage ? perpage : perPage,
                    field_db: "role_id",
                    search_val: "XbPW7awNkzl83LD6",
                }),
            }
        )
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setIsLoading(false);
                if (res.data) {
                    setAllUserData(res.data);
                    setPageTotal(res.meta?.pagination.total_pages);
                    setCurrentpageIndex(res.meta?.pagination.current_page);
                } else {
                }
            })
            .catch((err) => {
                // console.log(err);
            });
    };


    // UPDATE BY SWITCH
    //   const updateUserStatus = async (id, value) => {
    //     var Token = await localStorage.getItem("authToken");

    //     // return false
    //     try {
    //       fetch(
    //         USER_UPDATE_BY_FIELD + id,
    //         {
    //           method: "POST",
    //           headers: {
    //             Authorization: "Bearer " + Token,
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             "field_db": "is_active",
    //             "search_val": value === true ? 1 : 0,
    //           }),
    //         }
    //       ).then((response) => {
    //         response.json().then((data) => {
    //           if (data.result == true) {
    //             toast("SuccessFully Update User Access", {
    //               type: "success",
    //             });
    //             getAllUsers(currentpageIndex, perPage);
    //           }
    //         });
    //       });
    //     } catch (error) {
    //       // console.log("Something Went Wrong", error);
    //     }
    //   };

    // UPDATE BY Verified Status


    const VerifiedStatus = async (id, value) => {
        const StoredData = localStorage.getItem("authUser");
        const Token = JSON.parse(StoredData);
        try {
            const response = await fetch(
                USER_UPDATE_BY_FIELD + id,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + Token.access_token,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "field_db": "is_verify",
                        "search_val": value,
                        // "user_notes": notes,
                    }),

                })
            // if (!response.ok) {
            //     throw new Error("Network response was not ok");
            // }

            // Handle successful response
            if (response.status === 200) {

                toast("SuccessFully Update User Status", {
                    type: "success",
                });
                setVerifyModal(false)
                setRejectModal(false)
                getAllUsers(currentpageIndex, perPage);
            } else {
                toast('Error', {
                    type: "warning",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle error
        }
    };




    const renderTHContent = () => {
        return (
            <>
                <tr>

                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    {/* <th>Access</th> */}
                    <th>Status</th>
                    <th className="text-center">Action</th>
                </tr>
            </>
        );
    };

    //  Added Not Access of verified and reject for Employee
    const RoleId = localStorage.getItem("authRoleID");
    const renderTdContent = (item) => {
      
        return (
            <>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{`${item.first_name} ${item.last_name}`} </span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.email}</span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.mobile}</span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.country}</span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.state}</span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.city}</span>
                    </p>
                </td>
                <td>
                    {/* <h5 className="font-size-14 text-truncate"></h5> */}
                    {
                        item?.is_verify == '1' ?
                            <>
                                <p className="mb-0 pt-2">
                                    <span className="fw-medium text-success">{'Verified'}</span>
                                </p>
                            </>
                            :
                            item?.is_verify == '2' ?
                                <>
                                    <p className="mb-0 pt-2">
                                        <span className="fw-medium text-danger">{'Rejected'}</span>
                                    </p>
                                </>
                                :
                                <>
                                    {/* {
                    RoleId == "XbPW7awNkzl83LD6" ?
                      <>
                        <p className="mb-0 pt-2">
                          <span className="fw-medium text-success">{'unverified'}</span>
                        </p>
                      </>
                      : */}
                                    <>

                                        <Button color="success" outline size="sm" onClick={() => {
                                            setVerifyData(item)
                                            setVerifyModal(true)
                                        }}>Verify</Button>
                                        <Button color="danger" outline className="mx-2" size="sm" onClick={() => {
                                            setRejectData(item)
                                            setRejectModal(true)
                                        }}>Reject</Button>
                                    </>
                                    {/* } */}
                                </>
                    }

                </td>
                <td style={{ width: "90px" }} className="text-center">
                    <>
                        <AiTwotoneEdit
                            style={{
                                // color: "#5664d2",
                                height: "20px",
                                width: "20px",
                                marginTop: "8px",
                                marginLeft: "10px",
                                cursor: 'pointer'
                            }}
                            onClick={() =>
                                history.push(process.env.PUBLIC_URL + '/edit-employee/' + item.id, { isView: false, page: currentpageIndex, perPage: perPage })
                            }
                        />
                        {/* <ImEye
                                    style={{
                                        color: "#5664d2",
                                        height: "20px",
                                        width: "20px",
                                        marginTop: "8px",
                                        marginLeft: "10px",
                                    }}
                                    onClick={() =>
                                        history.push(process.env.PUBLIC_URL + '' + item.id, { isView: true })
                                    }
                                /> */}
                    </>
                </td>
                {/* <td>
          <div
            // style={{ margin: "10px" }}
            className="form-check form-switch pt-1"
            dir="ltr"
          >
            <Input
              type="checkbox"
              className="form-check-input"
              id="customSwitch1"
              disabled={item?.is_verified == '2' ? true : false}
              style={{
                height: "18px",
                width: "30px",
              }}
              checked={
                item.is_active == 1 ? 1 : 0
              }
              onChange={(val) => {
                // user.is_active = val.target
                //   .checked
                //   ? 1            
                updateUserStatus(
                  item.id,
                  val.target.checked
                );
              }}
            />
          </div>
                 </td> */}
            </>
        );
    };





    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Employee List" breadcrumbItems={breadcrumbItems} />
                    {isLoading ? (
                        <>
                            {/* <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4D5DC6"
                ariaLabel="three-dots-loading"
                wrapperStyle={{
                  justifyContent: "center",
                }}
                wrapperClassName=""
                visible={true}
              /> */}
                            <p>Loading ...</p>
                        </>
                    ) : (
                        <>
                            <TableComponent
                                allUserData={allUserData}
                                perPage={perPage}
                                currentpageIndex={currentpageIndex}
                                pageTotal={pageTotal}
                                history={history}
                                setPerPage={setPerPage}
                                setIsUserID={setIsUserID}
                                setShow={setShow}
                                getAllUsers={getAllUsers}
                                renderTHContent={renderTHContent}
                                renderTdContent={renderTdContent}
                                btnName={"Add Employee"}
                                addData={"/create-employee"}
                                editData={"/edituser/"}
                                viewData={'/viewuser/'}
                                SearchData={['first_name', 'last_name', 'email', 'mobile', 'city', 'state', 'country', '']}
                                isDeleteUser={false}
                            />
                        </>
                    )}
                </Container>
                {
                    VerifyModal && (

                        <Modal isOpen={VerifyModal} backdrop="static">
                            <ModalHeader toggle={() => setVerifyModal(false)}>Verify User</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to Verify this user?</p>

                            </ModalBody>
                            <ModalFooter>
                                <Button type="button" color="success" onClick={() => {
                                    VerifiedStatus(
                                        VerifyData.id,
                                        1
                                    );
                                }}>
                                    Verify
                                </Button>
                                <Button type="button" color="light" onClick={() => setVerifyModal(false)}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </Modal>
                    )
                }
                {
                    rejectModal && (

                        <Modal isOpen={rejectModal} backdrop="static">
                            <ModalHeader toggle={() => setRejectModal(false)}>Reject User</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to Reject this user?</p>
                                {/* <div className='mt-3'>
                                    <Label>Add Reason</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter Reason"
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </div> */}
                            </ModalBody>
                            <ModalFooter>
                                <Button type="button" color="danger" onClick={() => {
                                    VerifiedStatus(
                                        rejectData.id,
                                        2
                                    );
                                }}>
                                    Reject
                                </Button>
                                <Button type="button" color="light" onClick={() => setRejectModal(false)}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </Modal>
                    )
                }
            </div>

        </React.Fragment>
    );
};

export default EmployeeList;


