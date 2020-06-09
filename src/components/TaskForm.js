import React, {Component} from 'react';

import '../App.css';

class TaskForm extends Component {
  constructor(props){
    super(props)
    this.state={
      id:'',
      name:'',
      status:false
    }
  }
  componentWillMount(){
    
    if(this.props.tasks){
      this.setState({
        id:this.props.tasks.id,
        name:this.props.tasks.name,
        status:this.props.tasks.status
      })
     
    } 
    console.log(this.props.taskEditing);
    
  }
  componentWillReceiveProps(nxtprops){
    if(nxtprops &&nxtprops.tasks){
      this.setState({
        id:nxtprops.tasks.id,
        name:nxtprops.tasks.name,
        status:nxtprops.tasks.status
      })
    }
  }
  onChange=(event)=>{
    var target=event.target;
    var name=target.name;
    var value=target.value;
    if(name==='status'){
      value=target.value==='true'?true:false;
    }
    this.setState({
      [name]:value
    })
    
  }

  onSubmit=(event)=>{
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.props.cancleForm();
  }
  render(){
    var {id} =this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
        <a  className="btn btn-primary"  role="button"> 
        <h3 className="panel-titel">{id===''?'Thêm công việc ':'Sửa công việc'}
       <span className="fa fa-times-circle text-right" onClick={this.props.onCloseform}></span>
        </h3>
        </a>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên: </label>
              <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange}/>
              <label>Trạng thái</label>
              <select className="form-control" name="status" value={this.state.status} onChange={this.onChange}>
              <option value={true}>Kích hoạt</option>
              <option value={false}>Ẩn</option>
              </select> <br/>
              <div className="text-center">
                <button type="submit" className="btn btn-warning" >
                  <span className="fa fa-plus mr-5"/>Lưu lại
      
                </button>&nbsp;
                <button type="submit" className="btn btn-warning" onClick={this.props.cancleForm}>
                  <span className="fa fa-close mr-5"/>Hủy bỏ
      
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
}}

export default TaskForm;
