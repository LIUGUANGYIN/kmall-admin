import React,{Component} from 'react';

import Login from 'pages/login';
import Home from 'pages/home';
import User from 'pages/user';
import Category from 'pages/category';
import Product from 'pages/product/index.js';
import ErrorPages from 'common/error-pages';

import { getUserName } from 'util'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

class App extends Component{
	render(){

		const ProtectedRoute = ({component:Component,...rest})=>(
			<Route 
				{...rest}
				render = {props=>(
					getUserName()
					? <Component {...props} />
					: <Redirect to="/login" />
				)}
			/>
		)
		const LoginRoute =({component:Component,...rest})=>{
			if(getUserName()){
				return <Redirect to="/" />
			}else{
				return <Route {...rest} component={Component} />
			}
		}
			
		return(
			<Router forceRefresh={true}>			
				<div className="App">
					<Switch>
						<ProtectedRoute exact path="/" component={ Home } />				
						<ProtectedRoute path="/user" component={ User } />				
						<ProtectedRoute path="/category" component={ Category } />				
						<ProtectedRoute path="/product" component={ Product } />				
						<LoginRoute path="/login" component={ Login } />
						<Route component={ ErrorPages } />
					</Switch>
				</div>
			</Router>	
		)
	}
}
export default App;