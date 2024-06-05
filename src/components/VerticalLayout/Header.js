import React, { Component } from "react";

import { connect } from "react-redux";
import {
  Form,
  FormGroup,
  InputGroup,
  Input,
  Button,
  Dropdown,
} from "reactstrap";

import { Link } from "react-router-dom";

// Import menuDropdown
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

//Import i18n
import { withNamespaces } from "react-i18next";

// Redux Store
import { toggleRightSidebar } from "../../store/actions";

//Import logo Images
import logosmdark from "../../assets/images/logo-sm-dark.png";
import logodark from "../../assets/images/logo-dark.png";
import logosmlight from "../../assets/images/logo-sm-light.png";
import logosmall from "../../assets/images/iconsmall.png";
import logolight from "../../assets/images/suhanilogowhite.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      isSocialPf: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleRightbar = this.toggleRightbar.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
  }
  /**
   * Toggle sidebar
   */
  toggleMenu() {
    this.props.toggleMenuCallback();
  }

  /**
   * Toggles the sidebar
   */
  toggleRightbar() {
    this.props.toggleRightSidebar();
  }

  toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  render() {
    const StoredData = localStorage.getItem("Theme");
    const themeData = JSON.parse(StoredData);
    console.log("ThemeData",themeData)
console.log("themedata ",themeData)
    return (
      <React.Fragment>
        <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box">
                <Link to="#" className="logo logo-dark">
                  <span className="logo-sm">
                    <img
                      src={themeData?.favicon}
                      alt=""
                      height="40"
                      style={{
                        width: "35px",
                        marginLeft: "-8.5px",
                        imageRendering: "-webkit-optimize-contrast",
                      }}
                    />
                  </span>
                  <span className="logo-lg">
                    <img src={themeData?.white_logo} alt="" height="50" />
                  </span>
                </Link>

                <Link to="#" className="logo logo-light">
                  <span className="logo-sm">
                    <img
                      src={themeData?.favicon}
                      alt=""
                      height="20"
                      style={{
                        width: "35px",
                        marginLeft: "-8.5px",
                        imageRendering: "-webkit-optimize-contrast",
                      }}
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src={themeData?.white_logo}
                      alt=""
                      height="50"
                      width={220}
                      style={{ marginLeft: "-8px" }}
                    />
                  </span>
                </Link>
              </div>

              <Button
                size="sm"
                color="none"
                type="button"
                onClick={this.toggleMenu}
                className="px-3 font-size-24 header-item waves-effect"
                id="vertical-menu-btn"
                style={{ color: "white" }}
              >
                <i className="ri-menu-2-line align-middle"></i>
              </Button>
            </div>

            <div className="d-flex">
              <Dropdown
                isOpen={this.state.isSocialPf}
                toggle={() =>
                  this.setState({ isSocialPf: !this.state.isSocialPf })
                }
                className="d-none d-lg-inline-block ms-1"
              ></Dropdown>

              <div className="dropdown d-none d-lg-inline-block ms-1">
                <Button
                  color="none"
                  type="button"
                  className="header-item noti-icon waves-effect"
                  onClick={this.toggleFullscreen}
                  style={{ color: "white" }}
                >
                  <i className="ri-fullscreen-line"></i>
                </Button>
              </div>

              <NotificationDropdown />

              <ProfileMenu />
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { layoutType } = state.Layout;
  return { layoutType };
};

export default connect(mapStatetoProps, { toggleRightSidebar })(
  withNamespaces()(Header)
);
