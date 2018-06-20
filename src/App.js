import React, { Component } from 'react';
import {Route, Switch, Link, withRouter} from 'react-router-dom';
import './App.css';
import axios from 'axios'
import Home from './Home.js'
import Login from './Login.js'
import Schedule from './Schedule.js'
import Budget from './Budget.js'
import WorkingGroups from './WorkingGroups.js'
import moment from 'moment'

class App extends Component {
  state={
    users:[],
    enteredType:{text:''},
    enteredEmail:{email:""},
    enteredPassword:{password:""},
    projectValues:[],
    enteredInput:"", 
    startDate:"",
    finishDate:"",
    taskValues:[]
  }

 componentWillMount(){
  axios.all([
    axios.get("http://localhost:8080/User"),
    axios.get("http://localhost:8080/Project"),
    axios.get("http://localhost:8080/Task")])
  .then(axios.spread((User, Project, Task)=>{
    let newProject = Project.data.map((project)=>{
      project.start = moment.utc(project.start)
      project.end = moment.utc(project.end)
    return project})

    let newTask = Task.data.map((task)=>{
      task.start_time = moment.utc(task.start)
      task.end_time = moment.utc(task.end)
      return task
    })
     this.setState({
     users: User.data,
     projectValues: newProject,
     taskValues: newTask
    }, ()=>{this.props.history.push("/Login")}) 
  }))
 }

  handleInput=(e)=>{
  if(e.target.type === 'select-one'){
  let enteredText = {type: e.target.value}
  this.setState({
  enteredType: enteredText
  })
 }else if(e.target.type === 'email'){
             let enteredText = {email: e.target.value}
             this.setState({
    enteredEmail:enteredText
    })
  }else{
      let enteredText = {password: e.target.value}              
      this.setState({
      enteredPassword:enteredText
      })
  }
}

  handleSubmit=(event)=>{
    event.preventDefault()
    let newUser=[
    this.state.enteredType, this.state.enteredEmail,
      this.state.enteredPassword]
         axios({
         url: 'http://localhost:8080/User',
         method: 'post',
         data: newUser
         })
        .then((res)=>{
      this.setState({
      users: res.data,
      enteredType:{},
      enteredEmail:{},
      enteredPassword:{},
      },()=>{this.props.history.push("/Home")})
    })
  }

  handleProjectInput=(e)=>{
    //if(this.state.users=== "Project Manager"){
    if(e.target.type==="text"){
      this.setState({
      enteredInput:{text:e.target.value}
      })
    }else if(e.target.name==="startDate"){
      this.setState({
      startDate:{startDate :moment(e.target.value)}
      })
    }else if(e.target.name==="finishDate"){
      this.setState({
      finishDate:{finishDate :moment(e.target.value)}
      })
    }
    //}else{
     // alert("you do not have access to this function")
    //}
  }
  
  handleProjectSubmit=(event)=>{
    event.preventDefault()
    if(event.target.name === "projectValues"){
      let start = {start:moment(this.state.startDate)}
      let end = {end:moment(this.state.finishDate)}
    let newProject=[this.state.enteredInput, start, end]
         axios({
         url: 'http://localhost:8080/Project',
         method: 'post',
         data: newProject
         })
        .then((res)=>{
          let newProject = res.data.map((project)=>{
            project.start = moment.utc(project.start)
            project.end = moment.utc(project.end)
            return project
          })
      this.setState({
      projectValues: newProject
      })
    })
  }else if(event.target.name === "taskValues"){
    let start = {start:moment(this.state.startDate)}
    let end = {end:moment(this.state.finishDate)}
    let newTask=[
    this.state.enteredInput, start, end]
        axios({
         url: 'http://localhost:8080/Task',
         method: 'post',
         data: newTask
         })
        .then((res)=>{
          let newTask = res.data.map((task)=>{
          task.start_time = moment.utc(task.start_time)
          task.end_time = moment.utc(task.end_time)
          return task
          })
          console.log(newTask)
      this.setState({
      taskValues: newTask,
      })
    })
  }
  }

 render() {
    return (
      <div>
        {/*this component will link to login page and 
        the route to the home page. The home page will display a list of all the
        current projects to select from and a create project route*/}
        <Switch>
        <Route path="/Login" render={(routerProps)=>(
          <Login
          {...routerProps}
          {...this.state.users}
          enteredEmail={this.state.enteredEmail}
          enteredInput={this.state.enteredInput}
          enteredPassword={this.state.enteredPassword}
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}/>
        )}/>
          <Route path="/Home" render={(routerProps)=>(
          <Home 
          {...routerProps}
          users={this.state.users}
          projectValues={this.state.projectValues}
          handleProjectInput={this.handleProjectInput}
          handleProjectSubmit={this.handleProjectSubmit}/>
        )}/>
         <Route path= {"/Schedule/:ProjectIndex"} render={(routerProps)=>
          <Schedule
          {...routerProps}
          {...this.state.users}
          taskValues={this.state.taskValues}
          projectValues={this.state.projectValues}
          handleProjectSubmit={this.handleProjectSubmit}
          handleProjectInput={this.handleProjectInput}
          />
        }/>       
        <Route path={"/Budget/:ProjectIndex"} render={(routerProps)=>(
          <Budget
          {...routerProps}
          {...this.state.users}/>
        )}/>       
        <Route path={"/WorkingGroups/:ProjectIndex"} render={(routerProps)=>(
          <WorkingGroups
          {...routerProps}
          {...this.state.users}/>
        )}/>
        </Switch>
      </div>
    );
  }
}

export default App;
