// CommonDashboardCard.jsx

import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Col, Card, CardBody } from 'reactstrap'; // Assuming you are using Bootstrap components

const CommonDashboardCard = (props) => {
    const history = useHistory();
    const {Icon} = props
  return (
    // <Col key={key} md={4}>
      <Card>
        <CardBody>
          <div className="d-flex">
            <div className="flex-1 overflow-hidden">
              <h5 className="text-truncate font-size-14 mb-2 ">{props.title}</h5>
              <h2 className="mb-0" style={{color: `var(--bs-header-bg` }}>{props.count}</h2>
            </div>
            <div className="text-primary">
              <i onClick={() =>history.push(process.env.PUBLIC_URL + props.redirect)} style={{color:`var(--bs-header-bg`}} className={"ri-stack-line font-size-24"}></i>
              {/* <Icon fontSize={24} style={{cursor:'pointer'}} onClick={() =>history.push(process.env.PUBLIC_URL + props.redirect)} /> */}
            </div>
          </div>
        </CardBody>
{/* 
        <CardBody className="border-top py-3">
          <div className="text-truncate">
            <span className="badge badge-soft-success font-size-11 me-1"><i className="mdi mdi-menu-up"> </i> {report.rate}</span>
            <span className="text-muted ms-2">{report.desc}</span>
          </div>
        </CardBody> */}
      </Card>
    // </Col>
  );
};

export default CommonDashboardCard;
