import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input,
  Button,
} from "reactstrap";

//Import images
import avatar2 from "../../assets/images/users/avatar-2.jpg";

//Simple bar
import SimpleBar from "simplebar-react";
import { CREATE_CHAT, GET_ALL_CHATS, GET_ROLE_BY_ID, UPDATE_CHAT } from "../../global";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


const ChatBox = () => {
  const { state } = useLocation();

  const [isSearch, setIsSearch] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentpageIndex, setCurrentpageIndex] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [getChat, setGetChat] = useState();
  const [getRoleById, setGetRoleByID] = useState();
  const [message, setMessage] = useState('');
  

  useEffect(() => {
    // getAllChats();
    // updateChat();
    GetRoleById();
  }, [])
  useEffect(() => {
    if (getRoleById) {
      updateChat()
    }
  }, [getRoleById?.id])

  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [getChat]);


  const chatContainerRef = useRef(null);

  useEffect(() => {
  
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, []);

  const getAllChats = async (page, perpage) => {
    // setIsLoading(true);
    const id = localStorage.getItem("authUserId");
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(
      page
        ? `${GET_ALL_CHATS}?page=${page}`
        : GET_ALL_CHATS,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + Token.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          per_page: perpage ? perpage : perPage,
          "to_user_id": getRoleById.id == 'NxOpZowo9GmjKqdR' ? state.chatId : id,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setIsLoading(false);
        if (res.data) {
          res.data.reverse()

          // Initialize prevChats as an array if it's not already
          // if(currentpageIndex > 1){

          //   setGetChat(prevChats => Array.isArray(prevChats) ? prevChats : []);
  
          //   // Append new data to the existing data
          //   setGetChat(prevChats => [...prevChats, ...res.data]);
          // }else{
          //   setGetChat(res.data);
          // }
           setGetChat(res.data);

          // setGetChat(res.data);
          setPageTotal(res.meta?.pagination.total_pages);
          setCurrentpageIndex(res.meta?.pagination.current_page);
          setIsLoading(false);
        } else {
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  const GetRoleById = async () => {

    setIsLoading(true)
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(GET_ROLE_BY_ID + Token.role_id, {
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
            setGetRoleByID(responseJson.data)
          }
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }


  const createChat = async (data) => {
    console.log("senddata",data);
    // return false
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    try {
      const response = await fetch(
        CREATE_CHAT,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + Token.access_token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),

        })
      // if (!response.ok) {
      //     throw new Error("Network response was not ok");
      // }

      // Handle successful response
      if (response.status === 200) {
        setMessage('')
        getAllChats(0, 20);
        // toast('Tenant Created Successfully', {
        //     type: "success",
        // });
        // this.props.history.goBack();
      } else {
        // toast('Error', {
        //     type: "warning",
        // });
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };
  const updateChat = async () => {
    const id = localStorage.getItem("authUserId");
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    try {
      const response = await fetch(
        UPDATE_CHAT,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + Token.access_token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "flag": getRoleById.id == 'NxOpZowo9GmjKqdR' ? "admin" : "",
            "to_user_id": getRoleById.id == 'NxOpZowo9GmjKqdR' ? state.chatId : id

          }),

        })
      // if (!response.ok) {
      //     throw new Error("Network response was not ok");
      // }

      // Handle successful response
      if (response.status === 200) {

        getAllChats();
        // toast('Tenant Created Successfully', {
        //     type: "success",
        // });
        // this.props.history.goBack();
      } else {
        // toast('Error', {
        //     type: "warning",
        // });
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };
  const [imageBase64, setImageBase64] = useState("");

  // const handleImageInputChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setImageBase64(reader.result);
  //     };
      
  //       const chats = {
  //         type: "1",
  //         message: '',
  //         sender_type: getRoleById.id,
  //         "image": imageBase64.split(",")?.[1],
  //         to_user_id: getRoleById.id == "NxOpZowo9GmjKqdR" ? state.chatId : id
  //       }
  //       createChat(chats)
      
  //   }
  // };

  // const handleImageInputChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       const imageBase64 = reader.result;
  //       const chats = {
  //         type: "1",
  //         // type: getFileType(file),
  //         message: '',
  //         sender_type: getRoleById.id,
  //         image: imageBase64,
  //         to_user_id: getRoleById.id == "NxOpZowo9GmjKqdR" ? state.chatId : id
  //       };
  //       createChat(chats);
  //     };
  //   }
  // };

  const handleImageInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const fileBase64 = reader.result;
            const fileType = file.type;
            if (fileType.startsWith('image/')) {
            console.log("fileType",fileType);
            console.log("fileBase64",fileBase64);
                const chats = {
                    type: "1",
                    message: '',
                    sender_type: getRoleById.id,
                    image: fileBase64,
                    to_user_id: getRoleById.id === "NxOpZowo9GmjKqdR" ? state.chatId : id
                };
                createChat(chats);
            } else if (fileType === 'application/pdf') {
            console.log("fileType",fileType);
            console.log("file",file);
            console.log("fileBase64",fileBase64);
                const chats = {
                    type: "1",
                    message: '',
                    sender_type: getRoleById.id,
                    image: fileBase64,
                    to_user_id: getRoleById.id === "NxOpZowo9GmjKqdR" ? state.chatId : id
                };
                console.log("chats",chats);
                createChat(chats);
            } else {
                console.log("Unsupported file type:", fileType);
            }
        };
        reader.readAsDataURL(file);
    }
};


  const handleButtonClick = () => {
    // Trigger input file click event
    document.getElementById("imageInput").click();
  };


  const id = localStorage.getItem("authUserId");
  let user_data = JSON.parse(localStorage.getItem("user_data"));
  // let username = "Admin";
  let username =
    `${user_data?.first_name} ${user_data?.last_name}` || "";


  const ulRef = useRef(null);
  useEffect(() => {
    
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (ulRef.current && ulRef.current.scrollTop === 0) {
        // Call your API here to load more data
        // console.log("Scrolled to top");
        // For example:
        // getAllChats(currentpageIndex + 1, perPage);
      }
    }

    if (ulRef.current) {
      ulRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ulRef.current) {
        ulRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ulRef.current, currentpageIndex, perPage]);


  const handleScroll = (event) => {
    const scrollTop = event.target.scrollTop;
    // Call your function when scrollTop is 0
    if (scrollTop === 0) {
      // console.log('Scrolled to top');
      console.log("currentpageIndex",currentpageIndex)
      if(currentpageIndex > 20){
        getAllChats(currentpageIndex + 1, 20);
      }
      // Call your function here
    }
  };



  const handleDownload = async (documentUrl, Name) => {

    try {
        // Construct the full URL by appending the relative path to the base URL
        const fullUrl = new URL(documentUrl, "https://" + window.location.host + process.env.PUBLIC_URL + "/");
        const response = await fetch(fullUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = Name; // Set the desired file name
        anchor.target = ""; // Set target to an empty string to force download
        document.body.appendChild(anchor)
;
        anchor.click();
        // Remove the anchor from the document body
        document.body.removeChild(anchor)
;
        // Revoke the Object URL to free up resources
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error downloading the file:", error);
    }
};

  return (
    <React.Fragment>
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
        <Col lg={12}>
          <Card>
            <CardBody className="border-bottom">
              <div className="user-chat-border">
                <Row>
                  <Col md={5} xs={9}>
                    <h5 className="font-size-15 mb-1">{username}</h5>
                    <p className="text-muted mb-0">
                      <i className="mdi mdi-circle text-success align-middle me-1"></i>{" "}
                      Active now
                    </p>
                  </Col>
                  <Col md={7} xs={3}>
                    <ul className="list-inline user-chat-nav text-end mb-0">
                      <li className="list-inline-item">
                        <Dropdown
                          isOpen={isSearch}
                          toggle={() => setIsSearch(!isSearch)}
                        >
                          <DropdownToggle
                            tag="i"
                            className="btn nav-btn"
                            type="button"
                          >
                            <i className="mdi mdi-magnify"></i>
                          </DropdownToggle>
                          <DropdownMenu end className=" dropdown-menu-md p-0">
                            <Form className="p-2">
                              <div className="search-box">
                                <div className="position-relative">
                                  <Input
                                    type="text"
                                    className="form-control rounded bg-light border-0"
                                    placeholder="Search..."
                                  />
                                  <i className="mdi mdi-magnify search-icon"></i>
                                </div>
                              </div>
                            </Form>
                          </DropdownMenu>
                        </Dropdown>
                      </li>
                      <li className="list-inline-item d-none d-sm-inline-block">
                        <Dropdown
                          isOpen={isSetting}
                          toggle={() => setIsSetting(!isSetting)}
                        >
                          <DropdownToggle
                            tag="button"
                            className="btn nav-btn"
                            type="button"
                          >
                            <i className="mdi mdi-cog"></i>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem href="#">View Profile</DropdownItem>
                            <DropdownItem href="#">Clear chat</DropdownItem>
                            <DropdownItem href="#">Muted</DropdownItem>
                            <DropdownItem href="#">Delete</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </li>

                      <li className="list-inline-item">
                        <Dropdown
                          isOpen={isMore}
                          toggle={() => setIsMore(!isMore)}
                        >
                          <DropdownToggle
                            tag="button"
                            className="btn nav-btn"
                            type="button"
                          >
                            <i className="mdi mdi-dots-horizontal"></i>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <DropdownItem href="#">Action</DropdownItem>
                            <DropdownItem href="#">Another action</DropdownItem>
                            <DropdownItem href="#">Something else</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </div>
            </CardBody>
            <CardBody>
              {/* <div className="chat-widget">
                <div className="chat-conversation">
                  <SimpleBar  style={{ maxHeight: "500px" }}>
                    <ul className="list-unstyled mb-0 pr-3" ref={ulRef}>
                      {
                        getChat?.map((data, ind) => {
                          const id = localStorage.getItem("authUserId");
                          const loginUser = data?.sent_user_id === id;
                          const timestamp = data?.chatting_date_time;
                          const dateObj = new Date(timestamp);

                          const hour = dateObj.getHours();
                          const minute = dateObj.getMinutes();
                          
                          {

                            return (
                              <li className={loginUser ? "right" : ''} key={ind}>
                                <div className="conversation-list">

                                  <div className="ctext-wrap">
                                    <div className="conversation-name">
                                      {data.sent_user_name}
                                    </div>
                                    <div className="ctext-wrap-content">
                                      {
                                        data?.image ?
                                          <>
                                            <img src={data?.image} width={'200px'} height={'150px'} alt="Base64 Image" />
                                          </>
                                          :
                                          <>
                                            <p className="mb-0">{data.message}</p>
                                          </>
                                      }
                                    </div>
                                    <p className="chat-time mb-0">
                                      <>
                                        <i className="mdi mdi-clock-outline align-middle me-1"></i>{" "}
                                        {hour}:{minute}
                                      </>
                                      <i className="mdi mdi-check-all align-middle me-1" style={{ fontSize: '18px', color: data.status == '1' ? '#90EE90' : 'gray' }}></i>{" "}
                                      <>
                                      </>
                                    </p>
                                  </div>
                                </div>
                              </li>
                            )
                          }
                        })
                      }
                      <li ref={chatBottomRef}></li>
                    </ul>
                  </SimpleBar>
                </div>
              </div> */}
              <div style={{ height: '500px', overflowY: 'scroll' }} onScroll={handleScroll}>
                {/* Your content here */}

                <div className="chat-widget">
                  <div className="chat-conversation">
                    <SimpleBar>
                      <ul className="list-unstyled mb-0 pr-3" ref={ulRef}>
                        {
                          getChat?.map((data, ind) => {
                            const id = localStorage.getItem("authUserId");
                            const loginUser = data?.sent_user_id === id;
                            const timestamp = data?.chatting_date_time;
                            const dateObj = new Date(timestamp);

                            const hour = dateObj.getHours();
                            const minute = dateObj.getMinutes();

                            {
                              console.log("data",data);
                              return (
                              
                                <li className={loginUser ? "right" : ''} key={ind}>
                                  <div className="conversation-list">

                                    <div className="ctext-wrap">
                                      <div className="conversation-name">
                                        {data.sent_user_name}
                                      </div>
                                      <div className="ctext-wrap-content">
                                        {
                                          data?.image ? ( 
                                            <>
                                            {data.image.toLowerCase().endsWith('.pdf') ? (
                                              <i className="mdi mdi-file-pdf-outline" style={{ cursor: "pointer" }} onClick={() => handleDownload(data?.image, 'pdfFile')}> PDF</i>
                                            ) : (
                                              <img src={data?.image} width={'200px'} height={'150px'} alt="Base64 Image" style={{ cursor: "pointer" }} onClick={() => handleDownload(data?.image, 'image')} />
                                            )}
                                          </>                                      
                                          ) : (                                            
                                              <p className="mb-0">{data.message}</p>
                                          )
                                        }
                                      </div>
                                      <p className="chat-time mb-0">
                                        <>
                                          <i className="mdi mdi-clock-outline align-middle me-1"></i>{" "}
                                          {hour}:{minute}
                                        </>
                                        <i className="mdi mdi-check-all align-middle me-1" style={{ fontSize: '18px', color: data.status == '1' ? '#90EE90' : 'gray' }}></i>{" "}
                                        <>
                                        </>
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              )
                            }
                          })
                        }
                        <li ref={chatBottomRef}></li>
                      </ul>
                    </SimpleBar>
                  </div>
                </div>
              </div>
            </CardBody>
            <div className="p-3 chat-input-section border-top">
              <Row>
                <Col>
                  <div>
                    <Input
                      type="text"
                      className="form-control rounded chat-input pl-3"
                      placeholder="Enter Message..."
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                    />
                  </div>
                </Col>
                <Col xs={{ size: "auto" }}>

                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleImageInputChange}
                    style={{ display: "none" }}
                  />
                  <Button
                    color="primary"
                    className="chat-send w-md waves-effect waves-light"
                    onClick={() => handleButtonClick()}>

                    <span className="d-none d-sm-inline-block me-2" >Image / PDF </span>{" "}
                    <i className="mdi mdi-message-image"></i>
                  </Button>
                </Col>
              
                <Col xs={{ size: "auto" }}>
                  <Button
                    color="primary"
                    type="submit"
                    className="chat-send w-md waves-effect waves-light"
                    disabled= {message ? false : true}
                    onClick={() => {
                      // type: "0",   // 0 = message , 1 = image
                      const chats = {
                        type: "0",
                        message: message,
                        sender_type: getRoleById.id,
                        "image": "",
                        "pdf" : "",
                        to_user_id: getRoleById.id == "NxOpZowo9GmjKqdR" ? state.chatId : id
                      }

                      createChat(chats)

                    }
                    }
                  >
                    <span className="d-none d-sm-inline-block me-2" >Send</span>{" "}
                    <i className="mdi mdi-send"></i>
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>)
      }
    </React.Fragment>
  );
};

export default ChatBox;






// import React, { Component } from "react";
// import {
//   Row,
//   Card,
//   CardBody,
//   Col,
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Form,
//   Input,
//   Button,
// } from "reactstrap";

// //Import images
// import avatar2 from "../../assets/images/users/avatar-2.jpg";

// //Simple bar
// import SimpleBar from "simplebar-react";

// class ChatBox extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isSearch: false,
//       isSetting: false,
//       isMore: false,
//     };
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <Col lg={12}>
//           <Card>
//             <CardBody className="border-bottom">
//               <div className="user-chat-border">
//                 <Row>
//                   <Col md={5} xs={9}>
//                     <h5 className="font-size-15 mb-1">Frank Vickery</h5>
//                     <p className="text-muted mb-0">
//                       <i className="mdi mdi-circle text-success align-middle me-1"></i>{" "}
//                       Active now
//                     </p>
//                   </Col>
//                   <Col md={7} xs={3}>
//                     <ul className="list-inline user-chat-nav text-end mb-0">
//                       <li className="list-inline-item">
//                         <Dropdown
//                           isOpen={this.state.isSearch}
//                           toggle={() =>
//                             this.setState({ isSearch: !this.state.isSearch })
//                           }
//                         >
//                           <DropdownToggle
//                             tag="i"
//                             className="btn nav-btn"
//                             type="button"
//                           >
//                             <i className="mdi mdi-magnify"></i>
//                           </DropdownToggle>
//                           <DropdownMenu end className=" dropdown-menu-md p-0">
//                             <Form className="p-2">
//                               <div className="search-box">
//                                 <div className="position-relative">
//                                   <Input
//                                     type="text"
//                                     className="form-control rounded bg-light border-0"
//                                     placeholder="Search..."
//                                   />
//                                   <i className="mdi mdi-magnify search-icon"></i>
//                                 </div>
//                               </div>
//                             </Form>
//                           </DropdownMenu>
//                         </Dropdown>
//                       </li>
//                       <li className="list-inline-item d-none d-sm-inline-block">
//                         <Dropdown
//                           isOpen={this.state.isSetting}
//                           toggle={() =>
//                             this.setState({ isSetting: !this.state.isSetting })
//                           }
//                         >
//                           <DropdownToggle
//                             tag="button"
//                             className="btn nav-btn"
//                             type="button"
//                           >
//                             <i className="mdi mdi-cog"></i>
//                           </DropdownToggle>
//                           <DropdownMenu className="dropdown-menu-end">
//                             <DropdownItem href="#">View Profile</DropdownItem>
//                             <DropdownItem href="#">Clear chat</DropdownItem>
//                             <DropdownItem href="#">Muted</DropdownItem>
//                             <DropdownItem href="#">Delete</DropdownItem>
//                           </DropdownMenu>
//                         </Dropdown>
//                       </li>

//                       <li className="list-inline-item">
//                         <Dropdown
//                           isOpen={this.state.isMore}
//                           toggle={() =>
//                             this.setState({ isMore: !this.state.isMore })
//                           }
//                         >
//                           <DropdownToggle
//                             tag="button"
//                             className="btn nav-btn"
//                             type="button"
//                           >
//                             <i className="mdi mdi-dots-horizontal"></i>
//                           </DropdownToggle>
//                           <DropdownMenu className="dropdown-menu-end">
//                             <DropdownItem href="#">Action</DropdownItem>
//                             <DropdownItem href="#">Another action</DropdownItem>
//                             <DropdownItem href="#">Something else</DropdownItem>
//                           </DropdownMenu>
//                         </Dropdown>
//                       </li>
//                     </ul>
//                   </Col>
//                 </Row>
//               </div>
//             </CardBody>
//             <CardBody>
//               <div className="chat-widget">
//                 <div className="chat-conversation">
//                   <SimpleBar style={{ maxHeight: "237px" }}>
//                     <ul className="list-unstyled mb-0 pr-3">
//                       <li>
//                         <div className="conversation-list">
//                           <div className="chat-avatar">
//                             <img src={avatar2} alt="" />
//                           </div>
//                           <div className="ctext-wrap">
//                             <div className="conversation-name">
//                               Frank Vickery
//                             </div>
//                             <div className="ctext-wrap-content">
//                               <p className="mb-0">Hey! I am available</p>
//                             </div>
//                             <p className="chat-time mb-0">
//                               <i className="mdi mdi-clock-outline align-middle me-1"></i>{" "}
//                               12:09
//                             </p>
//                           </div>
//                         </div>
//                       </li>

//                       <li className="right">
//                         <div className="conversation-list">
//                           <div className="ctext-wrap">
//                             <div className="conversation-name">Ricky Clark</div>
//                             <div className="ctext-wrap-content">
//                               <p className="mb-0">
//                                 Hi, How are you? What about our next meeting?
//                               </p>
//                             </div>

//                             <p className="chat-time mb-0">
//                               <i className="bx bx-time-five align-middle me-1"></i>{" "}
//                               10:02
//                             </p>
//                           </div>
//                         </div>
//                       </li>

//                       <li>
//                         <div className="chat-day-title">
//                           <span className="title">Today</span>
//                         </div>
//                       </li>
//                       <li>
//                         <div className="conversation-list">
//                           <div className="chat-avatar">
//                             <img src={avatar2} alt="" />
//                           </div>
//                           <div className="ctext-wrap">
//                             <div className="conversation-name">
//                               Frank Vickery
//                             </div>
//                             <div className="ctext-wrap-content">
//                               <p className="mb-0">Hello!</p>
//                             </div>
//                             <p className="chat-time mb-0">
//                               <i className="mdi mdi-clock-outline align-middle me-1"></i>{" "}
//                               10:00
//                             </p>
//                           </div>
//                         </div>
//                       </li>

//                       <li className="right">
//                         <div className="conversation-list">
//                           <div className="ctext-wrap">
//                             <div className="conversation-name">Ricky Clark</div>
//                             <div className="ctext-wrap-content">
//                               <p className="mb-0">
//                                 Hi, How are you? What about our next meeting?
//                               </p>
//                             </div>

//                             <p className="chat-time mb-0">
//                               <i className="bx bx-time-five align-middle me-1"></i>{" "}
//                               10:02
//                             </p>
//                           </div>
//                         </div>
//                       </li>

//                       <li>
//                         <div className="conversation-list">
//                           <div className="chat-avatar">
//                             <img src={avatar2} alt="" />
//                           </div>
//                           <div className="ctext-wrap">
//                             <div className="conversation-name">
//                               Frank Vickery
//                             </div>
//                             <div className="ctext-wrap-content">
//                               <p className="mb-0">Yeah everything is fine</p>
//                             </div>

//                             <p className="chat-time mb-0">
//                               <i className="bx bx-time-five align-middle me-1"></i>{" "}
//                               10:06
//                             </p>
//                           </div>
//                         </div>
//                       </li>

//                       <li>
//                         <div className="conversation-list">
//                           <div className="chat-avatar">
//                             <img src={avatar2} alt="" />
//                           </div>
//                           <div className="ctext-wrap">
//                             <div className="conversation-name">
//                               Frank Vickery
//                             </div>
//                             <div className="ctext-wrap-content">
//                               <p className="mb-0">
//                                 & Next meeting tomorrow 10.00AM
//                               </p>
//                             </div>
//                             <p className="chat-time mb-0">
//                               <i className="bx bx-time-five align-middle me-1"></i>{" "}
//                               10:06
//                             </p>
//                           </div>
//                         </div>
//                       </li>

//                       <li className="right">
//                         <div className="conversation-list">
//                           <div className="ctext-wrap">
//                             <div className="conversation-name">Ricky Clark</div>
//                             <div className="ctext-wrap-content">
//                               <p className="mb-0">Wow that's great</p>
//                             </div>

//                             <p className="chat-time mb-0">
//                               <i className="bx bx-time-five align-middle me-1"></i>{" "}
//                               10:07
//                             </p>
//                           </div>
//                         </div>
//                       </li>
//                     </ul>
//                   </SimpleBar>
//                 </div>
//               </div>
//             </CardBody>
//             <div className="p-3 chat-input-section border-top">
//               <Row>
//                 <Col>
//                   <div>
//                     <Input
//                       type="text"
//                       className="form-control rounded chat-input pl-3"
//                       placeholder="Enter Message..."
//                     />
//                   </div>
//                 </Col>
//                 <Col xs={{ size: "auto" }}>
//                   <Button
//                     color="primary"
//                     type="submit"
//                     className="chat-send w-md waves-effect waves-light"
//                   >
//                     <span className="d-none d-sm-inline-block me-2">Send</span>{" "}
//                     <i className="mdi mdi-send"></i>
//                   </Button>
//                 </Col>
//               </Row>
//             </div>
//           </Card>
//         </Col>
//       </React.Fragment>
//     );
//   }
// }

// export default ChatBox;





// import React, { useEffect, useRef, useState } from "react";
// import {
//   Row,
//   Card,
//   CardBody,
//   Col,
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Form,
//   Input,
//   Button,
// } from "reactstrap";

// //Import images
// import avatar2 from "../../assets/images/users/avatar-2.jpg";

// //Simple bar
// import SimpleBar from "simplebar-react";
// import { CREATE_CHAT, GET_ALL_CHATS, GET_ROLE_BY_ID, UPDATE_CHAT } from "../../global";
// import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


// const ChatBox = () => {
//   const { state } = useLocation();

//   const [isSearch, setIsSearch] = useState(false);
//   const [isSetting, setIsSetting] = useState(false);
//   const [isMore, setIsMore] = useState(false);
//   const [user, setUser] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentpageIndex, setCurrentpageIndex] = useState(0);
//   const [pageTotal, setPageTotal] = useState(0);
//   const [perPage, setPerPage] = useState(10);
//   const [getChat, setGetChat] = useState();
//   const [getRoleById, setGetRoleByID] = useState();
//   const [message, setMessage] = useState('');
//   const [totalPages, setTotalPages] = useState();


//   useEffect(() => {
//     // getAllChats();
//     // updateChat();
//     GetRoleById();
//   }, [])
//   useEffect(() => {
//     if (getRoleById) {
//       updateChat()
//     }
//   }, [getRoleById?.id])

//   const chatBottomRef = useRef(null);

//   useEffect(() => {
//     if (chatBottomRef.current) {
//       chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [getChat]);


//   const chatContainerRef = useRef(null);

//   useEffect(() => {

//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = 0;
//     }
//   }, []);

//   const getAllChats = async (page, perpage) => {
//     // setIsLoading(true);
//     const id = localStorage.getItem("authUserId");
//     const StoredData = localStorage.getItem("authUser");
//     const Token = JSON.parse(StoredData);
//     await fetch(
//       page
//         ? `${GET_ALL_CHATS}?page=${page}`
//         : GET_ALL_CHATS,
//       {
//         method: "POST",
//         headers: {
//           Authorization: "Bearer " + Token.access_token,
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           per_page: perpage ? perpage : perPage,
//           "to_user_id": getRoleById.id == 'NxOpZowo9GmjKqdR' ? state.chatId : id,
//         }),
//       }
//     )
//       .then((res) => {
//         return res.json();
//       })
//       .then((res) => {
//         setIsLoading(false);
//         setTotalPages(res?.meta)
//         if (res.data) {
//           res.data.reverse()

//           // Initialize prevChats as an array if it's not already
//           // if(currentpageIndex > 1){

//           //   setGetChat(prevChats => Array.isArray(prevChats) ? prevChats : []);

//           //   // Append new data to the existing data
//           //   setGetChat(prevChats => [...prevChats, ...res.data]);
//           // }else{
//           //   setGetChat(res.data);
//           // }
//           setGetChat(res.data);

//           // setGetChat(res.data);
//           setPageTotal(res.meta?.pagination.total_pages);
//           setCurrentpageIndex(res.meta?.pagination.current_page);
//           setIsLoading(false);
//         } else {
//         }
//       })
//       .catch((err) => {
//         // console.log(err);
//       });
//   };
//   const GetRoleById = async () => {

//     setIsLoading(true)
//     const StoredData = localStorage.getItem("authUser");
//     const Token = JSON.parse(StoredData);
//     await fetch(GET_ROLE_BY_ID + Token.role_id, {
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + Token.access_token,
//         Accept: "application/json",
//       },
//     })
//       // .then((response) => {
//       //   return response.json();
//       // })
//       .then((response) => {
//         response.json().then((responseJson) => {
//           if (responseJson.data) {
//             setGetRoleByID(responseJson.data)
//           }
//         });
//       })
//       .catch((err) => {
//         // console.log(err);
//       });
//   }


//   const createChat = async (data) => {
//     // return false
//     const StoredData = localStorage.getItem("authUser");
//     const Token = JSON.parse(StoredData);
//     try {
//       const response = await fetch(
//         CREATE_CHAT,
//         {
//           method: "POST",
//           headers: {
//             Authorization: "Bearer " + Token.access_token,
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),

//         })
//       // if (!response.ok) {
//       //     throw new Error("Network response was not ok");
//       // }

//       // Handle successful response
//       if (response.status === 200) {
//         setMessage('')
//         getAllChats(0, 20);
//         // toast('Tenant Created Successfully', {
//         //     type: "success",
//         // });
//         // this.props.history.goBack();
//       } else {
//         // toast('Error', {
//         //     type: "warning",
//         // });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle error
//     }
//   };
//   const updateChat = async () => {
//     const id = localStorage.getItem("authUserId");
//     const StoredData = localStorage.getItem("authUser");
//     const Token = JSON.parse(StoredData);
//     try {
//       const response = await fetch(
//         UPDATE_CHAT,
//         {
//           method: "POST",
//           headers: {
//             Authorization: "Bearer " + Token.access_token,
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             "flag": getRoleById.id == 'NxOpZowo9GmjKqdR' ? "admin" : "",
//             "to_user_id": getRoleById.id == 'NxOpZowo9GmjKqdR' ? state.chatId : id

//           }),

//         })
//       // if (!response.ok) {
//       //     throw new Error("Network response was not ok");
//       // }

//       // Handle successful response
//       if (response.status === 200) {

//         getAllChats();
//         // toast('Tenant Created Successfully', {
//         //     type: "success",
//         // });
//         // this.props.history.goBack();
//       } else {
//         // toast('Error', {
//         //     type: "warning",
//         // });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       // Handle error
//     }
//   };
//   const [imageBase64, setImageBase64] = useState("");

//   // const handleImageInputChange = (event) => {
//   //   const file = event.target.files[0];
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.readAsDataURL(file);
//   //     reader.onloadend = () => {
//   //       setImageBase64(reader.result);
//   //     };

//   //       const chats = {
//   //         type: "1",
//   //         message: '',
//   //         sender_type: getRoleById.id,
//   //         "image": imageBase64.split(",")?.[1],
//   //         to_user_id: getRoleById.id == "NxOpZowo9GmjKqdR" ? state.chatId : id
//   //       }
//   //       createChat(chats)

//   //   }
//   // };

//   const handleImageInputChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onloadend = () => {
//         const imageBase64 = reader.result;
//         const chats = {
//           type: "1",
//           message: '',
//           sender_type: getRoleById.id,
//           image: imageBase64,
//           to_user_id: getRoleById.id == "NxOpZowo9GmjKqdR" ? state.chatId : id
//         };
        
//         createChat(chats);
//       };
//     }
//   };

//   const handleButtonClick = () => {
//     // Trigger input file click event
//     document.getElementById("imageInput").click();
//   };

//   const id = localStorage.getItem("authUserId");
//   let user_data = JSON.parse(localStorage.getItem("user_data"));
//   // let username = "Admin";
//   let username =
//     `${user_data?.first_name} ${user_data?.last_name}` || "";


//   const ulRef = useRef(null);
//   useEffect(() => {

//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = 0;
//     }
//   }, []);

//   useEffect(() => {
//     function handleScroll() {
//       if (ulRef.current && ulRef.current.scrollTop === 0) {
//         // Call your API here to load more data
//         // console.log("Scrolled to top");
//         // For example:
//         // getAllChats(currentpageIndex + 1, perPage);
//       }
//     }

//     if (ulRef.current) {
//       ulRef.current.addEventListener('scroll', handleScroll);
//     }

//     return () => {
//       if (ulRef.current) {
//         ulRef.current.removeEventListener('scroll', handleScroll);
//       }
//     };
//   }, [ulRef.current, currentpageIndex, perPage]);


//   const handleScroll = (event) => {
//     const scrollTop = event.target.scrollTop;
//     // Call your function when scrollTop is 0
//     if (scrollTop === 0) {
//       // console.log('Scrolled to top');
//       if(currentpageIndex < totalPages?.pagination?.total_pages){
//         getAllChats(currentpageIndex + 1, 20);
//       }
//       // Call your function here
//     }
//   };
//   console.log('totalPages---', totalPages?.pagination?.total_pages)
//   return (
//     <React.Fragment>
//       {isLoading ? (
//         <>
//           {/* <ThreeDots
//                 height="80"
//                 width="80"
//                 radius="9"
//                 color="#4D5DC6"
//                 ariaLabel="three-dots-loading"
//                 wrapperStyle={{
//                   justifyContent: "center",
//                 }}
//                 wrapperClassName=""
//                 visible={true}
//               /> */}
//           <p>Loading ...</p>
//         </>
//       ) : (
//         <Col lg={12}>
//           <Card>
//             <CardBody className="border-bottom">
//               <div className="user-chat-border">
//                 <Row>
//                   <Col md={5} xs={9}>
//                     <h5 className="font-size-15 mb-1">{username}</h5>
//                     <p className="text-muted mb-0">
//                       <i className="mdi mdi-circle text-success align-middle me-1"></i>{" "}
//                       Active now
//                     </p>
//                   </Col>
//                   <Col md={7} xs={3}>
//                     <ul className="list-inline user-chat-nav text-end mb-0">
//                       <li className="list-inline-item">
//                         <Dropdown
//                           isOpen={isSearch}
//                           toggle={() => setIsSearch(!isSearch)}
//                         >
//                           <DropdownToggle
//                             tag="i"
//                             className="btn nav-btn"
//                             type="button"
//                           >
//                             <i className="mdi mdi-magnify"></i>
//                           </DropdownToggle>
//                           <DropdownMenu end className=" dropdown-menu-md p-0">
//                             <Form className="p-2">
//                               <div className="search-box">
//                                 <div className="position-relative">
//                                   <Input
//                                     type="text"
//                                     className="form-control rounded bg-light border-0"
//                                     placeholder="Search..."
//                                   />
//                                   <i className="mdi mdi-magnify search-icon"></i>
//                                 </div>
//                               </div>
//                             </Form>
//                           </DropdownMenu>
//                         </Dropdown>
//                       </li>
//                       <li className="list-inline-item d-none d-sm-inline-block">
//                         <Dropdown
//                           isOpen={isSetting}
//                           toggle={() => setIsSetting(!isSetting)}
//                         >
//                           <DropdownToggle
//                             tag="button"
//                             className="btn nav-btn"
//                             type="button"
//                           >
//                             <i className="mdi mdi-cog"></i>
//                           </DropdownToggle>
//                           <DropdownMenu className="dropdown-menu-end">
//                             <DropdownItem href="#">View Profile</DropdownItem>
//                             <DropdownItem href="#">Clear chat</DropdownItem>
//                             <DropdownItem href="#">Muted</DropdownItem>
//                             <DropdownItem href="#">Delete</DropdownItem>
//                           </DropdownMenu>
//                         </Dropdown>
//                       </li>

//                       <li className="list-inline-item">
//                         <Dropdown
//                           isOpen={isMore}
//                           toggle={() => setIsMore(!isMore)}
//                         >
//                           <DropdownToggle
//                             tag="button"
//                             className="btn nav-btn"
//                             type="button"
//                           >
//                             <i className="mdi mdi-dots-horizontal"></i>
//                           </DropdownToggle>
//                           <DropdownMenu className="dropdown-menu-end">
//                             <DropdownItem href="#">Action</DropdownItem>
//                             <DropdownItem href="#">Another action</DropdownItem>
//                             <DropdownItem href="#">Something else</DropdownItem>
//                           </DropdownMenu>
//                         </Dropdown>
//                       </li>
//                     </ul>
//                   </Col>
//                 </Row>
//               </div>
//             </CardBody>
//             <CardBody>
//               {/* <div className="chat-widget">
//                 <div className="chat-conversation">
//                   <SimpleBar  style={{ maxHeight: "500px" }}>
//                     <ul className="list-unstyled mb-0 pr-3" ref={ulRef}>
//                       {
//                         getChat?.map((data, ind) => {
//                           const id = localStorage.getItem("authUserId");
//                           const loginUser = data?.sent_user_id === id;
//                           const timestamp = data?.chatting_date_time;
//                           const dateObj = new Date(timestamp);

//                           const hour = dateObj.getHours();
//                           const minute = dateObj.getMinutes();
                          
//                           {

//                             return (
//                               <li className={loginUser ? "right" : ''} key={ind}>
//                                 <div className="conversation-list">

//                                   <div className="ctext-wrap">
//                                     <div className="conversation-name">
//                                       {data.sent_user_name}
//                                     </div>
//                                     <div className="ctext-wrap-content">
//                                       {
//                                         data?.image ?
//                                           <>
//                                             <img src={data?.image} width={'200px'} height={'150px'} alt="Base64 Image" />
//                                           </>
//                                           :
//                                           <>
//                                             <p className="mb-0">{data.message}</p>
//                                           </>
//                                       }
//                                     </div>
//                                     <p className="chat-time mb-0">
//                                       <>
//                                         <i className="mdi mdi-clock-outline align-middle me-1"></i>{" "}
//                                         {hour}:{minute}
//                                       </>
//                                       <i className="mdi mdi-check-all align-middle me-1" style={{ fontSize: '18px', color: data.status == '1' ? '#90EE90' : 'gray' }}></i>{" "}
//                                       <>
//                                       </>
//                                     </p>
//                                   </div>
//                                 </div>
//                               </li>
//                             )
//                           }
//                         })
//                       }
//                       <li ref={chatBottomRef}></li>
//                     </ul>
//                   </SimpleBar>
//                 </div>
//               </div> */}
//               <div style={{ height: '500px', overflowY: 'scroll' }} onScroll={handleScroll}>
//                 {/* Your content here */}

//                 <div className="chat-widget">
//                   <div className="chat-conversation">
//                     <SimpleBar>
//                       <ul className="list-unstyled mb-0 pr-3" ref={ulRef}>
//                         {
//                           getChat?.map((data, ind) => {
//                             const id = localStorage.getItem("authUserId");
//                             const loginUser = data?.sent_user_id === id;
//                             const timestamp = data?.chatting_date_time;
//                             const dateObj = new Date(timestamp);

//                             const hour = dateObj.getHours();
//                             const minute = dateObj.getMinutes();

//                             {

//                               return (
//                                 <li className={loginUser ? "right" : ''} key={ind}>
//                                   <div className="conversation-list">

//                                     <div className="ctext-wrap">
//                                       <div className="conversation-name">
//                                         {data.sent_user_name}
//                                       </div>
//                                       <div className="ctext-wrap-content">
//                                         {
//                                           data?.image ?
//                                             <>
//                                               <img src={data?.image} width={'200px'} height={'150px'} alt="Base64 Image" />
//                                             </>
//                                             :
//                                             <>
//                                               <p className="mb-0">{data.message}</p>
//                                             </>
//                                         }
//                                       </div>
//                                       <p className="chat-time mb-0">
//                                         <>
//                                           <i className="mdi mdi-clock-outline align-middle me-1"></i>{" "}
//                                           {hour}:{minute}
//                                         </>
//                                         <i className="mdi mdi-check-all align-middle me-1" style={{ fontSize: '18px', color: data.status == '1' ? '#90EE90' : 'gray' }}></i>{" "}
//                                         <>
//                                         </>
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </li>
//                               )
//                             }
//                           })
//                         }
//                         <li ref={chatBottomRef}></li>
//                       </ul>
//                     </SimpleBar>
//                   </div>
//                 </div>
//               </div>
//             </CardBody>
//             <div className="p-3 chat-input-section border-top">
//               <Row>
//                 <Col>
//                   <div>
//                     <Input
//                       type="text"
//                       className="form-control rounded chat-input pl-3"
//                       placeholder="Enter Message..."
//                       onChange={(e) => setMessage(e.target.value)}
//                       value={message}
//                     />
//                   </div>
//                 </Col>
//                 <Col xs={{ size: "auto" }}>

//                   <input
//                     id="imageInput"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageInputChange}
//                     style={{ display: "none" }}
//                   />
//                   <Button
//                     color="primary"
//                     className="chat-send w-md waves-effect waves-light"
//                     onClick={() => handleButtonClick()}>

//                     <span className="d-none d-sm-inline-block me-2" >Image</span>{" "}
//                     <i className="mdi mdi-message-image"></i>
//                   </Button>
//                 </Col>
//                 <Col xs={{ size: "auto" }}>
//                   <Button
//                     color="primary"
//                     type="submit"
//                     className="chat-send w-md waves-effect waves-light"
//                     disabled={message ? false : true}
//                     onClick={() => {
//                       // type: "0",   // 0 = message , 1 = image
//                       const chats = {
//                         type: "0",
//                         message: message,
//                         sender_type: getRoleById.id,
//                         "image": "",
//                         to_user_id: getRoleById.id == "NxOpZowo9GmjKqdR" ? state.chatId : id
//                       }

//                       createChat(chats)

//                     }
//                     }
//                   >
//                     <span className="d-none d-sm-inline-block me-2" >Send</span>{" "}
//                     <i className="mdi mdi-send"></i>
//                   </Button>
//                 </Col>
//               </Row>
//             </div>
//           </Card>
//         </Col>)
//       }
//     </React.Fragment>
//   );
// };

// export default ChatBox;






// import React, { Component } from "react";
// import {
//   Row,
//   Card,
//   CardBody,
//   Col,
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Form,
//   Input,
//   Button,
// } from "reactstrap";

// //Import images
// import avatar2 from "../../assets/images/users/avatar-2.jpg";

// //Simple bar
// import SimpleBar from "simplebar-react";

// class ChatBox extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isSearch: false,
//       isSetting: false,
//       isMore: false,
//     };
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <Col lg={12}>
//           <Card>
//             <CardBody className="border-bottom">
//               <div className="user-chat-border">
//                 <Row>
//                   <Col md={5} xs={9}>
//                     <h5 className="font-size-15 mb-1">Frank Vickery</h5>
//                     <p className="text-muted mb-0">
//                       <i className="mdi mdi-circle text-success align-middle me-1"></i>{" "}
//                       Active now
//                     </p>
//                   </Col>
//                   <Col md={7} xs={3}>
//                     <ul className="list-inline user-chat-nav text-end mb-0">
//                       <li className="list-inline-item">
//                         <Dropdown
//                           isOpen={this.state.isSearch}
//                           toggle={() =>
//                             this.setState({ isSearch: !this.state.isSearch })
//                           }
//                         >
//                           <DropdownToggle
//                             tag="i"
//                             className="btn nav-btn"
//                             type="button"
//                           >
//                             <i className="mdi mdi-magnify"></i>
//                           </DropdownToggle>
//                           <DropdownMenu end className=" dropdown-menu-md p-0">
//                             <Form className="p-2">
//                               <div className="search-box">
//                                 <div className="position-relative">
//                                   <Input
//                                     type="text"
//                                     className="form-control rounded bg-light border-0"
//                                     placeholder="Search..."
//                                   />
//                                   <i className="mdi mdi-magnify search-icon"></i>
//                                 </div>
//                               </div>
//                             </Form>
//                           </DropdownMenu>
//                         </Dropdown>
//                       </li>
//                       <li className="list-inline-item d-none d-sm-inline-block">
//                         <Dropdown
//                           isOpen={this.state.isSetting}
//                           toggle={() =>
//                             this.setState({ isSetting: !this.state.isSetting })
//                           }
//                         >
//                           <DropdownToggle
//                             tag="button"
//                             className="btn nav-btn"
//                             type="button"
//                           >
//                             <i className="mdi mdi-cog"></i>
//                           </DropdownToggle>
//                           <DropdownMenu className="dropdown-menu-end">
//                             <DropdownItem href="#">View Profile</DropdownItem>
//                             <DropdownItem href="#">Clear chat</DropdownItem>
//                             <DropdownItem href="#">Muted</DropdownItem>
//                             <DropdownItem href="#">Delete</DropdownItem>
//                           </DropdownMenu>
//                         </Dropdown>
//                       </li>

//                       <li className="list-inline-item">
//                         <Dropdown
//                           isOpen={this.state.isMore}
//                           toggle={() =>
//                             this.setState({ isMore: !this.state.isMore })
//                           }
//                         >
//                           <DropdownToggle
//                             tag="button"
//                             className="btn nav-btn"
//                             type="button"
//                           >
//                             <i className="mdi mdi-dots-horizontal"></i>
//                           </DropdownToggle>
//                           <DropdownMenu className="dropdown-menu-end">
//                             <DropdownItem href="#">Action</DropdownItem>
//                             <DropdownItem href="#">Another action</DropdownItem>
//                             <DropdownItem href="#">Something else</DropdownItem>
//                           </DropdownMenu>
//                         </Dropdown>
//                       </li>
//                     </ul>
//                   </Col>
//                 </Row>
//               </div>
//             </CardBody>
//             <CardBody>
//               <div className="chat-widget">
//                 <div className="chat-conversation">
//                   <SimpleBar style={{ maxHeight: "237px" }}>
//                     <ul className="list-unstyled mb-0 pr-3">
//                       <li>
//                         <div className="conversation-list">
//                           <div className="chat-avatar">
//                             <img src={avatar2} alt="" />
//                           </div>
//                           <div className="ctext-wrap">
//                             <div className="conversation-name">
//                               Frank Vickery
//                             </div>
//                             <div className="ctext-wrap-content">
//                               <p className="mb-0">Hey! I am available</p>
//                             </div>
//                             <p className="chat-time mb-0">
//                               <i className="mdi mdi-clock-outline align-middle me-1"></i>{" "}
//                               12:09
//                             </p>
//                           </div>
//                         </div>
//                       </li>

//                       <li className="right">
//                         <div className="conversation-list">
//                           <div className="ctext-wrap">
//                             <div className="conversation-name">Ricky Clark</div>
//                             <div className="ctext-wrap-content">
//                               <p className="mb-0">
//                                 Hi, How are you? What about our next meeting?
//                               </p>
//                             </div>

//                             <p className="chat-time mb-0">
//                               <i className="bx bx-time-five align-middle me-1"></i>{" "}
//                               10:02
//                             </p>
//                           </div>
//                         </div>
//                       </li>

//                       <li>
//                         <div className="chat-day-title">
//                           <span className="title">Today</span>
//                         </div>
//                       </li>
//                       <li>
//                         <div className="conversation-list">
//                           <div className="chat-avatar">
//                             <img src={avatar2} alt="" />
//                           </div>
//                           <div className="ctext-wrap">
//                             <div className="conversation-name">
//                               Frank Vickery
//                             </div>
//                             <div className="ctext-wrap-content">
//                               <p className="mb-0">Hello!</p>
//                             </div>
//                             <p className="chat-time mb-0">
//                               <i className="mdi mdi-clock-outline align-middle me-1"></i>{" "}
//                               10:00
//                             </p>
//                           </div>
//                         </div>
//                       </li>

//                       <li className="right">
//                         <div className="conversation-list">
//                           <div className="ctext-wrap">
//                             <div className="conversation-name">Ricky Clark</div>
//                             <div className="ctext-wrap-content">
//                               <p className="mb-0">
//                                 Hi, How are you? What about our next meeting?
//                               </p>
//                             </div>

//                             <p className="chat-time mb-0">
//                               <i className="bx bx-time-five align-middle me-1"></i>{" "}
//                               10:02
//                             </p>
//                           </div>
//                         </div>
//                       </li>

//                       <li>
//                         <div className="conversation-list">
//                           <div className="chat-avatar">
//                             <img src={avatar2} alt="" />
//                           </div>
//                           <div className="ctext-wrap">
//                             <div className="conversation-name">
//                               Frank Vickery
//                             </div>
//                             <div className="ctext-wrap-content">
//                               <p className="mb-0">Yeah everything is fine</p>
//                             </div>

//                             <p className="chat-time mb-0">
//                               <i className="bx bx-time-five align-middle me-1"></i>{" "}
//                               10:06
//                             </p>
//                           </div>
//                         </div>
//                       </li>

//                       <li>
//                         <div className="conversation-list">
//                           <div className="chat-avatar">
//                             <img src={avatar2} alt="" />
//                           </div>
//                           <div className="ctext-wrap">
//                             <div className="conversation-name">
//                               Frank Vickery
//                             </div>
//                             <div className="ctext-wrap-content">
//                               <p className="mb-0">
//                                 & Next meeting tomorrow 10.00AM
//                               </p>
//                             </div>
//                             <p className="chat-time mb-0">
//                               <i className="bx bx-time-five align-middle me-1"></i>{" "}
//                               10:06
//                             </p>
//                           </div>
//                         </div>
//                       </li>

//                       <li className="right">
//                         <div className="conversation-list">
//                           <div className="ctext-wrap">
//                             <div className="conversation-name">Ricky Clark</div>
//                             <div className="ctext-wrap-content">
//                               <p className="mb-0">Wow that's great</p>
//                             </div>

//                             <p className="chat-time mb-0">
//                               <i className="bx bx-time-five align-middle me-1"></i>{" "}
//                               10:07
//                             </p>
//                           </div>
//                         </div>
//                       </li>
//                     </ul>
//                   </SimpleBar>
//                 </div>
//               </div>
//             </CardBody>
//             <div className="p-3 chat-input-section border-top">
//               <Row>
//                 <Col>
//                   <div>
//                     <Input
//                       type="text"
//                       className="form-control rounded chat-input pl-3"
//                       placeholder="Enter Message..."
//                     />
//                   </div>
//                 </Col>
//                 <Col xs={{ size: "auto" }}>
//                   <Button
//                     color="primary"
//                     type="submit"
//                     className="chat-send w-md waves-effect waves-light"
//                   >
//                     <span className="d-none d-sm-inline-block me-2">Send</span>{" "}
//                     <i className="mdi mdi-send"></i>
//                   </Button>
//                 </Col>
//               </Row>
//             </div>
//           </Card>
//         </Col>
//       </React.Fragment>
//     );
//   }
// }

// export default ChatBox;
