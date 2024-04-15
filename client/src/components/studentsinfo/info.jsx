import React from "react";

export default class BooksInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null,
      student: null,
    };
  }

  render() {
    let { student } = this.props;

    return (
      <div className="thisBlock halfBlock">
        <div className="blockTitle">Student Info</div>

        <div className="blockBody custom">
          <div className="infoDisplay">
            <label>Name</label>
            <label>{student.name || "-"}</label>
          </div>
          <div className="infoDisplay">
            <label>Roll</label>
            <label>{student.roll || "-"}</label>
          </div>
          <div className="infoDisplay">
            <label>Phone</label>
            <label>{student.phone || "-"}</label>
          </div>
          <div className="infoDisplay">
            <label>Year</label>
            <label>{student.year || "-"}</label>
          </div>
          <div className="infoDisplay">
            <label>Branch</label>
            <label>{student.branch || "-"}</label>
          </div>
          <div className="infoDisplay">
            <label>No. Of Issued Books</label>
            <label>{student.issued || "-"}</label>
          </div>
          <div className="infoDisplay">
            <label>Student UID</label>
            <label>{student.id || "-"}</label>
          </div>
        </div>
      </div>
    );
  }
} //class closed
