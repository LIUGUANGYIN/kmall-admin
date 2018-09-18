import React,{ Component } from 'react';
import { Breadcrumb,Form,Select,Input, Button } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Layout from 'common/layout/layout.js';

const FormItem = Form.Item;
const Option = Select.Option;

class CategoryAdd extends Component{

	constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  componentDidMount(){
		this.props.handleSet()
	}

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.props.handleAdd(values)
      }  
    });
  }

	render(){
		
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
        labelCol: {
	        xs: { span: 24 },
	        sm: { span: 8 },
        },
        wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
		    xs: {
		        span: 24,
		        offset: 0,
		    },
	        sm: {
	            span: 16,
	            offset: 8,
	        },
        },
    };

		return(
			<Layout>
			    <div >
				    <Breadcrumb separator="/">
					    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
					    <Breadcrumb.Item>添加分类</Breadcrumb.Item>
					</Breadcrumb>
					<Form>
						<FormItem
				          {...formItemLayout}
				          label="分类名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [
				            {
				                required: true, message: '请输入分类名称',
				            }],
				          })(
				            <Input />
				          )}
				        </FormItem>
				        <FormItem
				            {...formItemLayout}
				            label="分类名称"
				        >
				            {getFieldDecorator('pid', {
				                rules: [
				                {
				                    required: true, message: '请输入父级分类',
				                }],
				            })(
				            <Select defaultValue="0" style={{ width: 220 }}>
								      <Option value="0">根分类</Option>
								      {
								      	this.props.leveloneCategories.map((category)=>{
								      		return <Option key={ category.get('_id') } value={ category.get('_id') }>根分类/{ category.get('name') }</Option>
								      	})
								      }
								    </Select>
				            )}
				        </FormItem>
				        <FormItem {...tailFormItemLayout}>
				          <Button 
				          type="primary"
				          onClick={this.handleSubmit}
				          loading={this.props.isAddFetching}
				          >提交</Button>
				        </FormItem>
			        </Form>
				</div>
			</Layout>
		)
	}
}
const Add = Form.create()(CategoryAdd);

const mapStateToProps=(state)=>{
  return{
    isAddFetching:state.get('category').get('isAddFetching'),
    leveloneCategories:state.get('category').get('leveloneCategories')
  }
}

const mapDisPatchToProps=(dispatch)=>{
  return{
    handleAdd:(values)=>{
      dispatch(actionCreator.getAddAction(values));
    },
    handleSet:()=>{
      dispatch(actionCreator.setGetAddAction());
    }
  }
}

export default connect(mapStateToProps,mapDisPatchToProps)(Add);