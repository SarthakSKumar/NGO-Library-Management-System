import React from "react";

import Info from "./info";
import BookHistory from "./bookHistory";
import "./style.css";
import { css } from "@emotion/react";
import { ScaleLoader } from "react-spinners";

const override = css`
  display: inline;
  margin-top: 0 auto;
  border-color: red;
`;

export default class BooksInfoPageIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null,
      student: null,
      studentHistory: [],
      books: [],
      loading: true,
    };
  }

  fetchStudentbyID = (id) => {
    if (id)
      fetch(`${import.meta.env.VITE_BACKEND_URL}/studentinfo/${id}`, {
        method: "get",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) this.setState({ student: data[0] });
        });
    else window.location.href = window.location.origin + "/students";
  };
  fetchStudentFromHistory = (id) => {
    if (id)
      fetch(`${import.meta.env.VITE_BACKEND_URL}/issuereturnstd/${id}`, {
        method: "get",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) this.setState({ studentHistory: data });
        });
  };

  fetchAllBooks = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/book`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) this.setState({ books: data });
      });
  };

  componentDidMount() {
    let id = window.location.pathname;
    id = id.substring(id.lastIndexOf("/") + 1);
    this.setState({ id });
    this.fetchStudentbyID(id);
    this.fetchStudentFromHistory(id);
    this.fetchAllBooks();
  }

  render() {
    const { student, studentHistory, books } = this.state;
    return (
      <div className="pageView">
        {student && books.length > 0 ? (
          <div className="pageRow">
            <Info student={student} />
            <BookHistory studentHistory={studentHistory} books={books} />
          </div>
        ) : (
          <div className="pageRow">
            {" "}
            <div style={{ marginLeft: "50%", marginTop: "20%" }}>
              <div className="sweet-loading">
                <ScaleLoader
                  css={override}
                  sizeunit={"px"}
                  color={"#0099cc"}
                  size={60}
                  height={35}
                  width={8}
                  radius={2}
                  loading={this.state.loading}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
} //class closed
