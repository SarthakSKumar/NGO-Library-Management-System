import React from 'react';

import { toast } from 'react-toastify';	
export default class Filters extends React.Component {

/*eslint-disable no-unused-expressions */
	constructor(){
		super();
		this.state = {
			bookList:[],
			searchStudent:'',
			name:'',
			phone:'',
			year:'',
			branch:'',
			roll:''
			

		};
		
	}


	
	add=()=>{
		let {name,roll,phone,year,branch}=this.state;

		this.props.addStudent(name,roll,phone,year,branch);
		
		Filters.hideModal();
		this.setState({name:'',phone:'',roll:'',year:'',branch:''},function(){this.props.fetchStudents();})


	}



	updateInfo = (event) =>{
		let fieldName = event.target.name;
		let fieldValue = event.target.value;
		if(fieldName === 'name') {
			this.setState({name: fieldValue});
		}
		else if(fieldName === 'roll'){
			this.setState({roll:fieldValue});
		}
		else if(fieldName === 'year'){
			this.setState({year:fieldValue});
			
		}
		else if(fieldName === 'phone'){
			this.setState({phone:fieldValue});
			
		}
		else if(fieldName === 'branch'){
			this.setState({branch:fieldValue});
			
		}
		else if(fieldName === 'search'){
			this.setState({searchStudent:fieldValue});
			this.props.searchbook(fieldValue);
			
		}

	
         
	};

	static showModal(){
		document.getElementById("addStudent").showModal();
	}
	static hideModal(){
		document.getElementById("addStudent").close();
	}
	
	static preventHide(e){
		e.stopPropagation();
	}


        
	render(){
		
let cList,uList,aList;
let wid='15vw';
		

		return(
			<div className="pageRow filters">
				<div className="thisBlock">
					<div className="blockTitle"><t style={{marginLeft:'10px'}}>Student List</t>
						<button className="addBtn" onClick={Filters.showModal}>Add</button>
						<label className="addBtnIcon" onClick={Filters.showModal}>+</label>
                        <input type="text" className="searchInput" style={{width:'300px',cursor:'text'}} placeholder="Search by Name,roll,branch,year" value={this.state.searchStudent} autoComplete="off" name="search" onChange={this.updateInfo}/>

									<dialog id="addStudent" className="dialogBox" onClick={Filters.hideModal} >
										<div className="dialogTitle" onClick={Filters.preventHide}>
											Add New Student
											<button onClick={Filters.hideModal}>X</button>
										</div>
										<div className="dialogBody" onClick={Filters.preventHide} >
											<div style={{width:wid}}>
												<label>Name</label>
												<input onChange={this.updateInfo} name="name" value={this.state.name}/>
											</div>
											<div style={{width:wid}}>
												<label>Roll</label>
												<input onChange={this.updateInfo} name="roll" value={this.state.roll}/>
											</div>
											<div style={{width:wid}}>
												<label>Phone</label>
												<input onChange={this.updateInfo} name="phone" value={this.state.phone}/>
											</div>
											<div style={{width:wid}}>
												<label>Year</label>
												<input onChange={this.updateInfo} name="year" value={this.state.year}/>
											</div>
											<div style={{width:wid}}>
												<label>Branch</label>
												<input onChange={this.updateInfo} name="branch" value={this.state.branch}/>
											</div>
											
											
											
										</div>
										<div className="dialogFooter" onClick={Filters.preventHide}>
											<button onClick={this.add} disabled={!this.state.name||!this.state.roll}>Save</button>
											<button onClick={Filters.hideModal}>Cancel</button>
										</div>
									</dialog>

					</div>
					</div>
			</div>
		)
	}
}