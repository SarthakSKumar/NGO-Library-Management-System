import React from "react";
import "./style.css";
export default class BooksInfoPageIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null,
      studentt: null,
      studentHistory: [],
    };
  }

  /*<div>
{this.props.bookHistory.map((item)=>{return<div>{item.bookid+' '+(new Date(Date.parse(item.issue))).toDateString()}</div>})}
</div>
*/

  render() {
    let bookid;
    let book = {};
    let itemListr = "";
    let itemListi = "";
    if (this.props.studentHistory && this.props.studentHistory.length > 0) {
      const none = <div style={{ marginLeft: "20px" }}>-</div>;

      itemListr = this.props.studentHistory.map((item) => {
        if (item.return) {
          bookid = item.bookid;
          book = this.props.books.find((bk) => bk.id == bookid);

          const none = <div style={{ marginLeft: "20px" }}>-</div>;
          if (book)
            return (
              <tr
                key={item.id}
                className="tableRow"
                style={{ fontSize: "0.9em" }}
              >
                <td className="">{book.name ? book.name || "-" : "-"}</td>
                <td className="">{book.isbn ? book.isbn || "-" : "-"}</td>
                <td className="">{book.author ? book.author || "-" : "-"}</td>
                <td className="">{book.edition ? book.edition || "-" : "-"}</td>

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
                    new Date(
                      Date.parse(item.return)
                    ).toLocaleTimeString() || "-"
                    : "-"}
                </td>
                <td className={!(item.fine == "Nill") ? "redtxt" : null}>
                  {item.fine ? item.fine || "-" : "-"}
                </td>
              </tr>
            );
        }
      });

      itemListi = this.props.studentHistory.map((item) => {
        if (!item.return) {
          bookid = item.bookid;
          book = this.props.books.find((std) => std.id == bookid);

          const none = <div style={{ marginLeft: "20px" }}>-</div>;
          if (book)
            return (
              <tr
                key={item.id}
                className="tableRow"
                style={{ fontSize: "0.9em" }}
              >
                <td className="">{book.name ? book.name || "-" : "-"}</td>
                <td className="">{book.isbn ? book.isbn || "-" : "-"}</td>
                <td className="">{book.author ? book.author || "-" : "-"}</td>
                <td className="">{book.edition ? book.edition || "-" : "-"}</td>

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
                        <th className="">ISBN</th>
                        <th className="">Author</th>
                        <th className="">Edition</th>
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
                        <th className="">ISBN</th>
                        <th className="">Author</th>
                        <th className="">Edition</th>
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
