import React,{ Component } from 'react';
import { Select,message } from 'antd';
import { request } from 'util';
import { GET_SET } from 'api';
const Option = Select.Option;

class CategorySelector extends React.Component {

	constructor(props){
	    super(props);
	    this.state = {
	    levelOneCategories:[],
	    levelOneCategoryId:'',
	    levelTwoCategories:[],
	    levelTwoCategoryId:'',
	    needLoadLevelTwo:false,
	    isChanged:false
    }
	    this.handleLevelOneChange=this.handleLevelOneChange.bind(this);
	    this.handelLevelTwoChange=this.handelLevelTwoChange.bind(this);
    }


    componentDidMount(){
		this.handleOneSet()
	}
	static getDerivedStateFromProps(props,state){
		const levelOneCategoryIdChanged=props.parentCategoryId !== state.levelOneCategoryId
		const levelTwoCategoryIdChanged=props.categoryId !== state.levelTwoCategoryId
		//新建时不更新state
		if(state.levelOneCategoryIdChanged && !props.parentCategoryId && !props.categoryId){
			return null;
		}

		//如果分类ID没有改变，就不更新state
		if(!levelOneCategoryIdChanged && !levelTwoCategoryIdChanged){
			return null;
		}
		//编辑时已经更新过了就不更新state
		if(state.isChanged){
			return null;
		}
		if(props.parentCategoryId==0){
			return{
				levelOneCategoryId:props.categoryId,
				levelTwoCategoryId:'',
				isChanged:true
			}
		}else{
			return{
				levelOneCategoryId:props.parentCategoryId,
				levelTwoCategoryId:props.categoryId,
				needLoadLevelTwo:true,
				isChanged:true
			}
		}
		return null;
	}
	componentDidUpdate(){
		if(this.state.needLoadLevelTwo){
			this.handleTwoSet();
			this.setState({
				needLoadLevelTwo:false
			})
		}
	}
    handleOneSet(){
	    request({
	        method:'get',
	        url: GET_SET,
	        data:{
	        	pid:0
	        }   
	    })
	    .then((result)=>{
	        if(result.code==0){
	            this.setState({
	            	levelOneCategories:result.data
	            })
	        }else{
	            message.error('获取失败')
	        }
	    })
	    .catch((err)=>{
	        message.error('获取ss发送失败')
	    })
	}

    handleLevelOneChange(value){
	    this.setState({
	        levelOneCategoryId: value,
	      	levelTwoCategories:[],
	        levelTwoCategoryId:''
	    },
	    ()=>{
	    	this.handleTwoSet();
	    	this.onValueChange()
	    })
    }
    handleTwoSet(){
    	console.log('aa',this.state.levelOneCategoryId)
	    request({
	        method:'get',
	        url: GET_SET,
	        data:{
	        	pid:this.state.levelOneCategoryId
	        }   
	    })
	    .then((result)=>{
	        if(result.code==0){
	            this.setState({
	            	levelTwoCategories:result.data
	            })
	        }else{
	            message.error('获取失败')
	        }
	    })
	    .catch((err)=>{
	        message.error('获取ss发送失败')
	    })
	}

    handelLevelTwoChange(value){
		this.setState({
			levelTwoCategoryId:value
		},()=>{
			this.onValueChange()
		})
    }
	onValueChange(){
		const {levelOneCategoryId,levelTwoCategoryId} = this.state;
		
		//如果选择了二级分类
		if(levelTwoCategoryId){
			this.props.getCategoryId(levelOneCategoryId,levelTwoCategoryId)
		}else{
			this.props.getCategoryId(0,levelOneCategoryId)
		}
		
	}
  render() {
  	const {levelOneCategories,levelOneCategoryId,levelTwoCategories,levelTwoCategoryId}=this.state;
    const levelOneOption = levelOneCategories.map(category => <Option key={category._id} value={category._id}> {category.name}</Option>);
    const levelTwoOption = levelTwoCategories.map(category => <Option key={category._id} value={category._id}> {category.name}</Option>);
    return (
      <div>
        <Select  
        style={{ width: 300, marginRight:10 }} 
        defaultValue={levelOneCategoryId}
        value={levelOneCategoryId}
        onChange={this.handleLevelOneChange}>
          {levelOneOption}
        </Select>
        {
        	levelTwoOption.length
        	?<Select 
		        defaultValue={levelTwoCategoryId} 
		        value={levelTwoCategoryId}
		        style={{ width: 300 }} 
		        onChange={this.handelLevelTwoChange}>
		          {levelTwoOption}
	        </Select>
        :null
        }
        
      </div>
    )
  }
}
export default CategorySelector;