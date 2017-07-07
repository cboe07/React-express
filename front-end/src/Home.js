import React, {Component} from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import { Link } from 'react-router-dom';



class Home extends Component{
	constructor(props) {
		super(props);
		this.state = {
			taskList: []
		}
		this.addNewTask = this.addNewTask.bind(this)
		
	}

	componentDidMount() {
        //getJSON request to localhost:3000...that's where Express
        $.getJSON('http://localhost:3000/getTasks?api_key=abcdefg', (tasksFromApi)=>{
            //log the JSON response from Express
            // console.log(tasksFromApi);
            this.setState({
                taskList: tasksFromApi
            })
        });
        // Update the state..this will cause a re-render
        // this.setState({
        //     theClass: [1,2,3,4]
        // })
    }

    addNewTask(event){
    	event.preventDefault();
    	// console.log("User submitted form")
    	// var taskToAdd = event.target.parentNode.childNodes[0].value;
    	var newTask = document.getElementById('new-task').value;
        var newTaskDate = document.getElementById('new-task-date').value;
        var newTaskInfo = document.getElementById('new-task-info').value;
        console.log(newTask)
        // console.log(studentToAdd);
        // This is a POST request, se we cant use $.getJSON (omly does get)
        // $.ajax expects an object that tells it what to send (data), where to send it (url), and how (method)
        // $.ajax is a promise which has a 'done' method that will run when ajax gets back
        // It gets a param of whatever JSON was returned by the request
        // Inside that function, we update REACT state (theClass), which cause a re-render, which updates list
        // because we're mapping through state.
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/addTask?api_key=abcdefg",
            data: {
            	taskName: newTask,
            	taskDate: newTaskDate,
            	taskInfo: newTaskInfo
            }
        }).done((tasksArray)=>{
            this.setState({
                taskList: tasksArray
            })
        })
    }
    


	render(){

		// Create an array to dump into our return. It will contain components or HTML tags
		var taskArray = [];
        // Loop through our state var. The first time through, it will be empty
		this.state.taskList.map((task,index)=>{
			taskArray.push(
				<div className='col-sm-12' key={index}>
					<Link to={`/task/read/${task.id}`}>{task.taskName} </Link> 
					<Link to={`/task/edit/${task.id}`}>| Edit </Link> 
					<Link to={`/task/delete/${task.id}`}>| Delete </Link>
				</div>);
		});


		return(
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				
                <form onSubmit={this.addNewTask} className='add-box'>
                    <input type='text' id='new-task' placeholder="New Task..."/>
                    <input type='date' id='new-task-date' />
                    <input type='text' id='new-task-info' placeholder="Enter Task Info..."/>
                    <button className='btn btn-primary' onClick={this.addTask}>Add Task</button>
                </form>
                <div>
                    {taskArray}
                </div>
			</div>
		)
	}
}



export default Home;