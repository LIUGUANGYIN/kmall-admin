import React,{ Component } from 'react';

import { Route,Switch} from 'react-router-dom';
import productList from './list.js';
import productSave from './save.js';
import productDetail from './detail.js';

class Product extends Component{
	render(){
		return(
			<Switch>
				<Route path="/product/save/:productId?" component={ productSave } />
				<Route path="/product/detail/:productId?" component={  productDetail } />
				<Route path="/product" component={ productList } />
			</Switch>
		)
	}
}
export default Product;