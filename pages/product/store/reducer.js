import { fromJS } from 'immutable'

import * as types from './actionType.js'

//用fromJS包装一个immutable对象
const defaultState = fromJS({
	parentCAtegoryId:'',
    categoryId:'',
    images:'',
    detail:'',
    categoryIdValidateStatus:'',
    categoryIdHelp:'',
    isPageFetching:false,
	current:0,
	total:0,
	pageSize:0,
	list:[],
	isSaveFetching:false,

	eidtName:'',
	eidtDesctiption:'',
	eidtPrice:'',
	eidtStock:'',
})

export default (state=defaultState,action)=>{

	if(action.type === types.CATEGORY_ID){
		return state.merge({
			parentCAtegoryId:action.payload.parentCAtegoryId,
	        categoryId:action.payload.categoryId,
	        categoryIdValidateStatus:'',
			categoryIdHelp:'',
		})
	}
	if(action.type === types.GET_IMAGE){
		return state.set('images',action.payload)
	}
	if(action.type === types.GET_RICHEDITOR){
		return state.set('detail',action.payload)
	}

	if(action.type === types.SET_CATEGORY_ERROR){
		return state.merge({
			categoryIdValidateStatus:'error',
			categoryIdHelp:'请选择所属分类',			
		})
	}

	if(action.type === types.SAVE_REQUEST){
		return state.set('isSaveFetching',true)
	}

	if(action.type === types.SAVE_DONE){
		return state.set('isSaveFetching',false)
	}

	if(action.type === types.SET_PRODUCT){
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list)
		})
	}

	if(action.type === types.PRODUCT_REQUEST){
		return state.set('isPageFetching',true)
	}

	if(action.type === types.PRODUCT_DONE){
		return state.set('isPageFetching',false)
	}

    if(action.type === types.SET_GET){
		return state.set('leveloneCategories',fromJS(action.payload))
	}
	if(action.type === types.PAGE_REQUEST){
		return state.set('isPageFetching',true)
	}

	if(action.type === types.PAGE_DONE){
		return state.set('isPageFetching',false)
	}
	if(action.type === types.SET_EDIT_PRODUCT){
		return state.merge({
			parentCAtegoryId:action.payload.category.pid,
		    categoryId:action.payload.category._id,
		    images:action.payload.images,
		    detail:action.payload.detail,
		    eidtName:action.payload.name,
			eidtDesctiption:action.payload.description,
			eidtPrice:action.payload.price,
			eidtStock:action.payload.stock,
		})		
	}

	return state;
}