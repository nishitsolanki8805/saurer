

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
    Breadcrumb,
    BreadcrumbItem,
    Carousel,
    CarouselItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { AvField, AvForm } from "availity-reactstrap-validation";

import Breadcrumbs from "../../components/Common/Breadcrumb";
// import { ThreeDots } from "react-loader-spinner";
import Switch from "react-switch";
import { useHistory } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";



import { IoMdCloseCircle } from "react-icons/io";
import { ImEyeBlocked } from "react-icons/im";
import { TbEditOff } from "react-icons/tb";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GET_CHAT_COUNT, GET_PROPERTY_MASTER_BY_ID, UPDATE_PROPERTY_MASTER_BY_FIELD } from "../../global";
import { FormControl, MenuItem, Select } from "@mui/material";
import ImagesPro from "./ImagesPro";


const UnitList = () => {
    const { state } = useLocation();
    const { id } = useParams()
    const [breadcrumbItems] = useState([
        {
            title: "SAURER.",
            link: process.env.PUBLIC_URL + "/dashboard",
        },
        {
            title: "Property Master",
            link: process.env.PUBLIC_URL + "/property-list",
        },
        {
            title: "Unit List",
            link: "#",
        },
    ]);

    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentpageIndex, setCurrentpageIndex] = useState(0);
    const [unitList, setUnitList] = useState();
    const [unitListImg, setUnitListImg] = useState();

    const [show, setShow] = useState(false);

    useEffect(() => {
        getAllUnit(id);
    }, []);

    const history = useHistory();

    const getAllUnit = async (id) => {
        setIsLoading(true);
        const StoredData = localStorage.getItem("authUser");
        const Token = JSON.parse(StoredData);
        await fetch(
            GET_PROPERTY_MASTER_BY_ID + id,
            {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + Token.access_token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify({
                //         "to_user_id": ""
                // }),
            }
        )
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.data) {
                    setUnitList(res.data.property_master_details)
                    const data= res.data.property_master_details.map((data) =>{
                        return{
                            Images: [ 
                                {
                                src: data.property_photo_1,
                                altText: 'Slide 1',
                                caption: 'Slide 1',
                                key: 1,
                              },
                              {
                                src: data.property_photo_2,
                                altText: 'Slide 2',
                                caption: 'Slide 2',
                                key: 2,
                              },
                              {
                                src: data.property_photo_3,
                                altText: 'Slide 3',
                                caption: 'Slide 3',
                                key: 3,
                              },]
                        }
                    })
                    setUnitListImg(data)
                    setIsLoading(false);
                } else {
                }
            })
            .catch((err) => {
                // console.log(err);
            });
    };

    const itemsLength = breadcrumbItems.length;

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
                        "flag": "propertydetails",
                        "field_db": "property_status",
                        "search_val": val
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
                this.props.history.goBack();
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

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Row className="align-items-center">
                        <div className="d-flex justify-content-between">
                            {/* <Col xs={12} lg={8} className="justify-content-center"> */}
                            <div className="page-title-box d-flex align-items-center justify-content-center">
                                <h4 className="mb-0">{"Unit List"}</h4>
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
                                    onClick={() => history.goBack()}
                                    className="waves-effect waves-light me-1"
                                >
                                    <i className="ri-arrow-left-line align-middle me-2"></i>
                                    Back
                                </Button>
                            </div>
                        </div>
                    </Row>
                    {isLoading ? (
                        <>
                            <p>Loading ...</p>
                        </>
                    ) : (
                        <>

                            {
                                unitList?.map((data, ind) => {
                                    return (

                                        <Card key={ind}  style={{borderRadius :'15px'}}>
                                            <CardBody style={{ padding: '10px', }}>
                                                <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Col md={2}>
                                                        <div>
                                                            <h5>{'Name'}</h5>
                                                        </div>
                                                        <div><p style={{ fontWeight: 700, marginBottom: '0px' }}>{`${data.units_name}`}</p></div>
                                                    </Col>
                                                    <Col md={2} >
                                                        <div>
                                                            <h5>{'Beds'}</h5>
                                                        </div>
                                                        <div><p style={{ fontWeight: 700, marginBottom: '0px' }}>{data.units_beds}</p></div>
                                                    </Col>
                                                    <Col md={2} >
                                                        <div>
                                                            <h5>{`Baths`}</h5>
                                                        </div>
                                                        <div><p style={{ fontWeight: 700, marginBottom: '0px' }}>{data.units_baths}</p></div>
                                                    </Col>
                                                    <Col md={2} >
                                                        <div>
                                                            <h5>{`Rent`}</h5>
                                                        </div>
                                                        <div><p style={{ fontWeight: 700, marginBottom: '0px' }}>{data.market_rent}</p></div>
                                                    </Col>

                                                    <Col lg={1} >
                                                        <div>
                                                            <h5>{`Size`}</h5>
                                                        </div>
                                                        <div><p style={{ fontWeight: 700, marginBottom: '0px' }}>{data.units_size}</p></div>
                                                    </Col>
                                                    <Col md={2} >
                                                        {/* <div>
                                                            <h5 style={{ marginTop: '3px' }}>{`Status`}</h5>
                                                        </div> */}
                                                        <div>
                                                            <AvForm style={{ marginTop:'10px'}}>

                                                                <AvField
                                                                    value={data.property_status}
                                                                    disabled={data.property_status == '2' ? true : false}

                                                                    type="select"
                                                                    name="property_status"
                                                                    style={{marginBottom:'0px'}}
                                                                    id="validationCustom00"
                                                                    onChange={(e, key) => {
                                                                        key = { key };
                                                                        updatePropertyByField(data.id, e.target.value)
                                                                    }}
                                                                >
                                                                    <option value={""}>select</option>
                                                                    <option value="1">Active</option>
                                                                    <option value="2">Rental</option>
                                                                    <option value="9">Maintenance</option>
                                                                    <option value="0">Inactive</option>
                                                                </AvField>
                                                            </AvForm>
                                                        </div>

                                                        {/* <IoChatbubbleEllipsesOutline
                                                            style={{
                                                                color: "gray",
                                                                height: "40px",
                                                                width: "40px",
                                                                cursor: 'pointer'
                                                            }}
                                                            
                                                            onClick={() => history.push(process.env.PUBLIC_URL + '/admin-chat' , { chatId: data.id }) }
                                                        /> */}
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    )
                                })
                            }


                            {/* {
                                unitList?.map((data, ind) => {
                                    return (

                                        <Card key={ind} >
                                            <CardBody style={{ padding: '10px', }}>
                                                <ImagesPro />
                                                <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Col md={2}>
                                                        <div>
                                                            <h5>{'Name'}</h5>
                                                        </div>
                                                        <div><p style={{ fontWeight: 700, marginBottom: '0px' }}>{`${data.units_name}`}</p></div>
                                                    </Col>
                                                    <Col md={2} >
                                                        <div>
                                                            <h5>{'Beds'}</h5>
                                                        </div>
                                                        <div><p style={{ fontWeight: 700, marginBottom: '0px' }}>{data.units_beds}</p></div>
                                                    </Col>
                                                    <Col md={2} >
                                                        <div>
                                                            <h5>{`Baths`}</h5>
                                                        </div>
                                                        <div><p style={{ fontWeight: 700, marginBottom: '0px' }}>{data.units_baths}</p></div>
                                                    </Col>
                                                    <Col md={2} >
                                                        <div>
                                                            <h5>{`Rent`}</h5>
                                                        </div>
                                                        <div><p style={{ fontWeight: 700, marginBottom: '0px' }}>{data.market_rent}</p></div>
                                                    </Col>

                                                    <Col md={2} >
                                                        <div>
                                                            <h5>{`Size`}</h5>
                                                        </div>
                                                        <div><p style={{ fontWeight: 700, marginBottom: '0px' }}>{data.units_size}</p></div>
                                                    </Col>
                                                    <Col md={2} >
                                                       
                                                        <div>
                                                            <AvForm>

                                                                <AvField
                                                                    value={data.property_status}
                                                                    disabled={data.property_status == '2' ? true : false}

                                                                    type="select"
                                                                    name="property_status"

                                                                    id="validationCustom00"
                                                                    onChange={(e, key) => {
                                                                        key = { key };
                                                                        updatePropertyByField(data.id, e.target.value)
                                                                    }}
                                                                >
                                                                    <option value={""}>select</option>
                                                                    <option value="1">Active</option>
                                                                    <option value="2">Rental</option>
                                                                    <option value="9">Maintenance</option>
                                                                    <option value="0">Inactive</option>
                                                                </AvField>
                                                            </AvForm>
                                                        </div>

                                                       
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    )
                                })
                            } */}
                        </>
                    )}
                </Container>
            </div>

        </React.Fragment>
    );
};

export default UnitList;
