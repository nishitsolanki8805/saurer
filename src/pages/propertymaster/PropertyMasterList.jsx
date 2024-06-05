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
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import { ThreeDots } from "react-loader-spinner";
import Switch from "react-switch";
import { useHistory } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import { IoMdCloseCircle } from "react-icons/io";
import { ImEyeBlocked } from "react-icons/im";
import { TbEditOff } from "react-icons/tb";
import { AiTwotoneEdit } from "react-icons/ai";
import { GET_ALL_PROPERTY_BY_SEARCH, GET_ALL_USER, UPDATE_PROPERTY_MASTER_BY_FIELD } from "../../global";
import TableComponent from "../../components/Common/TableComponent";




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

const PropertyMasterList = () => {
    const { state } = useLocation();

    const [breadcrumbItems] = useState([
        {
            title: "SAURER.",
            link: process.env.PUBLIC_URL + "/dashboard",
        },

        {
            title: "Property Master",
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
            getAllProperty(state?.page, state?.perPage);
        } else {
            getAllProperty();
        }
    }, [state?.page]);

    const history = useHistory();

    const getAllProperty = async (page, perpage) => {
        setIsLoading(true);
        const StoredData = localStorage.getItem("authUser");
        const Token = JSON.parse(StoredData);
        await fetch(
            page
                ? `${GET_ALL_PROPERTY_BY_SEARCH}?page=${page}`
                : GET_ALL_PROPERTY_BY_SEARCH,
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



    const updatePropertyByField = async (id, val) => {
        const StoredData = localStorage.getItem("authUser");
        const Token = JSON.parse(StoredData);
        try {
            const response = await fetch(
                UPDATE_PROPERTY_MASTER_BY_FIELD + id,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + Token.access_token,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "flag":"",
                        "field_db":"status",
                        "search_val":val == true ? 6 : 0 
                    }),

                })
            // if (!response.ok) {
            //     throw new Error("Network response was not ok");
            // }

            // Handle successful response
            if (response.status === 200) {
                toast('Property Status Update Successfully', {
                    type: "success",
                });
                getAllProperty();
                // this.props.history.goBack();
            } else {
                toast('Unable to Create', {
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

                    <th>Property Name</th>
                    <th>Property Type</th>
                    <th>Property Owner Role</th>
                    {/* <th>Property Owner</th> */}
                    <th>Commission Amount ($)</th>
                    <th>Commission Percentage</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Units</th>

                    {/* <th>Access</th> */}
                    <th className="text-center">Action</th>
                    <th>Status</th>
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
                        <span className="fw-medium">{`${item.property_name}`} </span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{`${item.type}`} </span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.property_owner_role} </span>
                    </p>
                </td>
                {/* <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.property_owner_name} </span>
                    </p>
                </td> */}
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">$ {item.property_owner_commission_amount ? item.property_owner_commission_amount : '-'} </span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.property_owner_commission_percentage ? item.property_owner_commission_percentage : '-'} </span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.property_country} </span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.property_state} </span>
                    </p>
                </td>
                <td>
                    <h5 className="font-size-14 text-truncate"></h5>
                    <p className="mb-0">
                        <span className="fw-medium">{item.property_city} </span>
                    </p>
                </td>
                <td>
                    <>
                        <ImEye
                            style={{
                                // color: "#5664d2",
                                height: "20px",
                                width: "20px",
                                marginTop: "8px",
                                marginLeft: "10px",
                            }}
                            onClick={() =>
                                history.push(process.env.PUBLIC_URL + '/unit-list/' + item.id)
                            }
                        />
                    </>
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
                                history.push(process.env.PUBLIC_URL + '/edit-property/' + item.id, { isView: false, page: currentpageIndex, perPage: perPage })
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
                <td>
                    <div
                        // style={{ margin: "10px" }}
                        className="form-check form-switch pt-1"
                        dir="ltr"
                    >
                        <Input
                            type="checkbox"
                            className="form-check-input"
                            id="customSwitch1"
                            // disabled={item?.is_verified == '2' ? true : false}
                            style={{
                                height: "18px",
                                width: "30px",
                            }}
                            checked={
                                item.status == 6 ? true : false
                            }
                            onChange={(val) => {
                                
                                updatePropertyByField(item.id, val.target.checked)
                            }}
                        />
                    </div>
                </td>
            </>
        );
    };





    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Property Master" breadcrumbItems={breadcrumbItems} />
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
                                getAllUsers={getAllProperty}
                                renderTHContent={renderTHContent}
                                renderTdContent={renderTdContent}
                                btnName={"Add Property"}
                                addData={"/create-property"}
                                editData={"/edituser/"}
                                viewData={'/viewuser/'}
                                SearchData={['type', 'property_owner', 'property_owner_commission_percentage', 'property_country', 'property_state', 'property_city', 'property_owner_commission_amount']}
                                isDeleteUser={false}
                            />
                        </>
                    )}
                </Container>
            </div>

        </React.Fragment>
    );
};

export default PropertyMasterList;
