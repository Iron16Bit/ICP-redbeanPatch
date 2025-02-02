// Establish a connection to the SSE server
// The redbean sends MSGs to the browser client from here
const eventSource = new EventSource('http://localhost:3000');

// Local URL of the redbean HTTP server
// The browser client can send MSGs to the redbean from here
const redbean_url = "http://127.0.0.1:8080";

// "Enum" with the various msg types
// INTERNAL_PING = 0; 
// PONG = 1; 
// SETUP = 2;
// PING = 3;

// Utilities to transform a MSG JSON into a string and viceversa 
function serializeMsg(msg) {
    // Ensure the object contains the necessary fields
    if (!msg.sender_ip || !msg.type || !msg.data) {
        throw new Error("Invalid message structure");
    }

    // Serialize as a delimited string
    return `${msg.sender_ip}|${msg.type}|${msg.data}`;
}

function deserializeMsg(str) {
    // Split the string by the delimiter
    const parts = str.split("|");
    if (parts.length !== 3) {
        throw new Error("Invalid serialized message format");
    }

    // Reconstruct the JSON object
    return {
        sender_ip: parts[0],
        type: parseInt(parts[1], 10), // Convert type to an integer
        data: parts[2],
    };
}

// Triggered when a message is received from the server
eventSource.onmessage = (event) => {
    try {
        // Deserialize the message
        const message = deserializeMsg(event.data);

        // Log the reconstructed message
        console.log('Deserialized Message:', message);

        // If the message is an INTERNAL_PING, answer with a PONG
        if (message.type == 0) {
            const PONG = {
                sender_ip: "localhost",
                type: 1,
                data: "NULL"
            };
            const serialized_msg = serializeMsg(PONG);

            fetch(redbean_url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "text": serialized_msg
                }
            });
        } else if (message.type == 2) {
            // Received a SETUP msg
            document.getElementById("local_ip").textContent += " " + message.data;
        }
    } catch (error) {
        console.error('Failed to deserialize message:', error);
    }
};

// Triggered when the connection is opened
eventSource.onopen = () => {
    console.log('Connection to SSE server opened.');
};

// Triggered when an error occurs
eventSource.onerror = (error) => {
    console.error('Error with SSE connection:', error);
};