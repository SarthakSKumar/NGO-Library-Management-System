import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logoGrey from '../common/images/logoGray.png';
import logOut from '../common/images/logout.png';

export default class NavBar extends React.Component {
	render() {

		return (
			<div id="navBar">
				<ul style={{ height: '100%' }}>
					<li className="logo" style={{ margin: '0px 0px 0px 0px', padding: '0px 0px 0px 0px' }}>
						<Link to="/" draggable="false" >
							<img className="navIcon" src={logoGrey} alt="logo" draggable="false" style={{ height: '55px', marginTop: '2px', marginLeft: '3px' }} />
						</Link>
					</li>
					<li className="navItem logout" style={{ marginTop: '10px' }} >
						<Link to="/login" draggable="false" style={{ fontSize: '20px' }} onClick={() => this.props.updateRoutes(false)}>
							Logout <img src={logOut} style={{ height: '15px', paddingTop: '14px' }} />
						</Link>
					</li>
				</ul>
			</div>
		)
	}
}