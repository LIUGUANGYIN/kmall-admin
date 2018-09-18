import React,{ Component } from 'react';
import { request,getUserName,removeUserName } from 'util';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import { USER_LOGOUT } from 'api'
import './index.css';

const { Header } = Layout;

class MyHeader extends Component{
	constructor(props){
	    super(props);
	    this.handleLogout=this.handleLogout.bind(this);
    }

    handleLogout(){
    	request({
    		url: USER_LOGOUT,
    	})
    	.then((result)=>{
    		removeUserName()
    		window.location.href='/login'
    	})
    }
	render(){
		const menu = (
		    <Menu onClick={this.handleLogout}>
			    <Menu.Item ><Icon type="logout" />退出
			    </Menu.Item>
		    </Menu>
		);

		return(
			<div className="header">
			    <Header className="header"> 
		            <div className="logo" >KMALL</div>
		            <Dropdown overlay={menu} trigger={['click']}>
					    <a className="ant-dropdown-link" href="#">
					      { getUserName() } <Icon type="down" />
					    </a>
					</Dropdown>
		        </Header>
			</div>
		)
	}

}


export default MyHeader;