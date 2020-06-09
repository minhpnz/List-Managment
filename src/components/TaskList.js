import React, {Component} from 'react';
import TaskItem from './TaskItem'
import '../App.css';

class TaskList extends Component {
    constructor(props){
        super(props);
        this.state={
            filterName:'',
            filterStatus:-1
        }
    }
    onChange =(event)=>{
        var target=event.target;
        var name=target.name;
        var value=target.value;
        this.props.onFilter(name==='filterName'?value:this.state.filterName,
        name==='filterStatus'?value:this.state.filterStatus)
        this.setState({
            [name]:value
        });
    }
  render(){
        var {tasks} = this.props;
        var {filterName,filterStatus}=this.state;
        var eleTask= tasks.map((task,index)=><TaskItem key={task.id} onModify={this.props.onModify} deleteItem={this.props.deleteItem} OnChangeStatus={this.props.OnChangeStatus } index={index} task={task}/>)
        return (
            
            <table className="table table-bordered table-hover">


            <thead>
            <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Trạng Thái</th>
                <th className="text-center">Hành động</th>
            </tr>
            </thead>
            <tbody>
            <tr>  
                <td></td>
                <td>
                <input type="text" className="form-control" name="filterName" value={filterName} onChange={this.onChange}/>

                </td>
                <td>
                <select className="form-control" name="filterStatus"  value={filterStatus} onChange={this.onChange}>
                <option value={-1}>Tất cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích hoạt </option>
                </select>
                </td>
                <td></td>
            </tr>
                {eleTask}
            </tbody>
            </table>
           

        );
}}

export default TaskList;





