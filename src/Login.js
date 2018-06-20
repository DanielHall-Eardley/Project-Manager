import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import './App.css';

class Login extends Component {
  render() {
    return (
      <div>
      <div className="">
        <h1 className="title">Dan and Mon's Awesome App</h1>
        <h2 className="sub_title">Login</h2>
          <form className="login" onSubmit={this.props.handleSubmit}>
          <select className="input_type" onChange={this.props.handleInput} required>
            <option value="">Select Title</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Group Leader">Group Leader</option>
            <option value="Collaborater">Collaborator </option>
          </select>

          <input onChange={this.props.handleInput} className="input_email" type="email"
          value={this.props.enteredEmail.email} placeholder="Enter username(email)" required/>
          <input onChange={this.props.handleInput} className="input_password" type="password" 
          value={this.props.enteredPassword.password} placeholder="Enter password" required/>
          <button className="submit_button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;