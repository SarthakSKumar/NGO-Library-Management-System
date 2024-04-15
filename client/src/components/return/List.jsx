import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';

const override = css`
    display:inline;
    margin-top: 0 auto;
    border-color: red;

`;
export default class List extends React.Component {

	constructor() {
		super();
		this.state = {
			search: '',
			studentname: '',
			roll: '',
			branch: '',
			year: '',
			phone: '',
			issued: '',
			studentid: '',
			found: false,
			bookid: '',
			issue: '',
			fine: ''
		};

	}






	searchstudent = (event) => {
		let s = event.target.value
		this.setState({ search: s }, () => {
			fetch(`${import.meta.env.VITE_BACKEND_URL}/students/${s}`, {
				method: 'get',
				headers: { 'Content-Type': 'application/json' }
			}).then(response => response.json()).then(data => { if (data && data.length > 0) this.setState({ found: true, name: data[0].name, roll: data[0].roll, branch: data[0].branch, year: data[0].year, phone: data[0].phone, id: data[0].id, issued: data[0].issued }) });
		})



	}



	static showModal() {
		document.getElementById("returnBook").showModal();
	}
	static hideModal() {
		document.getElementById("returnBook").close();
	}

	static preventHide(e) {
		e.stopPropagation();
	}


	returnBook = () => {
		let { bookid, studentid } = this.state;
		let fine = this.state.fine > 0 ? this.state.fine : 0;
		fetch(`${import.meta.env.VITE_BACKEND_URL}/bookreturn`, {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				bookid: bookid,
				studentid: studentid,
				fine: fine
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
			List.hideModal();
			this.props.fetchBooks();
		});


	}


	/* eslint-disable no-unused-vars */

	render() {
		let wid = '20vw'
		let itemList;
		let tempfine;
		let x;
		if (this.props.books && this.props.books.length > 0) {

			const none = <div style={{ "marginLeft": '20px' }}>-</div>

			itemList = this.props.books.map((item) => {



				if (!item.return)
					return (
						<tr key={item.id} className="tableRow" style={{ fontSize: '0.9em' }}>
							<td className="" >{item.bookname}</td>
							<td className="">{item.isbn ? (item.isbn || '-') : '-'}</td>
							<td className="">{item.author ? (item.author || '-') : '-'}</td>


							<td className="">{item.edition ? (item.edition || '-') : '-'}</td>
							<td className="">{item.publisher ? (item.publisher || '-') : '-'}</td>

							<td className="">{item.studentname ? (item.studentname || '-') : '-'}</td>
							<td className="">{item.roll ? (item.roll || '-') : '-'}</td>
							<td className="" style={{ whiteSpace: 'pre-wrap' }}>{item.issue ? ((new Date(Date.parse(item.issue))).toDateString() + '\n' + (new Date(Date.parse(item.issue))).toLocaleTimeString() || '-') : '-'}</td>
							<td className="">
								<Link to={"/book/" + item.bookid} draggable="false" className="">View Book</Link>
								<br />
								<Link to={"/student/" + item.studentid} draggable="false" className="">View Student</Link>
							</td>
							<td>
								<a onClick={() => { this.setState({ bookid: item.bookid, studentid: item.studentid, studentname: item.studentname, roll: item.roll, bookname: item.bookname, author: item.author, publisher: item.publisher, edition: item.edition, isbn: item.isbn, fine: (Math.floor((Date.parse(new Date()) - Date.parse(item.issue)) / (60 * 60 * 24 * 1000)) - 15) }, List.showModal()) }}>Return</a>
							</td>
						</tr>
					)
			})
		}

		else {

			itemList = (!this.props.fetched) ? <tr key="nodata">
				<td className="noData" colSpan="6">
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
				</td>
			</tr>
				:
				<tr key="nodata">
					<td className="noData" colSpan="6">Currently, none of the Books are Issued!!</td>
				</tr>

		}

		return (
			<div className="pageRow" id="booksBlock">
				<div className="thisBlock">
					<div className="blockBody">
						<div className="thisTable">
							<div className="tbl-header">
								<table>
									<thead>
										<tr>
											<th className="">Name</th>
											<th className="">ISBN</th>
											<th className="">Author</th>
											<th className="">Edition</th>
											<th className="">Publisher</th>
											<th className="">Student Name</th>
											<th className="">Roll</th>
											<th className="">Issued</th>
											<th className=" ">Info</th>
											<th className=" ">Action</th>
										</tr>
									</thead>
								</table>
							</div>
							<div className="tbl-content">
								<table>
									<tbody>
										{itemList}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<dialog id="returnBook" className="dialogBox" onClick={List.hideModal} style={{ width: '50vw' }}>
					<div className="dialogTitle" onClick={List.preventHide}>
						Return Book
						<button onClick={List.hideModal}>X</button>
					</div>


					<div className="dialogBody" onClick={List.preventHide} >


						<div style={{ width: wid }}>
							<label>Book Name</label>
							<input name="search" placeholder="Name" value={this.state.bookname} />
						</div>
						<div style={{ width: wid }}>
							<label>Author</label>
							<input name="search" placeholder="Name" value={this.state.author} />
						</div>
						<div style={{ width: wid }}>
							<label>Publisher</label>
							<input name="search" placeholder="Name" value={this.state.publisher} />
						</div>
						<div style={{ width: wid }}>
							<label>Edition</label>
							<input name="search" placeholder="Name" value={this.state.edition} />
						</div>
						<div style={{ width: wid }}>
							<label>Student Name</label>
							<input name="Year" placeholder="Year" value={this.state.studentname} />
						</div>
						<div style={{ width: wid }}>
							<label>Roll</label>
							<input name="Roll" placeholder="Roll" value={this.state.roll} />
						</div>

						<div style={{ width: wid }}>
							<label className={this.state.fine > 0 ? "redtxt" : ""}>Fine Amount</label>
							<input name="Fine" placeholder="Fine" className="bold" defaultValue={this.state.fine > 0 ? 'INR ' + this.state.fine + '.00' : 0} />
						</div>



					</div>







					<div className="dialogFooter" onClick={List.preventHide}>
						<button onClick={this.returnBook} >Return</button>
						<button onClick={List.hideModal}>Cancel</button>
					</div>
				</dialog>

			</div>
		)
	}
}