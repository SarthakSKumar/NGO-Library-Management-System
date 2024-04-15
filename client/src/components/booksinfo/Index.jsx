import React from 'react';

import Info from './info';
import BookHistory from './bookHistory';
import './style.css'
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';


const override = css`
    display:inline;
    margin-top: 0 auto;
    border-color: red;

`;


export default class BooksInfoPageIndex extends React.Component {

	constructor() {
		super();
		this.state = {
			id: null,
			book: null,
			bookHistory: [],
			students: [],
			loading: true
		};

	}

	fetchBookbyID = (id) => {
		if (id)

			fetch(`${import.meta.env.VITE_BACKEND_URL}/bookinfo/${id}`, {
				method: 'get',
				headers: { 'Content-Type': 'application/json' }
			}).then(response => response.json()).then(data => { if (data) this.setState({ book: data[0] }) });
		else
			window.location.href = window.location.origin + "/books";


	}
	fetchBookFromHistory = (id) => {

		if (id)

			fetch(`${import.meta.env.VITE_BACKEND_URL}/issuereturn/${id}`, {
				method: 'get',
				headers: { 'Content-Type': 'application/json' }
			}).then(response => response.json()).then(data => { if (data) this.setState({ bookHistory: data }) });

	}

	fetchAllStudents = () => {
		fetch(`${import.meta.env.VITE_BACKEND_URL}/students`, {
			method: 'get',
			headers: { 'Content-Type': 'application/json' }
		}).then(response => response.json()).then(data => { if (data) this.setState({ students: data }) })

	}


	componentDidMount() {
		let id = window.location.pathname;
		id = id.substring(id.lastIndexOf('/') + 1);
		this.setState({ id });
		this.fetchBookbyID(id);
		this.fetchBookFromHistory(id);
		this.fetchAllStudents();
	}


	render() {

		const { book, bookHistory, students } = this.state;
		return (
			<div className="pageView">
				{book && students.length > 0 ?
					<div className="pageRow">

						<Info book={book} />
						<BookHistory bookHistory={bookHistory} students={students} />

					</div>
					:


					<div className="pageRow">
						<div style={{ marginLeft: '50%', marginTop: '20%' }}>
							<div className='sweet-loading'>
								<ScaleLoader
									css={override}
									sizeunit={"px"}
									color={'#0099cc'}
									size={60}
									height={35}
									width={8}
									radius={2}
									loading={this.state.loading}
								/>
							</div>
						</div>
					</div>


				}




			</div>








		)






	}



}//class closed