import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

import InfoIcon from "../common/images/info.png";
export default class BooksInfoPageIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null,
      book: null,
      bookHistory: [],
    };
  }

  /*<div>
{this.props.bookHistory.map((item)=>{return<div>{item.bookid+' '+(new Date(Date.parse(item.issue))).toDateString()}</div>})}
</div>
*/

  render() {
    let studentid;
    let student;
    let itemListr = "";
    let itemListi = "";
    if (this.props.bookHistory && this.props.bookHistory.length > 0) {
      const none = <div style={{ marginLeft: "20px" }}>-</div>;

      itemListr = this.props.bookHistory.map((item) => {
        if (item.return) {
          studentid = item.studentid;
          student = this.props.students.find((std) => std.id == studentid);

          const none = <div style={{ marginLeft: "20px" }}>-</div>;
          return (
            <tr
              key={item.id}
              className="tableRow"
              style={{ fontSize: "0.9em" }}
            >
              <td className="">
                <Link
                  to={"/student/" + student.id}
                  draggable="false"
                  className=""
                >
                  {student.name}
                </Link>
              </td>
              <td className="">{student.roll ? student.roll || "-" : "-"}</td>
              <td className="">{student.year ? student.year || "-" : "-"}</td>

              <td className="" style={{ whiteSpace: "pre-wrap" }}>
                {item.issue
                  ? new Date(Date.parse(item.issue)).toDateString() +
                      "\n" +
                      new Date(Date.parse(item.issue)).toLocaleTimeString() ||
                    "-"
                  : "-"}
              </td>
              <td className="" style={{ whiteSpace: "pre-wrap" }}>
                {item.return
                  ? new Date(Date.parse(item.return)).toDateString() +
                      "\n" +
                      new Date(Date.parse(item.return)).toLocaleTimeString() ||
                    "-"
                  : "-"}
              </td>
              <td className={!(item.fine == "Nill") ? "redtxt" : null}>
                {item.fine ? item.fine || "-" : "-"}
              </td>
            </tr>
          );
        }
      });

      itemListi = this.props.bookHistory.map((item) => {
        if (!item.return) {
          studentid = item.studentid;
          student = this.props.students.find((std) => std.id == studentid);

          const none = <div style={{ marginLeft: "20px" }}>-</div>;
          return (
            <tr
              key={item.id}
              className="tableRow"
              style={{ fontSize: "0.9em" }}
            >
              <td className="">
                <Link
                  to={"/student/" + student.id}
                  draggable="false"
                  className=""
                >
                  {student.name}
                </Link>
              </td>
              <td className="">{student.roll ? student.roll || "-" : "-"}</td>
              <td className="">{student.year ? student.year || "-" : "-"}</td>

              <td className="" style={{ whiteSpace: "pre-wrap" }}>
                {item.issue
                  ? new Date(Date.parse(item.issue)).toDateString() +
                      "\n" +
                      new Date(Date.parse(item.issue)).toLocaleTimeString() ||
                    "-"
                  : "-"}
              </td>
            </tr>
          );
        }
      });
    } else {
      itemListr = (
        <tr key="nodata">
          <td className="noData" colSpan="6">
            No Transaction here!!
          </td>
        </tr>
      );
      itemListi = (
        <tr key="nodata">
          <td className="noData" colSpan="6">
            No Transaction here!!
          </td>
        </tr>
      );
    }

    return (
      <div className="thisBlock halfBlock">
        <div className="blockTitle" style={{ fontSize: "1.3vw" }}>
          Currently Issued
        </div>
        <div className="pageRow" id="booksBlock" style={{}}>
          <div className="thisBlock">
            <div className="blockBody">
              <div className="thisTable" style={{ height: "35vh" }}>
                <div className="tbl-header">
                  <table>
                    <thead>
                      <tr>
                        <th className="">Name</th>
                        <th className="">Roll</th>
                        <th className="">Year</th>
                        <th className="">Issued</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="tbl-content">
                  <table>
                    <tbody>{itemListi}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "2px", background: "#d4d4d5" }}></div>

        <div className="blockTitle" style={{ fontSize: "1.3vw" }}>
          Transaction History
        </div>
        <div className="pageRow" id="booksBlock">
          <div className="thisBlock">
            <div className="blockBody">
              <div className="thisTable" style={{ height: "35vh" }}>
                <div className="tbl-header">
                  <table>
                    <thead>
                      <tr>
                        <th className="">Name</th>
                        <th className="">Roll</th>
                        <th className="">Year</th>
                        <th className="">Issued</th>
                        <th className="">Return</th>
                        <th className="">Fine</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="tbl-content">
                  <table>
                    <tbody>{itemListr}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } //render Ends here
} //class closed
