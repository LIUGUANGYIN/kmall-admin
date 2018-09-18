import React,{ Component } from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';

import { Breadcrumb,Button,Table,Divider,InputNumber,Modal,Input } from 'antd';
import { actionCreator } from './store'
import Layout from 'common/layout/layout.js'

class CategoryList extends Component{
	constructor(props){
		super(props);
		this.state = {
			pid:this.props.match.params.pid || 0
		}
	}
	componentDidMount(){
		//第一个参数是父级ID,第二个参数是页码
		this.props.handlePage(this.state.pid,1);
	}

	componentDidUpdate(preProps,preState){
		let oldPath = preProps.location.pathname;
		let newPath = this.props.location.pathname;
		if(oldPath != newPath){
			let newPid = this.props.match.params.pid || 0;
			this.setState({
				pid:newPid
			},()=>{
				this.props.handlePage(newPid,1);
			})
		}
	}

	render(){
		const pid = this.state.pid;
		const columns = [
			{
			  title: 'id',
			  dataIndex: 'id',
			  key: 'id',
			}, 
			{
			  title: '分类名称',
			  dataIndex: 'name',
			  key: 'name',
			},
			{
			  title: '排序',
			  dataIndex: 'order',
			  key: 'order',
			  render:(order,record)=>{
			  	return <InputNumber 
			  	defaultValue={order}
			  	onBlur={(e)=>{
			  		this.props.handeorder(pid,record.id,e.target.value)
			  	}}
			  	/>
			  }
			},
			{
				title: '操作',
				key: 'action',
				render: (text, record) => (
					<span>
					  <a href="javascript:;"
					  	onClick={()=>{
					  		this.props.showUpdateModal(record.id,record.name)
					  	}}
					  >
					  	更新名称
					  </a>
					  {
					  	record.pid == 0
					  	? (<span>
					  		 <Divider type="vertical" />
					  		 <Link to={"/category/"+record.id} >查看子分类</Link>
					  		</span> )
					  	: null
					  }
					 
					</span>
				),
			} 	 		 	
		];		
		const data  = this.props.list.map((category)=>{
			return {
				key:category.get('_id'),
				id:category.get('_id'),
				name:category.get('name'),
				order:category.get('order'),
				pid:category.get('pid'),
			}
		}).toJS();		
		return(
			<Layout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>分类管理</Breadcrumb.Item>
						<Breadcrumb.Item>分类列表</Breadcrumb.Item>
					</Breadcrumb>
					<div style={{marginTop:10}} className="clearfix">
						<h4 style={{ float:'left'}}>父类ID:{pid}</h4>
						<Link to="/category/add" style={{ float:'right'}}>
							<Button type="primary">新增分类</Button>
						</Link>
					</div>
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
						onChange = {(pagination)=>{
							this.props.handlePage(pid,pagination.current)
						}}
						loading={
							{
								spinning:this.props.isPageFetching,
								tip:'正在请求数据'
							}
						}
					/>
					<Modal
						title="修改分类名称"
						visible={this.props.updateModalVisible}
						onOk={()=>{this.props.handleUpdateName(pid)}}
						onCancel={this.props.handleCancelName}
						canaelText="取消"
						okText="确定"
					>
					<Input 
					    value={this.props.updateName}
					    onChange={(e)=>{
					    	this.props.handleChangeName(e.target.value)
					    }} 
					/>
					</Modal>										
					
				</div>
			</Layout>
		)
	}

}

const mapStateToProps = (state)=>{
	return {
		isPageFetching:state.get('category').get('isPageFetching'),
		current:state.get('category').get('current'),
		total:state.get('category').get('total'),
		pageSize:state.get('category').get('pageSize'),
		list:state.get('category').get('list'),		
		updateModalVisible:state.get('category').get('updateModalVisible'),		
		updateId:state.get('category').get('updateId'),		
		updateName:state.get('category').get('updateName'),		
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		handlePage:(pid,page)=>{
			dispatch(actionCreator.getPageAction(pid,page));
		},
		showUpdateModal:(updateId,updateName)=>{
			dispatch(actionCreator.getShowUpdateModalAction(updateId,updateName));
		},
		handleChangeName:(newname)=>{
			dispatch(actionCreator.getChangeNameAction(newname));
		},
		handleUpdateName:(pid)=>{
			dispatch(actionCreator.getUpdateNameAction(pid));
		},
		handleCancelName:()=>{
			dispatch(actionCreator.getCloseUpdateModalAction());
		},
		handeorder:(pid,id,neworder)=>{
			dispatch(actionCreator.getUpdateModalOrderAction(pid,id,neworder));
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);