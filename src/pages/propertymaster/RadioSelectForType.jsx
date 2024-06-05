import React, { Component } from 'react'
import { Col, Input, Row } from 'reactstrap';
import './radiocard.css'
import { GET_PROPERTY_TYPE_NO_PAGE } from '../../global';
export default class RadioSelectForType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: this.props.values || "",
            // getAllPropertyType: []
        };

    }
    // componentDidMount() {
    //     // this.getPropertyType()
    //     // this.props.updateLoading(false)
    // }
    // async getPropertyType() {
    //     // this.setState({ isLoading: true });
    //     const StoredData = localStorage.getItem("authUser");
    //     const Token = JSON.parse(StoredData);
    //     await fetch(GET_PROPERTY_TYPE_NO_PAGE, {
    //         method: "GET",
    //         headers: {
    //             Authorization: "Bearer " + Token.access_token,
    //             Accept: "application/json",
    //         },
    //     })
    //         // .then((response) => {
    //         //   return response.json();
    //         // })
    //         .then((response) => {
    //             response.json().then((responseJson) => {
    //                 if (responseJson.data) {
    //                     this.setState({
    //                         getAllPropertyType: responseJson.data,                          
    //                     });
                       
    //                         this.props.updateLoading(false)

    //                     // console.log('dataByID', responseJson.data)
    //                     // this.setState({ isLoading: false });
    //                 }
    //             });
    //         })
    //         .catch((err) => {
    //             // console.log(err);
    //         });
    // }
    render() {
       
        // this.props.updateLoading(false)
        return (
            <Row style={{ padding: '0px 0px 20px 0px' }}>
                <div style={{display :'flex' , justifyContent :'center'}}>

                {
                    this.props.getAllPropertyType?.map((data, ind) =>{
                        return(
                            // <Col lg={2} key={ind}>
                            <div className="card-min" style={{width :'200px'}}>
                                <Input type="radio" name="type"
                                    checked={this.state.values === data.id }
                                    // checked={this.state.values == data.type}
                                    onChange={(e) => {
                                        this.setState({ values: data.id });
                                        this.props.setFieldValue("type", data.id)
                                        this.props.setFieldValue("type_id", data.id)
                                        
                                    }}
        
                                />
                                <span className="checkmark"></span>
                                <span className="label" >{data.type.toUpperCase()}</span>
                                {/* <span className="price">€19.99</span> */}
                                <section className="decoration-card"></section>
                            </div>
                        // </Col>
                        )
                    })
                }
                
                </div>
            </Row>
        )
    }
}
