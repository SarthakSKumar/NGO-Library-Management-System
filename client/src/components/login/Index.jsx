import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import logoDark from '../common/images/logoDark.png';

const LoginIndex = ({ updateRoutes }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [f1, setF1] = useState('');
	const [f2, setF2] = useState('');
	const navigate = useNavigate();

	const handleSubmit = e => {
		e.preventDefault();
		if (email === `${import.meta.env.VITE_LOGIN_EMAIL}`) setF1(''); else setF1('Invalid Email');
		if (password === `${import.meta.env.VITE_LOGIN_PASSWORD}`) setF2(''); else setF2('Invalid Password');

		if (email === `${import.meta.env.VITE_LOGIN_EMAIL}` && password === `${import.meta.env.VITE_LOGIN_PASSWORD}`) {
			updateRoutes(true);
			navigate('/home');
		}
	};

	return (
		<div>
			<div className="login_home">
				<img id="logo" src={logoDark} alt="IIIT Trichy" title="IIIT Trichy" style={{ height: '60px' }} />
				<div id="loginBox">
					<span id="loginTitle">Sign In</span>
					<form name="loginForm" onSubmit={handleSubmit}>
						<div className="inputRow">
							<label htmlFor="email" className="loginLabel">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								className={f1 ? "loginInput showError" : "loginInput"}
								placeholder="Enter Login ID"
								autoCorrect="off"
								autoCapitalize="off"
								size="30"
								value={email}
								onChange={e => setEmail(e.target.value)}
								spellCheck="false"
							/>
						</div>
						<div className="errorMsg">
							{f1 && <span>{f1}</span>}
						</div>
						<div className="inputRow">
							<label htmlFor="password" className="loginLabel">Password</label>
							<input
								type="password"
								name="password"
								className={f2 ? "loginInput showError" : "loginInput"}
								id="password"
								placeholder="*****"
								autoCorrect="off"
								autoComplete="off"
								autoCapitalize="off"
								spellCheck="false"
								size="30"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
						<div className="errorMsg">
							{f2 && <span>{f2}</span>}
						</div>
						<div className="inputRow">
							<input
								type="submit"
								id="loginBtn"
								value="Login"
								formNoValidate
								disabled={email && password ? null : "true"}
							/>
						</div>
					</form>
				</div>
				<a
					id="copyright"
					href="http://www.iiitt.ac.in/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<i className="glyphicon glyphicon-copyright-mark"> </i> IIIT Trichy
				</a>
			</div>
		</div>
	);
};

export default LoginIndex;
