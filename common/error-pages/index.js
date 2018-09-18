import React,{ Component } from 'react';
import { Alert } from 'antd';
import { Link } from 'react-router-dom';
class Error extends Component{
	render(){
    	return(
			<div className="error">
			 <Alert message="页面走丢啦" type="error" showIcon />
			 <Link to='/'>返回首页</Link>
			</div>
		)
	}
}
export default Error;