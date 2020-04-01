import React ,{Component} from 'react';
import classNames from 'classnames'
import './ToItem.css';
import checkImg from '../img/check.svg';
import checkComplete from '../img/check_complete.svg';
class ToItem extends Component{
    
    render(){

        const {item,onClick}=this.props;
        let url=checkImg;
        if (item.isComplete){
            url=checkComplete;
        }
        return(
           <div className={classNames('ToItem',{
               'ToItem-complete':item.isComplete
             })}>
                <img onClick={onClick} src={url} width={32}></img>
               <p>{this.props.item.title}</p>
           </div> 
        );
    }
}

export default ToItem