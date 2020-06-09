import React, {Component} from 'react';
import '../App.css';

class TaskItem extends Component {
    constructor(props){
        super(props);
      
    }
    OnChangeStatus =()=>{
        this.props.OnChangeStatus(this.props.task.id);
    }
    deleteItem = ()=>{
        this.props.deleteItem(this.props.task.id);
    }
    onModify=()=>{
        
        this.props.onModify(this.props.task.id);
    }
  render(){
        var {task,index}=this.props
        return (
            <tr>
            <td>{index+1}</td>
            <td>{task.name}</td>
            <td className="text-center">
            <a className={task.status===true ? 'btn btn-success' : 'btn btn-danger'} onClick={this.OnChangeStatus} href="#" role="button">{task.status===true?'Kích hoạt':'Ẩn' }></a>
            
            </td>
            <td className="text-center">
            <button type="button" className="btn btn-warning" onClick={this.onModify}>
                <span className="fa fa-pencil mr-5"></span>Sửa
            </button>
            &nbsp;
            <button type="button" className="btn btn-danger" onClick={this.deleteItem}>
                <span className="fa fa-trash mr-5"></span>Xóa
            </button>
            </td>
            </tr>
           

        );
}}

export default TaskItem;







