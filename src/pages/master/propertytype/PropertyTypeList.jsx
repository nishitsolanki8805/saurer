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
import { GET_ALL_EXPENSE, GET_ALL_PROPERTY_TYPE, GET_ALL_USER } from "../../../global";
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

const PropertyTypeList = () => {
    const { state } = useLocation();

    const [breadcrumbItems] = useState([
        {
            title: "SAURER.",
            link: process.env.PUBLIC_URL + "/dashboard",
        },
       
        {
            title: "Property Type List",
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
                ? `${GET_ALL_PROPERTY_TYPE}?page=${page}`
                : GET_ALL_PROPERTY_TYPE,
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token.access_token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    per_page: perpage ? perpage : perPage,
                    field_db: "",
                    search_val: "",
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

    console.log('allUserData---', allUserData)
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



    const renderTHContent = () => {
        return (
            <>
                <tr>

                    <th>Property Type</th>
                    {/* <th>Email</th>
                    <th>Mobile</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th> */}
                    {/* <th>Access</th> */}
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
                        <span className="fw-medium">{`${item.type} `} </span>
                    </p>
                </td>
                {/* <td>
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
                </td> */}
                <td style={{ width: "90px" }} className="text-center">
                    <>
                        <AiTwotoneEdit
                            style={{
                                // color: "#5664d2",
                                height: "20px",
                                width: "20px",
                                marginTop: "8px",
                                marginLeft: "10px",
                                cursor:'pointer'
                            }}
                            onClick={() =>
                                history.push(process.env.PUBLIC_URL + '/edit-property-type/' + item.id, { isView: false, page: currentpageIndex, perPage: perPage })
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
                    <Breadcrumbs title="Property Type List" breadcrumbItems={breadcrumbItems} />
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
                                btnName={"Add Property Type"}
                                addData={"/create-property-type"}
                                editData={"/edituser/"}
                                viewData={'/viewuser/'}
                                SearchData={['type']}
                                isDeleteUser={false}
                            />
                        </>
                    )}
                </Container>
            </div>

        </React.Fragment>
    );
};

export default PropertyTypeList;