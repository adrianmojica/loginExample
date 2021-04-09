import React, { useState, useEffect } from 'react';
import  { Redirect, useHistory } from 'react-router-dom'
import Logo from './Assets/Login.jpg';

function Home(props){


	const [ data, setData ] = useState({
		username: "",
		token: ""
	});


	useEffect(() => {
    const getToken = async () => {
        try {
            let mounted = true;
            if(mounted){
              let token = getCookie('token');
							let user = getCookie('username');
							setData({
								username: user,
								token: token
							});
							if(data.token === ""){
								redirectHome();
							}
            }
        } catch (err) {
        
        }
    }
    getToken();
	},[data.token]);


	function redirectHome(){
		console.log('here');
		if(data.token === ""){
			return <Redirect to='/' />
		}
	}

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





	return (
		<>
		<div className="col">
		</div>
		<div className="col">
				<div className="card loginCard" >
						<img src={Logo} className="card-img-top" alt="..."/>
						<div className="card-body">
								<h5 className="card-title">Welcome {data.username} !</h5>
								
							
						</div>
				</div>
		</div>

		<div className="col">

		</div>
		</>
	);
}

export default Home;