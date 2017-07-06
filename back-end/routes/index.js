// EXPRESS SERVER
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'x',
	password: 'x',
	database: 'todo'
})

connection.connect();

// Setup a route to handle React's first request
router.get('/getTasks', function(req, res, next) {
	connection.query('SELECT * FROM tasks', (error, results)=>{
		if (error) throw error;
		res.json(results);
	})
	// res.json({
	// 		students: [
	// 			'Marissa',
	// 			'Merilee',
	// 			'Chris',
	// 			'Stephen',
	// 			'Chad',
	// 			'Shane'
	// 		]
	// 	})
});

// addStudent route. Expects a name in the body, will add that name to the students table,
// then respond with all students in that table
router.post('/addTask', (req,res)=>{
	var taskToAdd = req.body.name;
	connection.query('INSERT INTO tasks (taskName) VALUES (?)', [taskToAdd], (error, result)=>{
		if (error) throw error;
		connection.query('SELECT * FROM tasks', (error2, results2)=>{
			if (error2) throw error2;
			res.json(results2);
		})
	})
	// res.json(msg: 'test')
});

module.exports = router;
