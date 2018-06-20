import React, { Component } from 'react';
import {Route, Switch, Link, withRouter} from 'react-router-dom';
import './App.css';
import axios from 'axios'
import moment from 'moment'

class Home extends Component {
    render() {
    const {match} = this.props
    return (
      <div>
        <h1 className="title">Projects</h1>
        {this.props.projectValues.map((element, i)=>{
        return(<div className='navbar'>
        <p className="navbar_info">Project: {element.text}</p>
        <p className="navbar_info"> User: {this.props.users[0].type}</p>
        <p className="navbar_info"> Start: 
         {moment(element.startDate).format('Do MMM YYYY')}</p>
        <p className="navbar_info"> Finish: 
         {moment(element.finishDate).format('Do MMM YYYY')}</p>
        
        <Link to='/Home'><button className="navbar_button">Home</button></Link>
        <Link to={"/Schedule/" + i} className="navbar_button" ><button>Schedule</button></Link>
        <Link to={"/Budget/"+ i} className="navbar_button" ><button >Budget</button></Link>
        <Link to={"/WorkingGroups/" + i} className="navbar_button" ><button>Working Groups</button></Link>
      </div>
        )})}
        
        <form name="projectValues" className="submit_task" onSubmit={this.props.handleProjectSubmit}>
        <input name="text "type='text' placeholder='Project name'onChange={this.props.handleProjectInput} 
         value={this.enteredInput} required/>
        <input name="startDate" type='date' onChange={this.props.handleProjectInput} required/>
        <input name='finishDate'type='date' onChange={this.props.handleProjectInput} required/>
        <button type="submit">Create New Project</button>
        </form>

        {/*This page will have a list of all 
        available projects to select from*/}
      </div>
    );
  }
}

export default Home;