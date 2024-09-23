const express = require('express');
const { spawn } = require('child_process');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// Route to handle voice input
app.post('/voice-input', (req, res) => {
    const userInput = req.body.transcript;

    // Call the Python script to process the input
    const pythonProcess = spawn('python3', ['app.py', userInput]);

    pythonProcess.stdout.on('data', (data) => {
        const response = data.toString().trim();
        res.json({ response });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
