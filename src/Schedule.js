import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import './App.css';
import moment from 'moment'
import Timeline from 'react-calendar-timeline/lib'
import 'react-calendar-timeline/lib/Timeline.css'

class Schedule extends Component {
render(){
    let groups = [{ id: 1, title: 'row 1'}, 
    { id: 2, title: 'row 2' }]

const i = this.props.match.params.ProjectIndex
return (<div>{this.props.projectValues.length > 0?
      <div> 
      <h1 className="title">Schedule for: {this.props.projectValues[i].text}</h1>
        <form name="taskValues" className="submit_task" onSubmit={this.props.handleProjectSubmit}>
        <input type="text" placeholder='Submit task' onChange={this.props.handleProjectInput} 
        value={this.props.enteredInput} required/>
        <input name="startDate" type='date' onChange={this.props.handleProjectInput} 
        required min={this.props.projectValues[i].startDate} max={this.props.projectValues[i].finishDate}/>
        <input name="finishDate" type='date' onChange={this.props.handleProjectInput} required/>
        <button type="submit">Submit Task</button>
      </form>
        <div className="schedule_grid">

        <Timeline
        groups={groups}
        items={this.props.taskValues}
       defaultTimeStart={this.props.projectValues[i].start}
       defaultTimeEnd={this.props.projectValues[i].end} />

        
        </div>  
      </div>
:<div>Loading...</div>}</div>);
  }
}

export default Schedule;