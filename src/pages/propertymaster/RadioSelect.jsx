import React, { Component } from "react";
import { Col, Input, Row } from "reactstrap";
import "./radiocard.css";
export default class RadioSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: this.props.values ? this.props.values : "",
    };
  }
  render() {
    return (
      <Row style={{ padding: "0px 0px 20px 0px" }}>
        <Col lg={4}>
          <div className="card-min">
            <Input
              type="radio"
              name="property_owner"
              checked={this.state.values == "NxOpZowo9GmjKqdR"}
              onChange={async (e) => {
                await this.setState({ values: "NxOpZowo9GmjKqdR" });
                await this.props.setFieldValue(
                  "property_owner",
                  "NxOpZowo9GmjKqdR"
                );
                // await this.props.setFieldValue("property_share", [
                //   {
                //     id: "",
                //     pro_property_master_id: "",
                //     property_owner_id: "",
                //     ownership_share: "",
                //   },
                // ]);
                if (!this.props.isEdit) {
                  await this.props.setFieldValue("property_share", [
                    {
                      id: "",
                      pro_property_master_id: "",
                      property_owner_id: "",
                      ownership_share: "",
                    },
                  ]);
                } else {
                  console.log(this.props.defaultValue, "Admin");
                  if (this.props.defaultValue == "NxOpZowo9GmjKqdR") {
                    await this.props.setFieldValue(
                      "property_share",
                      this.props.isEditData
                    );
                  } 
                  else {
                    await this.props.setFieldValue("property_share", [
                      {
                        id: "",
                        pro_property_master_id: "",
                        property_owner_id: "",
                        ownership_share: "",
                      },
                    ]);
                  }
                }
                this.props.handleIsPartner(false);
              }}
            />
            <span className="checkmark"></span>
            <span className="label">Admin</span>
            {/* <span className="price">€19.99</span> */}
            <section className="decoration-card"></section>
          </div>
        </Col>
        <Col lg={4}>
          <div className="card-min">
            <Input
              type="radio"
              name="property_owner"
              checked={this.state.values == "XbPW7awNkzl83LD6"}
              onChange={async () => {
                await this.setState({ values: "XbPW7awNkzl83LD6" });
                await this.props.setFieldValue(
                  "property_owner",
                  "XbPW7awNkzl83LD6"
                );
                this.props.handleIsPartner(false);
                await this.props.setFieldValue("property_share", [
                  {
                    id: "",
                    pro_property_master_id: "",
                    property_owner_id: "",
                    ownership_share: "",
                  },
                ]);
                // if (!this.props.isEdit) {
                //   await this.props.setFieldValue("property_share", [
                //     {
                //       id: "",
                //       pro_property_master_id: "",
                //       property_owner_id: "",
                //       ownership_share: "",
                //     },
                //   ]);
                // } else {
                //   console.log(this.props.defaultValue, "Client",this.props.defaultValue =="XbPW7awNkzl83LD6");
                //   if (this.props.defaultValue == "XbPW7awNkzl83LD6") {
                //     console.log("1Data",this.props.isEditData)
                //     await this.props.setFieldValue(
                //       "property_share",
                //       this.props.isEditData
                //     );
                //   } 
                //   else {
                //     await this.props.setFieldValue("property_share", [
                //       {
                //         id: "",
                //         pro_property_master_id: "",
                //         property_owner_id: "",
                //         ownership_share: "",
                //       },
                //     ]);
                //   }
                // }
              }}
            />
            <span className="checkmark"></span>
            <span className="label">Client</span>
            {/* <span className="price">€39.99</span> */}
            <section className="decoration-card"></section>
          </div>
        </Col>
        <Col lg={4}>
          <div className="card-min">
            <Input
              type="radio"
              name="property_owner"
              checked={this.state.values == "aYOxlpzRMwrX3gD7"}
              onChange={async () => {
                await this.setState({ values: "aYOxlpzRMwrX3gD7" });
                await this.props.setFieldValue(
                  "property_owner",
                  "aYOxlpzRMwrX3gD7"
                );
                this.props.handleIsPartner(true);
                await this.props.setFieldValue("property_share", [
                  {
                    id: "",
                    pro_property_master_id: "",
                    property_owner_id: "",
                    ownership_share: "",
                  },
                ]);
                // if (!this.props.isEdit) {
                //   await this.props.setFieldValue("property_share", [
                //     {
                //       id: "",
                //       pro_property_master_id: "",
                //       property_owner_id: "",
                //       ownership_share: "",
                //     },
                //   ]);
                // } else {
                //   console.log("Clear partner fileds",this.props.defaultValue)
                //   if (this.props.defaultValue == "aYOxlpzRMwrX3gD7") {
                //     await this.props.setFieldValue(
                //       "property_share",
                //       this.props.isEditData
                //     );
                //   } 
                //   else {
                //     await this.props.setFieldValue("property_share", [
                //       {
                //         id: "",
                //         pro_property_master_id: "",
                //         property_owner_id: "",
                //         ownership_share: "",
                //       },
                //     ]);
                //   }
                // }
              }}
            />
            <span className="checkmark"></span>
            <span className="label">Partner</span>
            {/* <span className="price">€59.99</span> */}
            <section className="decoration-card"></section>
          </div>
        </Col>
      </Row>
    );
  }
}
