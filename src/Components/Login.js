import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import './Styles/Login.scss';
import Logo from './Assets/Login.jpg'

function Login(props){

	const [ state, setState ]= useState({
		username: "",
		password:""
	});

	const [token, setToken ] = useState();
	const [error, setError ] = useState("");

	useEffect(() => {
    const getToken = async () => {
        try {
            let mounted = true;
            if(mounted){
              let token = getCookie('token');
				setToken(token);
            }
        } catch (err) {
        
        }
    }
    getToken();
	},[]);


	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	

	function handleChange(evt){
		const value = evt.target.value;
		setState({
			...state,
			[evt.target.name]: value
		});
	}

	async function submitForm(evt){
		evt.preventDefault();
		let req = {
			username: state.username,
			password: state.password
		}
		try{
			const resp = await axios.post('https://services.adaptr.com/demo/login', req);
			console.log(resp);
			if(resp.data.success && resp.data.token !== '' ){
				setToken(resp.data.token);
				document.cookie="username="+state.username;
				document.cookie="token="+resp.data.token;
			} else if (resp.data.success !== true && resp.data.error) {
				console.log(resp.data.error.message);
				setError(resp.data.error.message);
			}
			// TODO: check token, save into cookie and validate
		}catch(error){
			console.log(error);
		}
	
	} 
	
	if (token) {
		return <Redirect to='/Home' />
	}
	
	let classn='hidden';
	if(error !== ""){
		classn= 'show';
	}

	return (
		<>
		<div className="col">

		</div>
		<div className="col">
			<div className="card loginCard" >
				<img src={Logo} className="card-img-top" alt="..."/>
				<div className="card-body">
					<h5 className="card-title">Login</h5>
					<p className="card-text"></p>
					<form>
						<div className="form-group">
							<label htmlFor="username">Email address</label>
							<input onChange={handleChange} type="email" name="username" className="form-control" id="username" aria-describedby="email"/>
							
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input onChange={handleChange} type="password" name="password" className="form-control" id="password"/>
						</div>
						<div className={'alert alert-danger '+classn} role="alert">
							{error}
						</div>
						<button onClick={submitForm} type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		</div>
		
		<div className="col">

		</div>
		</>
	);
}

export default Login;