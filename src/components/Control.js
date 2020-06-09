import React, {Component} from 'react';
import Search from './Search'
import Sort from './Sort'
import '../App.css';

class Control extends Component {
  render(){
        return (
            <div className="row mt-15">
                   
                <Search/>
                <Sort onSort={this.props.onSort} by={this.props.by} value={this.props.value}/>
            </div>

        );
        
}}

export default Control;
