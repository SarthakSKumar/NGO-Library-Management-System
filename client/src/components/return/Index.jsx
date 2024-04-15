import React from 'react';
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





	searchbook = (s) => {
		fetch(`${import.meta.env.VITE_BACKEND_URL}/searchfromissued/${s}`, {
			method: 'get',
			headers: { 'Content-Type': 'application/json' }
		}).then(response => response.json()).then(data => { if (data) this.setState({ bookList: data }) })

			.catch(err => {
				console.log(err);
				this.fetchBooks();

			});



	}





	fetchBooks = () => {

		fetch(`${import.meta.env.VITE_BACKEND_URL}/getissuereturn`, {
			method: 'get',
			headers: { 'Content-Type': 'application/json' }
		}).then(response => response.json()).then(data => { if (data) this.setState({ bookList: data, fetched: true }) })




	}

	componentDidMount() {


		this.fetchBooks();
	}




	render() {

		return (



			<div className="pageView">


				<Filter searchbook={this.searchbook} fetchBooks={this.fetchBooks} />

				<List fetchBooks={this.fetchBooks} books={this.state.bookList} fetched={this.state.fetched} />

			</div>



		)



	}







}