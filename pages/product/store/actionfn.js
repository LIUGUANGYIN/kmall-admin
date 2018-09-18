import * as types from './actionType.js';

import { message } from 'antd';
import { request,setUserName } from 'util';
import { 
  POST_PRODUCT,
  PUT_STATUS,
  PUT_PRODUCT_ORDER,
  GET_PRODUCT,
  GET_PRODUCT_DETAIL,
  PUT_PRODUCT
} from 'api';
import axios from 'axios';


export const categoryIdAction = (parentCAtegoryId,categoryId)=>{
  return {
    type:types.CATEGORY_ID,
    payload:{
     parentCAtegoryId,
      categoryId
    }
  }
}

export const ImageAction = (fileList)=>{
  return {
    type:types.GET_IMAGE,
    payload:{
      fileList
    }
  }
}
export const RichEditorAction = (values)=>{
  return {
    type:types.GET_RICHEDITOR,
    payload:{
      values
    }
  }
}

const getSaveRequstAction=()=>{
  return{
    type:types.SAVE_REQUEST
  }
}

const getSaveDoneAction = ()=>{
  return {
    type:types.SAVE_DONE
  }
}

const getProductRequstAction = ()=>{
  return {
    type:types.PRODUCT_REQUEST
  }
}

const getProductDoneAction = ()=>{
  return {
    type:types.PRODUCT_DONE
  }
}

const getSetProductAction = (payload)=>{
  return {
    type:types.SET_PRODUCT,
    payload
  }
}



const getSetAddAction=(payload)=>{ 
  return {
    type:types.SET_GET,
    payload
  }
}

const setCategoryError = ()=>({
  type:types.SET_CATEGORY_ERROR
})


//添加setGetSaveAction
export const setGetSaveAction=(err,values)=>{
  return(dispatch,getState)=>{
    const state=getState().get('product');
    const  categoryId = state.get('categoryId');
    if(!categoryId){
      dispatch(setCategoryError())
      return;
    }
    if(err){
      return;
    }
    dispatch(getSaveRequstAction())
    request({
      method: 'post',
      url: POST_PRODUCT,
      data:{
        ...values,
        category:state.get('categoryId'),
        images:state.get('images'),
        detail:state.get('detail')
      }
    })
    .then((result)=>{
      if(result.code == 0){
        message.success(result.message)
        window.location.href = '/product'
      }
      dispatch(getSaveDoneAction())
    })
    .catch((err)=>{
      message.error('添加发送失败')
      dispatch(getSaveDoneAction())
    })
  }
}

//编辑商品
export const UpdateSaveAction=(id,err,values)=>{
  return(dispatch,getState)=>{
    const state=getState().get('product');
    const  categoryId = state.get('categoryId');
    if(!categoryId){
      dispatch(setCategoryError())
      return;
    }
    if(err){
      return;
    }
    dispatch(getSaveRequstAction())
    request({
      method: 'put',
      url: PUT_PRODUCT,
      data:{
        id:id,
        ...values,
        category:state.get('categoryId'),
        images:state.get('images').fileList,
        detail:state.get('detail').values

      }
    })
    .then((result)=>{
      if(result.code == 0){
        message.success(result.message)
        window.location.href = '/product'
      }
      dispatch(getSaveDoneAction())
    })
    .catch((err)=>{
      message.error('添加发送失败')
      dispatch(getSaveDoneAction())
    })
  }
}


//获取page页分类
export const getProductAction = (page)=>{
  return (dispatch)=>{
    dispatch(getProductRequstAction());
    request({
      method: 'get',
      url:GET_PRODUCT,
      data: {
        page:page
      }
    })
    .then((result)=>{
      if(result.code == 0){
        dispatch(getSetProductAction(result.data)) 
      }else{
        message.error(result.message)
      }
      dispatch(getProductDoneAction())
    })
    .catch((err)=>{
      message.error('网络错误,请稍后在试!')
      dispatch(getProductDoneAction())
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

//更改状态
export const getUpdateStatusAction = (id,newStatus)=>{
  return (dispatch,getState)=>{
    const state= getState().get('product');
    request({
      method: 'put',
      url: PUT_STATUS,
      data: {
        id:id,
        status:newStatus,
        page:state.get('current')
      }
    })
    .then((result)=>{
      if(result.code == 0){
        message.success(result.message)
      }else{
        message.error(result.message)
        dispatch(getSetProductAction(result.data))
      }
    })
    .catch((err)=>{
      message.error('网络错误,请稍后在试!')
    })
  } 
}
//更改排序
export const getUpdateOrderAction = (id,neworder)=>{
  return (dispatch,getState)=>{
    const state= getState().get('product'); 
    request({
      method: 'put',
      url: PUT_PRODUCT_ORDER,
      data: {
        id:id,
        order:neworder,
        page:state.get('current')
      }
    })
    .then((result)=>{
      if(result.code == 0){
        dispatch(getSetProductAction(result.data)) 
      }else{
        message.error(result.message)
      }
      dispatch(getProductDoneAction())
    })
    .catch((err)=>{
      message.error('网络错误,请稍后在试!')
      dispatch(getProductDoneAction())
    })
  } 
}

const setEditProduct=(payload)=>{
  return{
    type:types.SET_EDIT_PRODUCT,
    payload
  }
}

//获取商品信息
export const getProductEditAction=(productId)=>{
  return (dispatch)=>{
    request({
      method: 'get',
      url:GET_PRODUCT_DETAIL,
      data: {
        id:productId
      }
    })
    .then((result)=>{
      if(result.code == 0){
        dispatch(setEditProduct(result.data)) 
      }else{
        message.error("获取失败")
      }
    })
    .catch((err)=>{
      message.error('网络错误,请稍后在试!')
    })
  }
}