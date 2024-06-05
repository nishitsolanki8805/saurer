import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import { AiTwotoneEdit } from "react-icons/ai";
import {
  GET_ALL_USER,
  GET_DEPARTMENT,
  GET_PROCESS,
  UPDATE_DEPARTMENT_STATUS,
  UPDATE_PROCESS_BY_FIELD,
} from "../../global";
import Switch from "react-switch";
import TableComponent from "../../components/Common/TableComponent";

const ProcessList = () => {
  const { state } = useLocation();

  const [breadcrumbItems] = useState([
    {
      title: "SAURER.",
      link: process.env.PUBLIC_URL + "/dashboard",
    },

    {
      title: "Process Master List",
      link: "#",
    },
  ]);

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

  const [isLoading, setIsLoading] = useState(false);
  const [currentpageIndex, setCurrentpageIndex] = useState(0);
  const [pageTotal, setPageTotal] = useState(0);
  const [show, setShow] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [allUserData, setAllUserData] = useState([]);
  const [isUserID, setIsUserID] = useState(false);

  useEffect(() => {
    if (state?.page) {
      getAllUsers(state?.page, state?.perPage);
    } else {
      getAllUsers();
    }
  }, [state?.page]);

  const history = useHistory();

  const getAllUsers = async (page, perpage) => {
    setIsLoading(true);
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(page ? `${GET_PROCESS}?page=${page}` : GET_PROCESS, {
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
    })
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
  const updateStatus = async (id, status) => {
    console.log("status", status);
    setIsLoading(true);
    const StoredData = localStorage.getItem("authUser");
    const Token = JSON.parse(StoredData);
    await fetch(UPDATE_PROCESS_BY_FIELD + id, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + Token.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        field_db: "is_active",
        search_val: status == 0 ? 1 : 0,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setIsLoading(false);
        getAllUsers(currentpageIndex, perPage);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const renderTHContent = () => {
    return (
      <>
        <tr>
          <th>Action</th>
          <th>Name</th>
          <th className="text-center">Status</th>
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
          <>
            <AiTwotoneEdit
              style={{
                // color: "#5664d2",
                height: "20px",
                width: "20px",
                marginTop: "8px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              onClick={() =>
                history.push(
                  process.env.PUBLIC_URL + "/edit-process/" + item.id,
                  { isView: false, page: currentpageIndex, perPage: perPage }
                )
              }
            />
          </>
        </td>
        <td>
          <h5 className="font-size-14 text-truncate"></h5>
          <p className="mb-0">
            <span className="fw-medium">{`${item.process_name}`} </span>
          </p>
        </td>
        <td className="text-center">
          <Switch
            uncheckedIcon={<Offsymbol />}
            className="me-1 mb-sm-8 mb-2"
            checkedIcon={<OnSymbol />}
            onColor={"#e6001e"}
            onChange={() => updateStatus(item.id, item.is_active)}
            checked={item.is_active == 1 ? true : false}
          />
        </td>
       
      </>
    );
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Process Master List"
            breadcrumbItems={breadcrumbItems}
          />
          {isLoading ? (
            <>
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
                getAllUsers={getAllUsers}
                renderTHContent={renderTHContent}
                renderTdContent={renderTdContent}
                btnName={"Add Process Master"}
                addData={"/create-process"}
                editData={"/edituser/"}
                viewData={"/viewuser/"}
                SearchData={["process_name"]}
                isDeleteUser={false}
              />
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProcessList;
