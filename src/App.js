import React ,{Component} from 'react';
import './App.css';
import ToItem from './components/ToItem';
import tick from './img/tick.svg'

class App extends Component{
  constructor(){
    super();
    this.onItemClicked=this.onItemClicked.bind(this);
    this.onKeyUp=this.onKeyUp.bind(this)
    this.onChange=this.onChange.bind(this)
    this.state=
    {
      newItem:'',
      todoItem:
    [
    {title: 'Mua bim ',isComplete:true}
    ,{title:'Mua bim bim',isComplete:true}
    ,{title:'Mua bim bim bim',isComplete:true}
    ]
    }
  }

  onItemClicked(item){
    console.log("Item CLiked",item);
    return (event)=>{
      const isComplete=item.isComplete;
      const {todoItem}=this.state;
      const index=this.state.todoItem.indexOf(item);
      this.setState({
        todoItem:[
          ...todoItem.slice(0,index),
          {
            ...item,isComplete:!isComplete
          },
          ...todoItem.slice(index+1)
        ]
      })
    };
  }

  onKeyUp(event){
  
    if(event.keyCode===13)
      {
    let text=event.target.value;
      if(!text || text===''){ return;}
    text=text.trim();
      if(!text) {return;}
    this.setState({
      newItem:'',
      todoItem:[
        {title:text,isComplete:false},
        ...this.state.todoItem
      ]
    })}

  }

  onChange(event){
    this.setState({
      newItem:event.target.value
    })
  }

  render(){
    const {todoItem,newItem}=this.state;
    return (
    <div className="App">
        <h1 className="todoapp">Todo List</h1>
       <div className="Header">
          <img src={tick} width={32} height={32} ></img>
          <input type="text"
          value={newItem}
          onChange={this.onChange}
          placeholder="Add a new toDo"
          onKeyUp={this.onKeyUp}></input>
       </div>
        {
          todoItem.length>0&&todoItem.map((item,index)=>
          <ToItem 
            key={index} 
            item={item}
            onClick={this.onItemClicked(item)}
            />)
        }
        {todoItem.length===0 && 'Nothing here'}
    
    </div>
  );}
}

export default App;
