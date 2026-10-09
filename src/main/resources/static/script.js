const messageInput = document.getElementById("messageInput");
const chatMessages = document.getElementById("chatMessages");
const sendButton = document.getElementById("sendButton");

async function sendMessage() {

    const message = messageInput.value.trim();

    if (!message) {
        return;
    }

    // Add user message
    addMessage(message, "user");

    // Clear input
    messageInput.value = "";

    // Disable button
    sendButton.disabled = true;

    // Show loading
    const loadingMessage = addMessage(
        "Thinking...",
        "assistant",
        true
    );

    try {

        const response = await fetch("/chat", {
            method: "POST",

            headers: {
                "Content-Type": "text/plain"
            },

            body: message
        });

        if (!response.ok) {
            throw new Error("Server returned " + response.status);
        }

        const data = await response.text();

        // Remove loading message
        loadingMessage.remove();

        // Add AI response
        addMessage(data, "assistant");

    } catch (error) {

        console.error(error);

        loadingMessage.remove();

        addMessage(
            "Sorry, something went wrong. Please check that the Spring Boot server is running.",
            "assistant"
        );

    } finally {

        sendButton.disabled = false;

        messageInput.focus();
    }
}


function addMessage(text, sender, loading = false) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add(
        "message",
        sender
    );

    const avatar = document.createElement("div");

    avatar.classList.add("avatar");

    avatar.textContent =
        sender === "user" ? "You" : "AI";


    const content = document.createElement("div");

    content.classList.add("message-content");


    const name = document.createElement("div");

    name.classList.add("message-name");

    name.textContent =
        sender === "user"
            ? "You"
            : "Assistant";


    const bubble = document.createElement("div");

    bubble.classList.add("bubble");

    if (loading) {
        bubble.classList.add("typing");
    }

    bubble.textContent = text;


    content.appendChild(name);
    content.appendChild(bubble);

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);

    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    return messageDiv;
}


function handleKeyDown(event) {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();
    }
}


function newChat() {

    chatMessages.innerHTML = "";

    addMessage(
        "Hello! 👋\nI'm your AI assistant. Ask me anything.",
        "assistant"
    );

    messageInput.focus();
}