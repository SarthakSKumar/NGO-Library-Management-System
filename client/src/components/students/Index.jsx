import React from 'react';
import { toast } from 'react-toastify';
import List from "./List";
import Filter from './filters'
import './style.css'
export default class BooksIndex extends React.Component {

  constructor() {
    super();
    this.state = {

      bookList: [],
      searchKeyword: '',
      fetched: false,
    };

  }


  //We are using bookList instead of student List as an Identifier


  searchbook = (s) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/students/${s}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json()).then(data => { if (data) this.setState({ bookList: data }) });



  }





  fetchStudents = () => {

    fetch(`${import.meta.env.VITE_BACKEND_URL}/students`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json()).then(data => { if (data) this.setState({ bookList: data, fatched: true }) })



  }

  componentDidMount() {


    this.fetchStudents();
  }

  addStudent = (name, roll, phone, year, branch) => {


    fetch(`${import.meta.env.VITE_BACKEND_URL}/students/add`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        roll: roll,
        phone: phone,
        year: year,
        branch: branch
      })
    }).then(response => response.json()).then(data => {
      toast.info(data, {
        position: toast.POSITION.BOTTOM_RIGHT,
        closeOnClick: true,
        pauseOnHover: true,
        autoClose: 3000,
        draggable: true,

        hideProgressBar: false,

      });
      this.fetchStudents();
    })


  }

  //Books refer to Students 

  render() {

    return (



      <div className="pageView">


        <Filter searchbook={this.searchbook} addStudent={this.addStudent} fetchStudents={this.fetchStudents} />

        <List fetchStudents={this.fetchStudents} books={this.state.bookList} fetched={this.state.fetched} />

      </div>



    )



  }







}