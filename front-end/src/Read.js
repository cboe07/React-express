import React, { Component } from 'react';
import $ from 'jquery';

class Read extends Component{

	constructor(props) {
		super(props);
		this.state = {
			taskData: {}
		}
		this.goHome = this.goHome.bind(this);
		
	}

	componentDidMount() {
		var taskId = this.props.match.params.taskId;
		$.getJSON(`http://localhost:3000/getTask/${taskId}?api_key=abcdefg`, (taskData)=>{
			this.setState({
				taskData: taskData
			})
		})
	}

	goHome(){
		this.props.history.push('/');
	}
	

	render(){
		
		return(
			<div>
				<h2>{this.state.taskData.taskName}</h2>
				<p>{this.state.taskData.taskDate}</p>
				<p>{this.state.taskData.taskInfo}</p>
				<button onClick={this.goHome} className='btn btn-warning'>Back</button>
			</div>
			
		)
	}
}

export default Read;