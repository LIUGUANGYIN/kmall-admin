import React,{ Component } from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';

import Layout from 'common/layout/layout.js';

import { actionCreator } from './store';
import './index.css'

class Home extends Component{

	componentDidMount(){
		this.props.handleCount()
	}
	render(){
		return(
			<div className="Home">
			    <Layout>
			        <div className="card" tigger={this.handleCount}>
				    	<Card title="用户数" hoverable={true}>
					      <p>{this.props.usernum}</p>
					    </Card>
					    <Card title="订单数" hoverable={true}>
					      <p>{this.props.ordernum}</p>
					    </Card>
					    <Card title="商品数" hoverable={true}>
					      <p>{this.props.productnum}</p>
					    </Card>
				    </div>
			    </Layout>
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
  return{
    usernum:state.get('home').get('usernum'),
    ordernum:state.get('home').get('ordernum'),
    productnum:state.get('home').get('productnum')
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    handleCount:()=>{
      const action=actionCreator.getCountAction();
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);