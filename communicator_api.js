// Establish a connection to the SSE server
const eventSource = new EventSource('http://localhost:3000');

// Triggered when a message is received from the server
eventSource.onmessage = (event) => {
    console.log('Message from SSE server:', event.data);
};

// Triggered when the connection is opened
eventSource.onopen = () => {
    console.log('Connected to the SSE server.');
};

// Triggered when an error occurs or the connection is closed
eventSource.onerror = (error) => {
    console.error('Error or connection closed:', error);
    // Optionally close the connection if needed
    eventSource.close();
};