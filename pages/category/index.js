import React,{ Component } from 'react';

import { Route,Switch} from 'react-router-dom';
import categoryList from './list.js';
import categoryAdd from './add.js';

class Category extends Component{
	render(){
		return(
			<Switch>
				<Route path="/category/add" component={ categoryAdd } />
				<Route path="/category/:pid?" component={ categoryList } />
			</Switch>
		)
	}
}
export default Category;