import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withNamespaces } from "react-i18next";
import { Link } from "react-router-dom";
// users
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import { Avatar } from "@material-ui/core";

class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  }

  render() {
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    // let username = "Admin";


    let username =
      `${user_data?.first_name} ${user_data?.last_name}` || "Admin";
    let firstLetter = username.substring(0, 1) || "";
    // console.log('user_data----', user_data)
    if (localStorage.getItem("authUser")) {
      if (username === "true") {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        const uNm = obj.email.split("@")[0];
        username = uNm.charAt(0).toUpperCase() + uNm.slice(1);
        // const uNm = obj.email.split("@")[0];
        // username = obj.charAt(0).toUpperCase() + obj.slice(1);
      } else {
        // this.props.history.push("/login")
      }
    }
    // let username = "Admin" ;
    // if (localStorage.getItem("authUser")) {
    //   const obj = JSON.parse(localStorage.getItem("authUser"));
    //   const uNm = obj.email?.split("@")[0];
    //   username = uNm?.charAt(0).toUpperCase() + uNm?.slice(1);
    // }

    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="d-inline-block user-dropdown"
        >
          <DropdownToggle
            tag="button"
            className="btn header-item waves-effect"
            id="page-header-user-dropdown"
          >
            <div className="d-flex justify-content-center align-items-center">
              {
                user_data?.profile_image ?
                  <>
                    <Avatar
                      alt="Remy Sharp"
                      style={{ width: 30, height: 30 }}
                      className="me-1"
                      src={user_data?.profile_image} />
                  </> :
                  <>
                    <Avatar style={{ width: 30, height: 30 }} className="me-1">{firstLetter}</Avatar>
                  </>
              }

              {/* <img
              className="rounded-circle header-profile-user me-1"
              src={user_data?.profile_image}
              alt="Header Avatar"
              width={30}
              height={30}
            /> */}

              <span className="d-none d-xl-inline-block ms-1 text-transform" style={{color:'#fff'}}>
                {username}
              </span>
              <i className="mdi mdi-chevron-down d-none ms-1 d-xl-inline-block" style={{color:'#fff'}}></i>
            </div>
            
            {/* <img
              className="rounded-circle header-profile-user me-1"
              src={avatar2}
              alt="Header Avatar"
            />
            <span className="d-none d-xl-inline-block ms-1 text-transform">
              {username}
            </span>
            <i className="mdi mdi-chevron-down d-none ms-1 d-xl-inline-block"></i> */}
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            {/* <DropdownItem href="#">
              <i className="ri-user-line align-middle me-1"></i>{" "}
              {this.props.t("Profile")}
            </DropdownItem> */}
            {/* <Link to={"/theme"}>
              <DropdownItem>
                <i className=" ri-settings-2-line align-middle me-1"></i>{" "}
                {this.props.t("Theme")}
              </DropdownItem>
            </Link> */}
            <Link to={process.env.PUBLIC_URL + '/change-profile'}>
              <DropdownItem>
              <i className="ri-user-line align-middle me-1"></i>{" "}
                {this.props.t("Profile")}
              </DropdownItem>
            </Link>
            <Link to={process.env.PUBLIC_URL + '/change-password'}>
              <DropdownItem>
                <i className=" ri-settings-2-line align-middle me-1"></i>{" "}
                {this.props.t("Change Password")}
              </DropdownItem>
            </Link>
            <DropdownItem divider />
            <DropdownItem
              className="text-danger"
              href={process.env.PUBLIC_URL + "/logout"}
            >
              <i className="ri-shut-down-line align-middle me-1 text-danger"></i>{" "}
              {this.props.t("Logout")}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default withNamespaces()(ProfileMenu);
