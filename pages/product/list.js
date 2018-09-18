import React,{ Component } from 'react';
import { Link} from 'react-router-dom';
import { Breadcrumb,Button,Table,Divider,InputNumber,Modal,Input,Switch } from 'antd';
import { actionCreator } from './store'
import Layout from 'common/layout/layout.js'
import { connect } from 'react-redux';
class ProductList extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.props.handlePage(1);
	}

	render(){
		const columns = [
			{
			  title: 'id',
			  dataIndex: 'id',
			  key: 'id',
			}, 
			{
			  title: '商品名称',
			  dataIndex: 'name',
			  key: 'name',
			},
			{
			  title: '状态',
			  dataIndex: 'status',
			  key: 'status',
			  render:(status,record)=>{
			  	return(
			  		<span>
			  			<Switch
			  				checkedChildren="在售" 
			  				unCheckedChildren="下架"
			  				defaultChecked={record.status == '0' ? true : false}
			  				onChange={(checked)=>{
			  					this.props.handleStatus(record.id, checked ? 0 : 1 )
			  				}}
			  			/>
			  		</span>
			  	)
			  }
			},
			{
			  title: '排序',
			  dataIndex: 'order',
			  key: 'order',
			  render:(order,record)=>{
			  	return <InputNumber 
			  	defaultValue={order}
			  	onBlur={(e)=>{
			  		this.props.handleOrder(record.id,e.target.value)
			  	}}
			  	/>
			  }
			},
			{
				title: '操作',
				key: 'action',
				render: (text, record) => (
				    <span>
						<Link to={"/product/save/"+record.id}>
						  	编辑
						</Link>
						<Divider type="vertical" />
						<Link to={"/product/detail/"+record.id}>
						  	查看
						</Link>
					</span>
				),
			} 	 		 	
		];		
		const data  = this.props.list.map((product)=>{
			return {
				key:product.get('_id'),
				id:product.get('_id'),
				name:product.get('name'),
				order:product.get('order'),
				status:product.get('status'),

			}
		}).toJS();			
		return(
			<Layout>
				<div>
				    <Breadcrumb>
						<Breadcrumb.Item>商品管理</Breadcrumb.Item>
						<Breadcrumb.Item>商品列表</Breadcrumb.Item>
					</Breadcrumb>
					<div style={{marginTop:10}} className="clearfix">
					<Link to="/product/save" style={{ float:'right'}}>
						<Button type="primary">新增商品</Button>
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
							this.props.handlePage(pagination.current)
						}}
						loading={
							{
								spinning:this.props.isPageFetching,
								tip:'正在请求数据'
							}
						}
					/>
				</div>
			</Layout>
		)
	}
}

const mapStateToProps = (state)=>{
	return {
		isPageFetching:state.get('product').get('isPageFetching'),
		current:state.get('product').get('current'),
		total:state.get('product').get('total'),
		pageSize:state.get('product').get('pageSize'),
		list:state.get('product').get('list'),	
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		handlePage:(page)=>{
			dispatch(actionCreator.getProductAction(page));
		},
		handleOrder:(id,newOrder)=>{
			dispatch(actionCreator.getUpdateOrderAction(id,newOrder));
		},
		handleStatus:(id,newStatus)=>{
			dispatch(actionCreator.getUpdateStatusAction(id,newStatus));
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductList);