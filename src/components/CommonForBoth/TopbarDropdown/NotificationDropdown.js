import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
import moment from "moment";
//i18b
import { withNamespaces } from "react-i18next";
import { toast } from "react-toastify";
//Import images
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { NOTIFICATION_BY_ID, UPDATE_NOTIFICATION_BY_ID } from "../../../global";
import { withRouter } from "react-router-dom";

class NotificationDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      notificationData: false,
    };
  }

  toggle = () => {
    this.setState({ menu: !this.state.menu });
  };

  UpdateNotificationById = async (data) => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    var authUserID = await localStorage.getItem("authUserId");
    await fetch(UPDATE_NOTIFICATION_BY_ID + data?.id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ is_Seen: data?.is_Seen }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.result == true) {
          // toast("SuccessFully Updated Notification", {
          //     type: "success",
          // });
          // history.push(process.env.PUBLIC_URL + "/dashboard");
        } else {
          // toast("Please try again", {
          //     type: "warning",
          // });
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  GetNotificationDataById = async () => {
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    var authUserID = await localStorage.getItem("authUserId");
    await fetch(NOTIFICATION_BY_ID + authUserID, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.data) {
          this.setState({ notificationData: res.data });
        } else {
          // setIsLoading(false);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  componentDidMount() {
    this.GetNotificationDataById();
  }

  render() {
    const { notificationData, menu } = this.state;
    const { t } = this.props;

    // const history = useHistory();

    return (
      <React.Fragment>
        <Dropdown isOpen={menu} toggle={this.toggle} className="d-inline-block">
          <DropdownToggle
            tag="button"
            className="btn header-item noti-icon waves-effect"
            id="page-header-notifications-dropdown"
            style={{ color: "white" }}
          >
            <i className="ri-notification-3-line"></i>
            {notificationData?.length > 0 && <span className="noti-dot"></span>}
          </DropdownToggle>
          <DropdownMenu
            className="dropdown-menu-end dropdown-menu-lg p-0"
            aria-labelledby="page-header-notifications-dropdown"
          >
            <div className="p-3">
              <Row className="align-items-center">
                <Col>
                  <h6 className="m-0"> {"Notifications"} </h6>
                </Col>
              </Row>
            </div>
            {notificationData?.length ? (
              <>
                <SimpleBar style={{ maxHeight: "240px" }}>
                  {notificationData?.map((data, index) => {
                    return (
                      <div
                        className="text-reset notification-item"
                        key={index}
                        onClick={() => {
                          if (data?.module === "Welcome Module") {
                            // history.push(process.env.PUBLIC_URL + "/driverlist");
                            this.props.history.push(
                              process.env.PUBLIC_URL + "/driverlist"
                            );
                            this.UpdateNotificationById({ id: data?.id });
                          } else if (data?.module === "Task Remainder") {
                            // history.push(process.env.PUBLIC_URL + "/driverlist");
                            this.props.history.push(
                              process.env.PUBLIC_URL + "/calendar"
                            );
                            this.UpdateNotificationById({ id: data?.id });
                          }
                          // add more conditions here for different modules
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-1">
                            <div className="font-size-12 text-muted">
                              <p className="mb-1">{data?.message}</p>
                              <p className="mb-0">
                                <i className="mdi mdi-clock-outline"></i>{" "}
                                {moment(data?.created_at).format("DD/MM/YYYY")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </SimpleBar>
              </>
            ) : (
              <>
                <SimpleBar style={{ maxHeight: "230px" }}>
                  <Link to="#" className="text-reset notification-item">
                    <div className="d-flex">
                      <div className="flex-1">
                        <h6 className="mt-0 mb-1">{"No Notification Found"}</h6>
                      </div>
                    </div>
                  </Link>
                </SimpleBar>
              </>
            )}
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

// export default withNamespaces()(NotificationDropdown);
export default withRouter(NotificationDropdown);

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
// import SimpleBar from "simplebar-react";

// //i18b
// import { withNamespaces } from "react-i18next";

// //Import images
// import avatar3 from "../../../assets/images/users/avatar-3.jpg";
// import avatar4 from "../../../assets/images/users/avatar-4.jpg";

// class NotificationDropdown extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       menu: false,
//     };
//     this.toggle = this.toggle.bind(this);
//   }

//   toggle() {
//     this.setState((prevState) => ({
//       menu: !prevState.menu,
//     }));
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <Dropdown
//           isOpen={this.state.menu}
//           toggle={this.toggle}
//           className="d-inline-block"
//         >
//           <DropdownToggle
//             tag="button"
//             className="btn header-item noti-icon waves-effect"
//             id="page-header-notifications-dropdown"
//           >
//             <i className="ri-notification-3-line"></i>
//             <span className="noti-dot"></span>
//           </DropdownToggle>
//           <DropdownMenu
//             className="dropdown-menu-end dropdown-menu-lg p-0"
//             aria-labelledby="page-header-notifications-dropdown"
//           >
//             <div className="p-3">
//               <Row className="align-items-center">
//                 <Col>
//                   <h6 className="m-0"> {this.props.t("Notifications")} </h6>
//                 </Col>
//                 <div className="col-auto">
//                   <Link to="#" className="small">
//                     {" "}
//                     {this.props.t("View All")}
//                   </Link>
//                 </div>
//               </Row>
//             </div>
//             <SimpleBar style={{ maxHeight: "230px" }}>
//                             <Link to="#" className="text-reset notification-item">
//                                 <div className="d-flex">
//                                     <div className="avatar-xs me-3">
//                                         <span className="avatar-title bg-primary rounded-circle font-size-16">
//                                             <i className="ri-shopping-cart-line"></i>
//                                         </span>
//                                     </div>
//                                     <div className="flex-1">
//                                         <h6 className="mt-0 mb-1">{this.props.t('Your order is placed')}</h6>
//                                         <div className="font-size-12 text-muted">
//                                             <p className="mb-1">{this.props.t('If several languages coalesce the grammar')}</p>
//                                             <p className="mb-0"><i className="mdi mdi-clock-outline"></i> {this.props.t('3 min ago')}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Link>
//                             <Link to="#" className="text-reset notification-item">
//                                 <div className="d-flex">
//                                     <img src={avatar3} className="me-3 rounded-circle avatar-xs" alt="user-pic" />
//                                     <div className="flex-1">
//                                         <h6 className="mt-0 mb-1">{this.props.t('James Lemire')}</h6>
//                                         <div className="font-size-12 text-muted">
//                                             <p className="mb-1">{this.props.t('It will seem like simplified English.')}</p>
//                                             <p className="mb-0"><i className="mdi mdi-clock-outline"></i> {this.props.t('1 hours ago')}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Link>
//                         </SimpleBar>
//             <div className="p-2 border-top">
//               <Link
//                 to="#"
//                 className="btn btn-sm btn-link font-size-14 btn-block text-center"
//               >
//                 <i className="mdi mdi-arrow-right-circle me-1"></i>
//                 {this.props.t(" View More")}
//               </Link>
//             </div>
//           </DropdownMenu>
//         </Dropdown>
//       </React.Fragment>
//     );
//   }
// }
// export default withNamespaces()(NotificationDropdown);
