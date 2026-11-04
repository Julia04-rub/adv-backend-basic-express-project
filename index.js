const express = require('express');

// Create an Express application
const app = express();

// Define the server port
const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Step 7: Logging middleware (runs for every request)
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

// Root route (GET request)
app.get('/', (req, res) => {
    res.send('Welcome to my Express server!');
});

// Sample API route returning JSON data
app.get('/api/status', (req, res) => {
    res.json({
        status: 'success',
        message: 'Server is running smoothly'
    });
});

// Step 2: About and Contact pages
app.get('/about', (req, res) => {
    res.send('This is the About page of my Express server.');
});

app.get('/contact', (req, res) => {
    res.send('Contact us at: hello@example.com');
});

// Step 3: Users list (JSON)
app.get('/users', (req, res) => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Carol' }
    ];
    res.json(users);
});

// Step 4: Route parameter
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    res.send(`You requested user with ID: ${id}`);
});

// Step 5: Query parameter
app.get('/search', (req, res) => {
    const name = req.query.name;
    res.send(`You searched for: ${name}`);
});

// Step 6: POST request
app.post('/users', (req, res) => {
    const user = req.body;
    res.status(201).json({
        message: 'User received successfully',
        user: user
    });
});

// Challenge: Courses API
let courses = [
    { id: 1, title: 'Web Technologies' },
    { id: 2, title: 'Mobile Application Development' }
];

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.get('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === Number(req.params.id));
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
});

app.post('/courses', (req, res) => {
    const newCourse = {
        id: courses.length + 1,
        title: req.body.title
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});