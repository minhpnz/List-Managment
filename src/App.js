import React, {Component} from 'react';
import TaskForm from './components/TaskForm'
import Control from './components/Control'
import TaskList from './components/TaskList'
import './App.css';

class App extends Component {
  constructor(props){
     super(props);
     this.state={
       tasks:[],
       isDisplayForm:false,
       taskEditing:null,
       filter:{
         name:'',
         status:-1
       },
         by:'',
         value:1
       
     }
  }
  
  componentWillMount(){
    if(localStorage&&localStorage.getItem('tasks')){
      var tasks=JSON.parse(localStorage.getItem('tasks'));
      // var tasks=[{
      //   id:'123',
      //   name:'ngu',
      //   status:true
      // }]
      this.setState({
        tasks:tasks
      })

    }
  }
  DisplayForm = ()=>{
    this.setState({
      isDisplayForm:!this.state.isDisplayForm
      
    })
    
  }
  onToggleForm=()=>{
    this.setState({
      isDisplayForm:!this.state.isDisplayForm,
      taskEditing:null
    })
  }
  onSort=(name,value)=>{
    this.setState({
      
        by:name,value:value
      
    });
   
  }
  s4(){
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
  }
  generateID(){
    return this.s4()+this.s4()+ '-' +this.s4()+ '-' +this.s4()+this.s4()+ '-' +this.s4();
  }
  onCloseform=()=>{
    this.setState({
      isDisplayForm:!this.state.isDisplayForm
    })
    
  }
  OnChangeStatus=(id)=>{
    var index=this.findindex(id);
    var {tasks}=this.state;
    tasks[index].status=! tasks[index].status;
    this.setState({
      tasks:tasks
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
    
  }
  deleteItem=(id)=>{
    var index=this.findindex(id);
    var {tasks}=this.state;
    tasks.splice(index,1)
    this.setState({
      tasks:tasks
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
  }
  findindex=(id)=>{
    var result;
    var {tasks}=this.state;
    tasks.forEach((task,index)=>{
      if(task.id===id){
        result=index;
      }
    })
    return result;
  }
  cancleForm=()=>{
    this.setState({
      isDisplayForm:!this.state.isDisplayForm
    })
  }
  onModify=(id)=>{
    var {tasks}=this.state;
    var index=this.findindex(id);
    var taskEditing=tasks[index];

    this.setState({
      taskEditing:taskEditing
    })
    this.DisplayForm()
     return 2;
  }
  onSubmit=(data)=>{
    var {tasks}=this.state;
    if(data.id===''){
      data.id=this.generateID();
      tasks.push(data)
    }
    else{
      var index=this.findindex(data.id);
      tasks[index]=data;
    }
    this.setState({
      tasks:tasks,
      taskEditing:null  
    });
    localStorage.setItem('tasks',JSON.stringify(tasks))
  }
  onFilter=(filterName,filterStatus)=>{
    filterStatus=parseInt(filterStatus,10);
    this.setState({
      filter:{
        name:filterName.toLowerCase(),
        status:filterStatus
      }
    })
  }
  render(){

  var {tasks,isDisplayForm,taskEditing,filter,by,value}=this.state;
  if(filter){
    if(filter.name){
      tasks=tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(filter.name)!==-1;
      })
    }
    tasks=tasks.filter((task)=>{
      if(filter.status===-1){
        return task;
      }
      else{
        return task.status===(filter.status===1?true:false)
      }
    })
  }
  if(by==='name'){
    tasks.sort((a,b)=>{
      if(a.name.toLowerCase()>b.name.toLowerCase()) return value;
      else if(a.name.toLowerCase()<b.name.toLowerCase())return -value;
      else return 0;
    })

  }
  else{
    
      tasks.sort((a,b)=>
      {
        if(a.status>b.status) return value;
        else if(a.status<b.status)return -value;
        else return 0;
      }
      )
  }
  


  var elementTaskForm=isDisplayForm===true?<TaskForm tasks={taskEditing} onModify={this.onModify} cancleForm={this.cancleForm} onCloseform={this.onCloseform} onSubmit={this.onSubmit}/>:'';
  return (
    <div className="App">
        <div className="container">
          <div className="text-center">
            <h1>Quản lý công việc</h1><hr/>
          </div>
          <div className="row">
          
            <div className="col-4">
              {elementTaskForm}
            </div>
            <div className={isDisplayForm===true?'col-8':'col-12'}>
            <button type="submit" className="btn btn-primary btn-add-job"  onClick={this.onToggleForm}>
                        <span className="fa fa-plus mr-5"/>Thêm công việc    
                      </button>
                    
          
            <Control onSort={this.onSort} by={by} value={value}/>
              
             <TaskList tasks={tasks} onModify={this.onModify} OnChangeStatus={this.OnChangeStatus} deleteItem={this.deleteItem} onFilter={this.onFilter}/>
            
            </div>
            </div>
          </div>
        </div>
   
  );
}}

export default App;
