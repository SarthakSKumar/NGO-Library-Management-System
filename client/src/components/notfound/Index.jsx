import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import not from '../common/images/404.png';
import linkIcon from '../common/images/linkIcon.png'
export default class notFound extends React.Component {


	constructor(props) {
		super(props);



	}




	render() {





		return (

			<div className="pageView" >
				<div className="pageRow" style={{ alignContent: 'center', textAlign: 'center' }} >
					<div style={{ border: '2px solid #dfdfdf', borderRadius: '12px', display: 'flex' }}>
						<img src={not} />
						<div style={{ margin: '15px' }}>
							<div style={{ fontSize: '40px', fontWeight: '1000', color: '#707070' }}>Hey..Don't worry!!You Just Managed to Mistype The Address..</div>
							<div style={{ fontSize: '39px', fontWeight: '800', color: '#e59400', marginTop: '10px' }}>Did you mean any of these..?</div>
							<div style={{ marginTop: '5vh', marginLeft: '10vw', cursor: 'pointer' }}>
								<div style={{ display: 'flex' }}>
									<Link to={"/home"} className="reflinks"><div style={{ fontSize: '40px', color: '#0099cc' }} className="reflinks"><img src={linkIcon} style={{ height: '24px' }} />Home</div></Link>
									<Link to={"/books"} className="reflinks"><div style={{ fontSize: '40px', color: '#0099cc', marginLeft: '2vw' }} className="reflinks"><img src={linkIcon} style={{ height: '24px' }} />Books</div></Link>
								</div>
								<div style={{ display: 'flex' }}>
									<Link to={"/return"} className="reflinks"><div style={{ fontSize: '40px', color: '#0099cc' }} className="reflinks"><img src={linkIcon} style={{ height: '24px' }} />Return</div></Link>
									<Link to={"/students"} className="reflinks"><div style={{ fontSize: '40px', color: '#0099cc', marginLeft: '1vw' }} className="reflinks"><img src={linkIcon} style={{ height: '24px' }} /> Students</div></Link>
								</div>
								<Link to={"/login"} className="reflinks log"><div style={{ fontSize: '37px', marginLeft: '0px !important' }} className="reflinks"><img src={linkIcon} style={{ height: '24px' }} />Login</div></Link>
							</div>
						</div>
					</div>
				</div>
			</div>

		)
	}
}


