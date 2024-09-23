const startBtn = document.getElementById("start-btn");
const transcriptDisplay = document.getElementById("transcript");
const responseDisplay = document.getElementById("response");

// Check if the Web Speech API is supported
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    // Start recognizing when the button is clicked
    startBtn.addEventListener("click", () => {
        recognition.start();
    });

    // Capture the speech and display it on the page
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        transcriptDisplay.innerText = `You said: ${transcript}`;
        sendToBackend(transcript);
    };

    recognition.onerror = function(event) {
        console.error(event.error);
        transcriptDisplay.innerText = "Error occurred in recognition: " + event.error;
    };
} else {
    transcriptDisplay.innerText = "Web Speech API is not supported in this browser.";
}

// Function to send the transcript to the backend for AI processing
function sendToBackend(transcript) {
    fetch('http://localhost:3000/voice-assistant', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: transcript }),
    })
    .then(response => response.json())
    .then(data => {
        responseDisplay.innerText = `AI Response: ${data.reply}`;
    })
    .catch(error => {
        console.error('Error:', error);
        responseDisplay.innerText = "Error fetching AI response.";
    });
}
