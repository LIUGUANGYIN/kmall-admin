import * as types from './actionType.js';

import { message } from 'antd';
import { request,setUserName } from 'util';
import { GET_USERS } from 'api';
import axios from 'axios';

const getPageRequstAction=()=>{
  return{
    type:types.PAGE_REQUEST
  }
}

const getPageDoneAction = ()=>{
  return {
    type:types.PAGE_DONE
  }
}
const getSetPageAction=(payload)=>{
  return {
    type:types.SET_PAGE,
    payload
  }
}
export const getPageAction=(page)=>{
  return(dispatch)=>{
    dispatch(getPageRequstAction())
    request({
      method: 'get',
      url: GET_USERS,
      data:{
        page:page
      }
    })
    .then((result)=>{
      if(result.code==0){
        dispatch(getSetPageAction(result.data))
      }else{
        message.error('网络错误，请稍后再试')
      }
      dispatch(getPageDoneAction())
    })
    .catch((err)=>{
      message.error('网络错误，请稍后再试')
      dispatch(getPageDoneAction())
    })
  }
}