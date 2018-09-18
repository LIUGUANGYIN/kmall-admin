import * as types from './actionType.js';

import { message } from 'antd';
import { request,setUserName } from 'util'
import { ADMIN_COUNT } from 'api'
import axios from 'axios';

const setCountAction=(payload)=>{
  return{
    type:types.SET_COUNT,
    payload
  }
}
export const getCountAction=()=>{
	return (dispatch)=>{
    request({
			url:ADMIN_COUNT,
		})
    .then((result)=>{
      if(result.code==0){
        dispatch(setCountAction(result.data))
      }else if(result.code==1){
        message.error('获取统计数据失败')
      }
    })
    .catch((err)=>{
      message.error('获取统计数据失败网络错误，请稍后再试')
    })
  }
}