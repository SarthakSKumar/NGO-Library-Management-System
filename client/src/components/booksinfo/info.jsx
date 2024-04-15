import React from 'react';


export default class BooksInfo extends React.Component {


	constructor() {
		super();
		this.state = {
			id: null,
			book: null
		};

	}



	render() {

		let { book } = this.props;


		return (

			<div className="thisBlock halfBlock">

				<div className="blockTitle">
					Book Info

				</div>



				<div className="blockBody custom">
					<div className="infoDisplay"><label>Name</label><label>{book.name || '-'}</label></div>
					<div className="infoDisplay"><label>ISBN</label><label>{book.isbn || '-'}</label></div>
					<div className="infoDisplay"><label>Author</label><label>{book.author || '-'}</label></div>
					<div className="infoDisplay"><label>Publisher</label><label>{book.publisher || '-'}</label></div>
					<div className="infoDisplay"><label>Edition</label><label>{book.edition || '-'}</label></div>
					<div className="infoDisplay"><label>Copyright Year</label><label>{book.copyrightyear || '-'}</label></div>
					<div className="infoDisplay"><label>Print Year</label><label>{book.printyear || '-'}</label></div>
					<div className="infoDisplay"><label>Volume</label><label>{book.volume || '-'}</label></div>
					<div className="infoDisplay"><label>Stack No.</label><label>{book.stackno || '-'}</label></div>
					<div className="infoDisplay"><label>Accession No.</label><label>{book.accessionno || '-'}</label></div>
					<div className="infoDisplay"><label>Pages</label><label>{book.pages || '-'}</label></div>
					<div className="infoDisplay"><label>Total Copies</label><label>{book.totalcopies || '-'}</label></div>
					<div className="infoDisplay"><label>Available Copies</label><label>{book.availablecopies || '-'}</label></div>
					<div className="infoDisplay"><label>Type</label><label>{book.type || '-'}</label></div>
					<div className="infoDisplay"><label>Price</label><label>{book.price || '-'}</label></div>
					<div className="infoDisplay"><label>Additionals</label><label>{book.additionals || '-'}</label></div>
					<div className="infoDisplay"><label>UID</label><label>{book.id || '-'}</label></div>
					<div className="infoDisplay"><label>Issued Copies</label><label>{(book.totalcopies - book.availablecopies) || '-'}</label></div>

				</div>




			</div>




		)




	}










}//class closed 