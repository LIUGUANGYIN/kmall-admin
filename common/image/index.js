import { Upload, Icon, Modal } from 'antd';

import React,{ Component } from 'react';


class UploadImg extends Component {
    constructor(props){
    super(props);
    this.state = {
      previewVisible: false,
      previewImage:'',
      fileList:[],
    };
    this.handlePreview=this.handlePreview.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
  }

static getDerivedStateFromProps(props,state){
  if(props.fileList.length>0 && state.fileList.length==0){
    return {
      fileList:props.fileList
    }
  }
  return null
}

  handleCancel(){
    this.setState({ previewVisible: false })
  } 

  handlePreview(file){
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange({ fileList }){
    this.setState({ fileList },()=>{
       this.props.getFileList(fileList.map((file)=>{
        return file.response
      }).join(','))
    })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={this.props.action}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          withCredentials={true}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default UploadImg;