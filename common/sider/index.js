import React,{ Component } from 'react';

import { Layout, Menu, Icon } from 'antd';

import { NavLink } from 'react-router-dom';

import './index.css';

const { Sider } = Layout;

class Side extends Component{
	render(){
		return(
			<div className='Sider'>
		      <Sider width={200} style={{ background: '#fff' }}>
		        <Menu
		          mode="inline"
		          style={{ minHeight:680 , borderRight: 0 }}
		        >
		            <Menu.Item key="1">
		            	<NavLink exact to="/"><Icon type="home" />首页</NavLink>
		            </Menu.Item>
		            <Menu.Item key="2">
		            	<NavLink to="/user"><Icon type="user" />用户列表</NavLink>
		            </Menu.Item>
		            <Menu.Item key="3">
		            	<NavLink to="/category"><Icon type="bars" />分类管理</NavLink>
		            </Menu.Item>
		            <Menu.Item key="4">
		            	<NavLink to="/product"><Icon type="book" />商品管理</NavLink>
		            </Menu.Item>
		        </Menu>
		      </Sider>
			</div>
		)
	}

}

export default Side;