import * as types from './actionType.js';

import { message } from 'antd';
import { request,setUserName } from 'util';
import { POST_ADD,GET_SET,PUT_NAME,PUT_ORDER,GET_PRODUCT } from 'api';
import axios from 'axios';

const getAddRequstAction=()=>{
  return{
    type:types.ADD_REQUEST
  }
}

const getAddDoneAction = ()=>{
  return {
    type:types.ADD_DONE
  }
}
const getSetAddAction=(payload)=>{ 
  return {
    type:types.SET_GET,
    payload
  }
}

const getPageRequstAction = ()=>{
  return {
    type:types.PAGE_REQUEST
  }
}
const getPageDoneAction = ()=>{
  return {
    type:types.PAGE_DONE
  }
}
const getSetPageAction = (payload)=>{
  return {
    type:types.SET_PAGE,
    payload
  }
}

//获取一级分类
export const setGetAddAction=()=>{
  return(dispatch)=>{
    dispatch(getAddRequstAction())
    request({
      method:'get',
      url: GET_SET,
      data:{
        pid:0
      }
    })
    .then((result)=>{
      if(result.code==0){
        dispatch(getSetAddAction(result.data))
      }else{
        message.error('获取失败')
      }
    })
    .catch((err)=>{
      message.error('获取发送失败')
    })
  }
}
//添加分类
export const getAddAction=(values)=>{
  return(dispatch)=>{
    dispatch(getAddRequstAction())
    request({
      method: 'post',
      url: POST_ADD,
      data:values
    })
    .then((result)=>{
      if(result.code==0){
        if(result.data){//如果添加的是一级分类,从新更新一级分类
           dispatch(getSetAddAction(result.data))
         }       
        message.success('添加成功')
      }else{
        message.error(result.message)
      }
      dispatch(getAddDoneAction())
    })
    .catch((err)=>{
      message.error('添加发送失败')
      dispatch(getAddDoneAction())
    })
  }
}

//获取page页分类
export const getPageAction = (pid,page)=>{
  return (dispatch)=>{
    dispatch(getPageRequstAction());
    request({
      method: 'get',
      url: GET_SET,
      data: {
        pid:pid,
        page:page
      }
    })
    .then((result)=>{
      if(result.code == 0){
        dispatch(getSetPageAction(result.data)) 
      }else{
        message.error(result.message)
      }
      dispatch(getPageDoneAction())
    })
    .catch((err)=>{
      message.error('网络错误,请稍后在试!')
      dispatch(getPageDoneAction())
    })
  } 
}

export const getShowUpdateModalAction = (updateId,updateName)=>{
  return {
    type:types.SHOW_UPDATE_MODAL,
    payload:{
      updateId,
      updateName
    }
  }
}
export const getCloseUpdateModalAction=()=>({
  type:types.CLOSE_MODAL
})
export const getChangeNameAction=(payload)=>({
  type:types.CHANGE_NAME,
  payload
})

//更改姓名
export const getUpdateNameAction = (pid)=>{
  return (dispatch,getState)=>{
    const state= getState().get('category');
    request({
      method: 'put',
      url: PUT_NAME,
      data: {
        id:state.get('updateId'),
        name:state.get('updateName'),
        pid:pid,
        page:state.get('current')
      }
    })
    .then((result)=>{
      if(result.code == 0){
        dispatch(getSetPageAction(result.data)) 
        dispatch(getCloseUpdateModalAction())
      }else{
        message.error(result.message)
      }
      dispatch(getPageDoneAction())
    })
    .catch((err)=>{
      message.error('网络错误,请稍后在试!')
      dispatch(getPageDoneAction())
    })
  } 
}
//更改排序
export const getUpdateModalOrderAction = (pid,id,neworder)=>{
  return (dispatch,getState)=>{
    const state= getState().get('category'); 
    request({
      method: 'put',
      url: PUT_ORDER,
      data: {
        id:id,
        pid:pid,
        order:neworder,
        page:state.get('current')
      }
    })
    .then((result)=>{
      if(result.code == 0){
        dispatch(getSetPageAction(result.data)) 
      }else{
        message.error(result.message)
      }
      dispatch(getPageDoneAction())
    })
    .catch((err)=>{
      message.error('网络错误,请稍后在试!')
      dispatch(getPageDoneAction())
    })
  } 
}