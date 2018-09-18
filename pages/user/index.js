import React,{ Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { actionCreator } from './store';
import Layout from 'common/layout/layout.js';
const columns = [
	{
	  title: '用户名',
	  dataIndex: 'username',
	  key: 'username',
	}, 
	{
	  title: '是否是管理员',
	  dataIndex: 'isAdmin',
	  key:'isAdmin',
	  render:isAdmin=>(isAdmin ? '是' : '否')
	},
	{
		title:'邮箱',
		dataIndex:'email',
		key:'email',
	},
	{
		title:'手机',
		dataIndex:'phone',
		key:'phone',
	},
	{
		title:'注册时间',
		dataIndex:'createdAt',
		key:'createdAt',
	},
];

const dataSource = [{
  key: '1',
  username: 'admin',
  isAdmin:true,
}, {
  key: '2',
  username: 'test1',
  isAdmin:false,
}];


class User extends Component{

	componentDidMount(){
		this.props.handlePage(1)
	}

	render(){

		const data=this.props.list.map((user)=>{
			return{
				key:user.get('_id'),
				username:user.get('username'),
				isAdmin:user.get('isAdmin'),
				phone:user.get('phone'),
				email:user.get('email'),
				createdAt:user.get('createdAt')
				// createdAt:moment(user.get('createdAt').format('YYYY-MM-DD HH:mm:ss'))
			}
		}).toJS();
		
		return(
			<div>
				<Layout>
					<Table 
						dataSource={data} 
						columns={columns}
						pagination={
							{ 
								current:this.props.current,
								defaultCurrent:this.props.current,
								total:this.props.total,
								pageSize:this.props.pageSize
							}
						}
						onChange={(pagination)=>{
							this.props.handlePage(pagination.current)
						}}
						loading={
							{
							spinning:this.props.isFetching,
							tip:'zhengzai'
							}
						}
					/>
				</Layout>
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
  return{
    isFetching:state.get('user').get('isFetching'),
		current:state.get('user').get('current'),
		total:state.get('user').get('total'),
		pageSize:state.get('user').get('pageSize'),
		list:state.get('user').get('list')
  }
}

const mapDisPatchToProps=(dispatch)=>{
  return{
    handlePage:(page)=>{
      dispatch(actionCreator.getPageAction(page));
    }
  }
}

export default connect(mapStateToProps,mapDisPatchToProps)(User);