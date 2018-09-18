import React,{ Component } from 'react';
import { Breadcrumb,Form,Select,Input, Button,InputNumber } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from './store'
import Layout from 'common/layout/layout.js';

import RichEditor from 'common/rich-editor';

import CategorySelector from './category-selector.js';

import UploadImg from 'common/image';
import { POST_UPLOAD_IMAGE,UPLOAD_EDITOR_IMAGE } from 'api';

const FormItem = Form.Item;
const Option = Select.Option;

class ProductSave extends Component{	
	constructor(props){
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.state={
    	productId:this.props.match.params.productId
    }

  }
  componentDidMount(){
  	if(this.state.productId){
  		this.props.handelEditorProduct(this.state.productId);
  	}
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
    	values.id=this.state.productId;
        this.props.handelSave(err,values);
    });
  }
	render(){
		const {
			parentCategoryId,
			categoryId,
			images, 
			detail, 
			eidtName,
			eidtDesctiption,
			eidtPrice, 
			eidtStock,
		}=this.props;
		let fileList=[];
		// if(images){
		// 	fileList=images.split(',').map((img,index)=>({
		// 		uid:index,
		// 		status:'done',
		// 		url:img,
		// 		response:img
		// 	}))
		// }
	  const { getFieldDecorator } = this.props.form;

	  const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 2 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 22 },
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
				<div>
					<Breadcrumb separator="/">
					    <Breadcrumb.Item>分类商品</Breadcrumb.Item>
					    <Breadcrumb.Item>添加商品</Breadcrumb.Item>
					</Breadcrumb>
					<Form>
						<FormItem
				      {...formItemLayout}
				          label="商品名称"
				    >
				      {getFieldDecorator('name', {
				        rules: [
				        {
				            required: true, message: '请输入商品名称',
				        }],
				        initialValue:eidtName
				      })(
				        <Input
				        placeholder="商品名称" 
				        />
				      )}
				    </FormItem>
				    <FormItem
				      {...formItemLayout}
				          label="商品描述"
				    >
				      {getFieldDecorator('description', {
				        rules: [
				        {
				            required: true, message: '请输入商品描述',
				        }],
				        initialValue:eidtDesctiption
				      })(
				        <Input 
				          placeholder="商品描述"
				        />
				      )}
				    </FormItem>
		        <FormItem

		            {...formItemLayout}
		            label="所属分类"
		            required={true}
		            validateStatus={this.props.caregoryIdValidateStatus}
		            help={this.props.caregoryIdHelp}
		        >
		          <CategorySelector
		          parentCategoryId={parentCategoryId}
		          categoryId={categoryId}  
		          getCategoryId={(parentCategoryId,caregoryId)=>{
				        			this.props.handelCategoryId(parentCategoryId,caregoryId)
				        		}} />
		        </FormItem>
		        <FormItem
		        {...formItemLayout}
				        label="商品价格"
				    >
				    {getFieldDecorator('price', {
				        rules: [
				        {
				            required: true, message: '请输入商品价格',
				        }],
				        initialValue:eidtPrice
				      })(
				        <InputNumber 
					        style={{ width: 300 }}
					        min={0}
					        formatter={value=>`${value}元`}
					        parser={value=>value.replace('元','')}
				        />
				      )}
				      
				    </FormItem>
				    <FormItem
				    {...formItemLayout}  
				        label="商品库存"
				    >
				    {getFieldDecorator('stock', {
				        rules: [
				        {
				            required: true, message: '请输入商品库存',
				        }],
				        initialValue:eidtStock
				      })(
				        <InputNumber 
					        style={{ width: 300 }}  
					        min={0}
					        formatter={value=>`${value}件`}
					        parser={value=>value.replace('件','')}
				        />
				      )}
				    </FormItem>
				    <FormItem
				      {...formItemLayout}  
				        label="商品图片"
				    >
				    <UploadImg
				      action= {POST_UPLOAD_IMAGE}
				      max={3}
				      fileList={fileList}
				      getFileList={
				    	  (fileList)=>{
				    		  this.props.handelImage(fileList)
				    	  }
				      }
				    />
				    </FormItem>
				    <FormItem
				      {...formItemLayout}  
				        label="商品详情"
				    >
				    <RichEditor
				      url={UPLOAD_EDITOR_IMAGE} 
				      getEditorValue={(value)=>{
				    	  this.props.handelRichEditor(value)
				      }}
				    />
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

const Save = Form.create()(ProductSave);
const mapStateToProps=(state)=>{
  return{
        categoryIdHelp:state.get('product').get('categoryIdHelp'),
        caregoryIdValidateStatus:state.get('product').get('caregoryIdValidateStatus'),
        isSaveFetching:state.get('product').get('isSaveFetching'),
        parentCategoryId:state.get('product').get('parentCAtegoryId'),
		categoryId:state.get('product').get('categoryId'),
		images:state.get('product').get('images'),
		detail:state.get('product').get('detail'),
		eidtName:state.get('product').get('eidtName'),
		eidtDesctiption:state.get('product').get('eidtDesctiption'),
		eidtPrice:state.get('product').get('eidtPrice'),
		eidtStock:state.get('product').get('eidtStock'),

  }
}

const mapDisPatchToProps=(dispatch)=>{
  return{
  	handelSave:(err,values)=>{
      dispatch(actionCreator.setGetSaveAction(err,values));
  	},
    handelCategoryId:(parentCategoryId,caregoryId)=>{
      dispatch(actionCreator.categoryIdAction(parentCategoryId,caregoryId));
    },
    handelImage:(fileList)=>{
      dispatch(actionCreator.ImageAction(fileList));
    },
    handelRichEditor:(value)=>{
      const action=actionCreator.RichEditorAction(value);
      dispatch(action);
    },
    handelEditorProduct:(productId)=>{
    	dispatch(actionCreator.getProductEditAction(productId))
    }
  }
}


export default connect(mapStateToProps,mapDisPatchToProps)(Save);