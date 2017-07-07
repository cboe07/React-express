// 3rd party modules
import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Custom modules
import Home from './Home';
import Delete from './Delete';
import Read from './Read';
import Edit from './Edit';

class ToDo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			theClass: []
		}
        this.addTask = this.addTask.bind(this);
       
	}

    // componentDidMount runs AFTER the first render()
    componentDidMount() {
        //getJSON request to localhost:3000...that's where Express
        $.getJSON('http://localhost:3000/getTasks', (tasksFromApi)=>{
            //log the JSON response from Express
            console.log(tasksFromApi);
            this.setState({
                theClass: tasksFromApi
            })
        });
        // Update the state..this will cause a re-render
        // this.setState({
        //     theClass: [1,2,3,4]
        // })
    }

    addTask(event){
        var taskToAdd = event.target.parentNode.childNodes[0].value;
        // var studentToAdd = document.getElementById('newStudent')
        // console.log(studentToAdd);
        // This is a POST request, se we cant use $.getJSON (omly does get)
        // $.ajax expects an object that tells it what to send (data), where to send it (url), and how (method)
        // $.ajax is a promise which has a 'done' method that will run when ajax gets back
        // It gets a param of whatever JSON was returned by the request
        // Inside that function, we update REACT state (theClass), which cause a re-render, which updates list
        // because we're mapping through state.
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/addTask",
            data: {name: taskToAdd}
        }).done((tasksArray)=>{
            this.setState({
                theClass: tasksArray
            })
        })
    }


	render() {

        return(
            <Router>
                <div className="col-sm-12 to-do-app">
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/task/delete/:taskId" component={Delete} />
                    <Route path="/task/read/:taskId" component={Read} />
                    <Route path="/task/edit/:taskId" component={Edit} />
                </div>
            </Router>
        )

        // Create an array to dump into our return. It will contain components or HTML tags
		var theClassArray = [];
        // Loop through our state var. The first time through, it will be empty
		this.state.theClass.map((task,index)=>{
			theClassArray.push(<li key={index}>{task.taskName}{task.taskDate}</li>);
		});

		return (
			<div className="App">
				<div className="App-header">
					
					<h2>Welcome to React</h2>
				</div>
				<p className="App-intro">
					// To get started, edit <code>src/App.js</code> and save to reload.
				</p>
                <div className='add-box'>
                    <input type='text' id='newTask' />
                    <button onClick={this.addTask}>Add Task</button>
                </div>
                <p>
                    {theClassArray}
                </p>
			</div>
		);
	}
}

export default ToDo;
