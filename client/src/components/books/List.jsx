import React, { useState } from 'react';
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

const List = ({ books, fetchBooks }) => {
	const [search, setSearch] = useState('');
	const [name, setName] = useState('');
	const [roll, setRoll] = useState('');
	const [branch, setBranch] = useState('');
	const [year, setYear] = useState('');
	const [phone, setPhone] = useState('');
	const [issued, setIssued] = useState('');
	const [id, setId] = useState('');
	const [found, setFound] = useState(false);
	const [bookid, setBookId] = useState('');
	const [bookname, setBookName] = useState('');
	const [author, setAuthor] = useState('');
	const [publisher, setPublisher] = useState('');
	const [edition, setEdition] = useState('');
	const [isbn, setIsbn] = useState('');
	const [loading, setLoading] = useState(true);

	const searchStudent = (event) => {
		let s = event.target.value;
		setSearch(s);
		fetch(`${import.meta.env.VITE_BACKEND_URL}/students/${s}`, {
			method: 'get',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(response => response.json())
			.then(data => {
				if (data && data.length > 0) {
					setFound(true);
					setName(data[0].name);
					setRoll(data[0].roll);
					setBranch(data[0].branch);
					setYear(data[0].year);
					setPhone(data[0].phone);
					setId(data[0].id);
					setIssued(data[0].issued);
				}
			});
	};

	const showModal = () => {
		document.getElementById("issueBook").showModal();
	};

	const hideModal = () => {
		document.getElementById("issueBook").close();
	};

	const preventHide = (e) => {
		e.stopPropagation();
	};

	const issue = () => {
		fetch(`${import.meta.env.VITE_BACKEND_URL}/bookissue`, {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				bookid: bookid,
				studentid: id,
				roll: roll,
				bookname: bookname,
				studentname: name,
				author: author,
				publisher: publisher,
				edition: edition,
				isbn: isbn
			})
		})
			.then(response => response.json())
			.then(data => {
				hideModal();
				fetchBooks();
				toast.info(data, {
					position: toast.POSITION.BOTTOM_RIGHT,
					closeOnClick: true,
					pauseOnHover: true,
					autoClose: 3000,
					draggable: true,
					hideProgressBar: false,
				});
			});
	};

	let wid = '20vw';
	let itemList;
	if (books && books.length > 0) {
		itemList = books.map((item) => {
			return (
				<tr key={item.id} className="tableRow" style={{ fontSize: '0.9em' }}>
					<td className="" title="Click to know more about this book" style={{ width: '20vw' }}>
						<Link to={"/book/" + item.id} draggable="false" className="">{item.name}</Link>
					</td>
					<td className="">{item.isbn || '-'}</td>
					<td className="">{item.author || '-'}</td>
					<td className="">{item.edition || '-'}</td>
					<td className="">{item.publisher || '-'}</td>
					<td className="copies">{item.availablecopies || '-'}</td>
					<td className="">{item.stackno || '-'}</td>
					<td className="">
						{item.availablecopies ?
							<a style={{ marginLeft: '4px' }} onClick={() => {
								setBookId(item.id);
								setBookName(item.name);
								setAuthor(item.author);
								setPublisher(item.publisher);
								setEdition(item.edition);
								setIsbn(item.isbn);
								showModal();
							}}>Issue</a>
							:
							<a style={{ cursor: 'not-allowed', opacity: '0.6', marginLeft: '4px' }}>Issue</a>
						}
					</td>
				</tr>
			);
		});
	} else {
		itemList = (
			<tr key="nodata">
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
							loading={loading}
						/>
					</div>
				</td>
			</tr>
		);
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
										<th className="" style={{ width: '20vw' }}>Name</th>
										<th className="">ISBN</th>
										<th className="">Author</th>
										<th className="">Edition</th>
										<th className="">Publisher</th>
										<th className="">Avl.Copies</th>
										<th className="">Stack</th>
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
			<dialog id="issueBook" className="dialogBox" onClick={hideModal} style={{ width: '50vw' }}>
				<div className="dialogTitle" onClick={preventHide}>
					Issue Book
					<button onClick={hideModal}>X</button>
				</div>
				{!found || !search ?
					<div className="dialogBody" onClick={preventHide} >
						<div style={{ width: wid }}>
							<label>Search Student</label>
							<input onChange={searchStudent} name="search" placeholder="Search by Roll or Name" value={search} />
						</div>
					</div>
					:
					<div className="dialogBody" onClick={preventHide} >
						<div style={{ width: wid }}>
							<label>Search Student</label>
							<input onChange={searchStudent} name="search" placeholder="Search by Roll or Name" value={search} />
						</div>
						<div style={{ width: wid }}>
							<label>Name</label>
							<input name="name" placeholder="Name" value={name} />
						</div>
						<div style={{ width: wid }}>
							<label>Roll</label>
							<input name="roll" placeholder="Roll" value={roll} />
						</div>
						<div style={{ width: wid }}>
							<label>Branch</label>
							<input name="branch" placeholder="Branch" value={branch} />
						</div>
						<div style={{ width: wid }}>
							<label>Year</label>
							<input name="year" placeholder="Year" value={year} />
						</div>
						<div style={{ width: wid }}>
							<label>Phone</label>
							<input name="phone" placeholder="Phone" value={phone} />
						</div>
						<div style={{ width: wid }}>
							<label>Issued Books</label>
							<input name="issued" placeholder="None" defaultValue={issued} />
						</div>
						<div style={{ width: wid }}>
							<label>Recommended To Return By :</label>
							<input name="recommend" placeholder="None" value={moment().add(14, 'days').format('MMM DD, YYYY')} />
						</div>
					</div>
				}
				<div className="dialogFooter" onClick={preventHide}>
					<button onClick={issue} disabled={!found || !search || (issued >= 3)}>Issue</button>
					<button onClick={hideModal}>Cancel</button>
				</div>
			</dialog>
		</div>
	);
};

export default List;
