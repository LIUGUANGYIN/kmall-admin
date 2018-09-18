import * as types from './actionType.js';

import { message } from 'antd';
import { request,setUserName } from 'util'
import { ADMIN_LOGIN } from 'api'
import axios from 'axios';

const getLoginRequstAction=()=>{
	return{
		type:types.LOGIN_REQUEST
	}
}

const getLoginDoneAction = ()=>{
	return {
		type:types.LOGIN_DONE
	}
}

export const submitAction=(values)=>{
	return(dispatch)=>{
         dispatch(getLoginRequstAction())
    request({
			method: 'post',
			url: ADMIN_LOGIN,
			data: values
		})
    .then((result)=>{
      if(result.code==0){
        setUserName(result.data.username)
        window.location.href='/'
      }else if(result.code==1){
        message.error(result.message)
      }
      dispatch(getLoginDoneAction())
    })
    .catch((err)=>{
      message.error('网络错误，请稍后再试')
      dispatch(getLoginDoneAction())
    })
  }
}