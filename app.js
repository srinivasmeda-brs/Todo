const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = [];
let completedTasks = [];

// Home Route
app.get('/', (req, res) => {
    res.render('index', { tasks, completedTasks });
});

// Add Task Route
app.post('/add-task', (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push(newTask);
    }
    res.redirect('/');
});

// Complete Task Route
app.post('/complete-task', (req, res) => {
    const completedTask = req.body.completedTask;
    if (completedTask) {
        tasks = tasks.filter(task => task !== completedTask);
        completedTasks.push(completedTask);
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});