import React from 'react';
import List from "./List";
import './style.css'
export default class Home extends React.Component {



	constructor() {
		super();
		this.state = {

			bookList: [],
			totalbookList: [],
			total: '',
			issued: '',
			students: '',
			avl: '',
			fetched: false,

		};

	}



	fetchAllBooks = () => {

	}


	fetchBooks = () => {

		fetch(`${import.meta.env.VITE_BACKEND_URL}/getissuereturn`, {
			method: 'get',
			headers: { 'Content-Type': 'application/json' }
		}).then(response => response.json()).then(data => { if (data) this.setState({ fetched: true, bookList: data, issued: data.filter(function (x) { return !x.return }).length }) })




	}
	countBooks = () => {

		fetch(`${import.meta.env.VITE_BACKEND_URL}/countbook`, {
			method: 'get',
			headers: { 'Content-Type': 'application/json' }
		}).then(response => response.json()).then(data => { if (data) this.setState({ total: data[0].count }) })




	}
	countavlBooks = () => {

		fetch(`${import.meta.env.VITE_BACKEND_URL}/countavlbook`, {
			method: 'get',
			headers: { 'Content-Type': 'application/json' }
		}).then(response => response.json()).then(data => { if (data) this.setState({ avl: data[0].count }) })




	}



	countStudents = () => {

		fetch(`${import.meta.env.VITE_BACKEND_URL}/countstudent`, {
			method: 'get',
			headers: { 'Content-Type': 'application/json' }
		}).then(response => response.json()).then(data => { if (data) this.setState({ students: data[0].count }) })




	}


	componentDidMount() {


		this.fetchBooks();
		this.countBooks();
		this.countavlBooks();
		this.countStudents();
	}




	render() {



		return (
			<div className="pageView">

				<div className="pageRow" style={{ width: '40vw' }}>
					<div className="box">
						<span className="boxTitle" title="Total  Books">Books</span>
						<span className="boxValue" title="Total Books">{this.state.total || 0}</span>
					</div>
					<div className="box"><div className="separator"> </div></div>
					<div className="box">
						<span className="boxTitle" title="Total number of issued Copies">Issued</span>
						<span className="boxValue" title="Total number of issued Copies">{this.state.issued || 0}</span>
					</div>
					<div className="box"><div className="separator"> </div></div>
					<div className="box">
						<span className="boxTitle" title="Total number of Available Books">Available</span>
						<span className="boxValue" title="Total number of Available Books">{this.state.avl || 0}</span>
					</div>
					<div className="box"><div className="separator"> </div></div>
					<div className="box">
						<span className="boxTitle" title="Total number of Registered Students">Students</span>
						<span className="boxValue" title="Total number of Registered Students">{this.state.students || 0}</span>
					</div>

				</div>


				<div className="pageRow blockTitle" style={{ fontSize: '20px', color: '#707070', fontWeight: '500', marginLeft: '10px', cursor: 'pointer', width: '40vw' }} title="Books Yet to Be Returned">Currently Issued Books</div>

				<List fetchBooks={this.fetchBooks} books={this.state.bookList} fetched={this.state.fetched} />
			</div>)
	}
}