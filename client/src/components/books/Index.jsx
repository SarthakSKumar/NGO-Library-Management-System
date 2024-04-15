import React from 'react';
import List from "./List";
import { toast } from 'react-toastify';
import Filter from './filters'
import './style.css'
export default class BooksIndex extends React.Component {

  constructor() {
    super();
    this.state = {
      tip: true,
      bookList: [],
      searchKeyword: ''
    };

  }



  /* eslint-disable no-unused-expressions */

  searchbook = (s) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/book/${s}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json()).then(data => { if (data) this.setState({ bookList: data }) });



  }





  fetchBooks = () => {

    fetch(`${import.meta.env.VITE_BACKEND_URL}/book`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json()).then(data => {
      if (data) {
        this.setState({ bookList: data })


        this.state.tip ? toast.info("Tip: Click on the Book Name to view its Details and Transaction History", {
          position: toast.POSITION.BOTTOM_RIGHT,
          closeOnClick: true,
          pauseOnHover: true,
          autoClose: 5000,
          draggable: true,

          hideProgressBar: false,

        }) : null



        this.setState({ tip: false })
      }
    })



  }

  componentDidMount() {


    this.fetchBooks();

  }


  addBook = (name, isbn, author, publisher, copyrightyear, edition, printyear, stackno, volume, accessionno, pages, totalcopies, availablecopies, type, price, additionals) => {


    fetch(`${import.meta.env.VITE_BACKEND_URL}/book/add`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        isbn: isbn,
        author: author,
        publisher: publisher,
        copyrightyear: copyrightyear,
        edition: edition,
        printyear: printyear,
        stackno: stackno,
        volume: volume,
        accessionno: accessionno,
        pages: pages,
        totalcopies: totalcopies,
        availablecopies: availablecopies,
        type: type,
        price: price,
        additionals: additionals
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
      this.fetchBooks()
    })

  }


  render() {

    return (



      <div className="pageView">


        <Filter searchbook={this.searchbook} addBook={this.addBook} fetchBooks={this.fetchBooks} />

        <List fetchBooks={this.fetchBooks} books={this.state.bookList} />

      </div>



    )



  }







}