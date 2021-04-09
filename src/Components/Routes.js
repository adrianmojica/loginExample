import React from "react";
import {Route, Switch} from "react-router-dom";
import Login from "./Login";
import Home from "./Home";


function Routes(){
	return (
		<Switch>
			<Route exact path="/"><Login/></Route>
			<Route exact path="/Home"><Home/></Route>
		</Switch>
	);
}

export default Routes;