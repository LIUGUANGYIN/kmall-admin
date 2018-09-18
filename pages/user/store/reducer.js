import { fromJS } from 'immutable'

import * as types from './actionType.js'

//用fromJS包装一个immutable对象
const defaultState = fromJS({ 
	    isFetching:false,
		current:1,
		total:100,
		pageSize:10,
		list:[]
})

export default (state=defaultState,action)=>{
	if(action.type===types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list)
		})
	}

	if(action.type === types.LOGIN_REQUEST){
		return state.set('isFetching',true)
	}

	if(action.type === types.LOGIN_DONE){
		return state.set('isFetching',false)
	}

	return state;
}