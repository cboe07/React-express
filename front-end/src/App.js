import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			theClass: []
		}
        // Make sure addStudent uses the corect 'this'
        this.addStudent = this.addStudent.bind(this);
	}

    // componentDidMount runs AFTER the first render()
    componentDidMount() {
        //getJSON request to localhost:3000...that's where Express
        $.getJSON('http://localhost:3000/getStudents', (studentsFromApi)=>{
            //log the JSON response from Express
            console.log(studentsFromApi);
            this.setState({
                theClass: studentsFromApi
            })
        });
        // Update the state..this will cause a re-render
        // this.setState({
        //     theClass: [1,2,3,4]
        // })
    }

    addStudent(event){
        var studentToAdd = event.target.parentNode.childNodes[0].value;
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
            url: "http://localhost:3000/addStudent",
            data: {name: studentToAdd}
        }).done((studentsArray)=>{
            this.setState({
                theClass: studentsArray
            })
        })
    }


	render() {

        // Create an array to dump into our return. It will contain components or HTML tags
		var theClassArray = [];
        // Loop through our state var. The first time through, it will be empty
		this.state.theClass.map((student,index)=>{
			theClassArray.push(<li key={index}>{student.name}</li>);
		});

		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				
                <div className='add-box'>
                    <input type='text' id='newStudent' />
                    <button onClick={this.addStudent}>Add Student</button>
                </div>
                <p>
                    {theClassArray}
                </p>
			</div>
		);
	}
}

export default App;
