import React from 'react';
import './style.css'
import { toast } from 'react-toastify';	
export default class Filters extends React.Component {

/*eslint-disable no-unused-expressions */
	constructor(){
		super();
		this.state = {
			bookList:[],
			search:'',
			
			
			

		};
		
	}


	
	



	updateInfo = (event) =>{
		let fieldName = event.target.name;
		let fieldValue = event.target.value;
		if(fieldName === 'bookname') {
			this.setState({bookname: fieldValue});
		}
		else if(fieldName === 'author'){
			this.setState({author:fieldValue});
		}
		else if(fieldName === 'isbn'){
			this.setState({isbn:fieldValue});
			
		}else if(fieldName === 'publisher'){
			this.setState({publisher:fieldValue});
			
		}else if(fieldName === 'copyrightyear'){
			this.setState({copyrightyear:fieldValue});
			
		}else if(fieldName === 'edition'){
			this.setState({edition:fieldValue});
			
		}else if(fieldName === 'printyear'){
			this.setState({printyear:fieldValue});
			
		}else if(fieldName === 'stackno'){
			this.setState({stackno:fieldValue});
			
		}else if(fieldName === 'volume'){
			this.setState({volume:fieldValue});
			
		}else if(fieldName === 'accessionno'){
			this.setState({accessionno:fieldValue});
			
		}else if(fieldName === 'pages'){
			this.setState({pages:fieldValue});
			
		}else if(fieldName === 'totalcopies'){
			this.setState({totalcopies:fieldValue});
			
		}else if(fieldName === 'availablecopies'){
			this.setState({availablecopies:fieldValue});
			
		}else if(fieldName === 'type'){
			this.setState({type:fieldValue});
			
		}else if(fieldName === 'price'){
			this.setState({price:fieldValue});
			
		}else if(fieldName === 'additionals'){
			this.setState({additionals:fieldValue});
			
		}
		else if(fieldName === 'search'){
			this.setState({searchDevice:fieldValue});
			this.props.searchbook(fieldValue);
			
		}

	
         
	};


	add=(e)=>{

		let {bookname,isbn,author,publisher,copyrightyear,edition,printyear,stackno,volume,accessionno,pages,totalcopies,type,price,additionals}=this.state;
		this.props.addBook(bookname,isbn,author,publisher,copyrightyear,edition,printyear,stackno,volume,accessionno,pages,totalcopies,totalcopies,type,price,additionals);
		Filters.hideModal();

		this.props.fetchBooks();
		this.setState({bookname:'',isbn:'',author:'',publisher:'',copyrightyear:'',edition:'',printyear:'',stackno:'',volume:'',accessionno:'',pages:'',totalcopies:'',availablecopies:'',type:'',price:'',additionals:''})

	}

	static showModal(){
		document.getElementById("addBook").showModal();
	}
	static hideModal(){
		document.getElementById("addBook").close();
	}
	
	static preventHide(e){
		e.stopPropagation();
	}


        
	render(){
		
let cList,uList,aList;
let wid='20vw';

		

		return(
			<div className="pageRow filters">
				<div className="thisBlock">
					<div className="blockTitle"><t style={{marginLeft:'10px'}}>Book List</t>
						<button className="addBtn" onClick={Filters.showModal}>Add</button>
						<label className="addBtnIcon" onClick={Filters.showModal}>+</label>
                        <input type="text" className="searchInput" style={{width:'300px',cursor:'text'}} placeholder="Search by Name,ISBN,Author,Publisher" value={this.state.searchDevice} autoComplete="off" name="search" onChange={this.updateInfo}/>

									<dialog id="addBook" className="dialogBox" onClick={Filters.hideModal} style={{width:'70vw'}}>
										<div className="dialogTitle" onClick={Filters.preventHide}>
											Add New Book
											<button onClick={Filters.hideModal}>X</button>
										</div>
										<div className="dialogBody" onClick={Filters.preventHide} >
											<div style={{width:wid}}>
												<label>Name*</label>
												<input onChange={this.updateInfo} name="bookname" value={this.state.bookname}/>
											</div>
											<div style={{width:wid}}>
												<label >ISBN</label>
												<input onChange={this.updateInfo} name="isbn" value={this.state.isbn}/>
											</div>
											<div style={{width:wid}}>
												<label>Author*</label>
												<input onChange={this.updateInfo} name="author" value={this.state.author}/>
											</div>
											<div style={{width:wid}}>
												<label>Publisher</label>
												<input onChange={this.updateInfo} name="publisher" value={this.state.publisher}/>
											</div>
											<div style={{width:wid}}>
												<label>Copyright Year</label>
												<input onChange={this.updateInfo} name="copyrightyear" value={this.state.copyrightyear}/>
											</div>
											<div style={{width:wid}}>
												<label>Edition</label>
												<input onChange={this.updateInfo} name="edition" value={this.state.edition}/>
											</div>
											<div style={{width:wid}}>
												<label>Print Year</label>
												<input onChange={this.updateInfo} name="printyear" value={this.state.printyear}/>
											</div>
											<div style={{width:wid}}>
												<label>Stack No.</label>
												<input onChange={this.updateInfo} name="stackno" value={this.state.stackno}/>
											</div>
											<div style={{width:wid}}>
												<label>Volume</label>
												<input onChange={this.updateInfo} name="volume" value={this.state.volume}/>
											</div>
											<div style={{width:wid}}>
												<label>Accession Number</label>
												<input onChange={this.updateInfo} name="accessionno" value={this.state.accessionno}/>
											</div>
											<div style={{width:wid}}>
												<label>Pages</label>
												<input onChange={this.updateInfo} name="pages" value={this.state.pages}/>
											</div>
											<div style={{width:wid}}>
												<label>Total Copies*</label>
												<input onChange={this.updateInfo} name="totalcopies" value={this.state.totalcopies}/>
											</div>
											
											<div style={{width:wid}}>
												<label>Type</label>
												<input onChange={this.updateInfo} name="type" value={this.state.type}/>
											</div>
											<div style={{width:wid}}>
												<label>Price</label>
												<input onChange={this.updateInfo} name="price" value={this.state.price}/>
											</div>
											<div style={{width:wid}}>
												<label>Additionals</label>
												<input onChange={this.updateInfo} name="additionals" value={this.state.additionals}/>
											</div>
											
											
											
										</div>
										<div className="dialogFooter" onClick={Filters.preventHide}>
											<button onClick={this.add} disabled={!this.state.bookname || !this.state.author||!this.state.totalcopies}>Add</button>
											<button onClick={Filters.hideModal}>Cancel</button>
										</div>
									</dialog>

					</div>
					</div>
			</div>
		)
	}
}
