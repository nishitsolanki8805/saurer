

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
import { GET_CHAT_COUNT } from "../../../global";
import TableComponent from "../../../components/Common/TableComponent";

import { IoMdCloseCircle } from "react-icons/io";
import { ImEyeBlocked } from "react-icons/im";
import { TbEditOff } from "react-icons/tb";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";





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

const ViewChatCountPage = () => {
    const { state } = useLocation();
    const [breadcrumbItems] = useState([
        {
            title: "SAURER.",
            link: process.env.PUBLIC_URL + "/dashboard",
        },
       
        {
            title: "Chat List",
            link: "#",
        },
    ]);

    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentpageIndex, setCurrentpageIndex] = useState(0);
    const [chatList, setChatList] = useState();
    const [show, setShow] = useState(false);

    useEffect(() => {
    
            getAllChat();
 
    }, []);

    const history = useHistory();

    const getAllChat = async () => {
        setIsLoading(true);
        const StoredData = localStorage.getItem("authUser");
        const Token = JSON.parse(StoredData);
        await fetch(
            GET_CHAT_COUNT,
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + Token.access_token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                        "to_user_id": ""
                }),
            }
        )
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setIsLoading(false);
                if (res.data) {
                    setChatList(res.data)
                  
                   
                } else {
                }
            })
            .catch((err) => {
                // console.log(err);
            });
    };



    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Chat List" breadcrumbItems={breadcrumbItems} />
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
                          {
                                chatList?.map((data, ind) => {
                                    return (

                                        <Card key={ind}>
                                            <CardBody style={{padding:'10px'}}>
                                                <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Col md={3}>
                                                    <div>
                                                        <h5>{'Name'}</h5>
                                                        </div>
                                                        <div><p style={{ fontWeight: 700, marginBottom: '0px' }}>{`${data.first_name} ${data.last_name}`}</p></div>
                                                    </Col>
                                                    <Col md={3} >
                                                        <div>
                                                            <h5>{'Email'}</h5>
                                                        </div>
                                                        <div><p style={{ fontWeight: 700, marginBottom: '0px' }}>{data.email}</p></div>
                                                    </Col>
                                                    <Col md={3} >
                                                        <div>
                                                            <h5>{`Mobile`}</h5>
                                                        </div>
                                                        <div><p style={{ fontWeight: 700, marginBottom: '0px' }}>{data.mobile}</p></div>
                                                    </Col>
                                                    <Col md={2} >
                                                        <div>
                                                            <h5>{`Count`}</h5>
                                                        </div>
                                                        <div><p style={{ fontWeight: 700, marginBottom: '0px' }}>{data.chat_count}</p></div>
                                                    </Col>
                                                    <Col md={1} style={{ display: 'contents' }}>

                                                        <IoChatbubbleEllipsesOutline
                                                            style={{
                                                                color: "gray",
                                                                height: "40px",
                                                                width: "40px",
                                                                cursor: 'pointer'
                                                            }}
                                                            
                                                            onClick={() => history.push(process.env.PUBLIC_URL + '/admin-chat' , { chatId: data.id }) }
                                                        />
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    )
                                })
                            }
                        </>
                    )}
                </Container>
            </div>

        </React.Fragment>
    );
};

export default ViewChatCountPage;
