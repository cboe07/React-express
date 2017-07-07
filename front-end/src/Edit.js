import React, { Component } from 'react';
import $ from 'jquery';

class Edit extends Component{

	constructor(props) {
		super(props);
		this.state = {
			taskData: {}
		}
	
		
	}

	componentDidMount() {
        var taskId = this.props.match.params.taskId
        $.getJSON(`http://localhost:3000/getTask/${taskId}`, (taskData)=>{
            this.setState({
                taskData: taskData
            });
        });
    }


	render(){
		
		return(
			<div className='container'>
				<form>
					<input type='text' value={this.state.taskData.taskName} />
					<input type='text' value={this.state.taskData.taskDate} />
					<input type='text' value={this.state.taskData.taskInfo} />
					<button onClick={this.goHome} className='btn btn-warning'>Back</button>
				</form>
			</div>
			
		)
	}
}

export default Edit;