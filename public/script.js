const startBtn = document.getElementById('start');
const responseText = document.getElementById('response');

// Capture voice input
startBtn.addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('User said:', transcript);

        // Send voice input to server
        fetch('/voice-input', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transcript }),
        })
        .then(response => response.json())
        .then(data => {
            responseText.textContent = data.response;
        })
        .catch(err => console.error(err));
    };

    recognition.onerror = (event) => {
        console.error(event.error);
    };
});
