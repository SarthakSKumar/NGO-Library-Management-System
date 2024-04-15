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
		if(fieldName === 'search'){
			this.setState({searchDevice:fieldValue});
			this.props.searchbook(fieldValue);
			
		}

	
         
	};




        
	render(){
		


		

		return(
			<div className="pageRow filters">
				<div className="thisBlock">
					<div className="blockTitle"><t style={{marginLeft:'10px'}}>Book List</t>
						
						
                        <input type="text" className="searchInput" style={{width:'300px',cursor:'text'}} placeholder="Search by Book Info Or Student Info" value={this.state.searchDevice} autoComplete="off" name="search" onChange={this.updateInfo}/>

									

					</div>
					</div>
			</div>
		)
	}
}