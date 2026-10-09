# Spring AI Chatbot with OpenRouter

An AI-powered chatbot built with **Java, Spring Boot, Spring AI, and
OpenRouter**. It provides a browser-based chat interface and can use
external tools for arithmetic calculations, current weather information,
and currency conversion.

## Features

-   **AI conversations:** Connects to language models through
    OpenRouter's OpenAI-compatible API.
-   **Tool calling:** Allows the model to request an appropriate Java
    tool when needed.
-   **Calculator:** Performs supported arithmetic operations.
-   **Weather information:** Retrieves current weather for a city using
    WeatherAPI.com.
-   **Currency conversion:** Integrates the currency exchange service
    configured in the project.
-   **Web interface:** Uses HTML, CSS, and JavaScript for a responsive
    chat experience.
-   **REST API:** Connects the browser frontend to the Spring Boot
    backend.
-   **Modular code:** Keeps chat logic, the controller, and individual
    tools separate.

## Tech Stack

-   **Language:** Java
-   **Backend:** Spring Boot, Spring AI
-   **LLM provider:** OpenRouter
-   **Frontend:** HTML, CSS, JavaScript
-   **External APIs:** WeatherAPI.com and the currency exchange service
    configured in the project
-   **Build tool:** Gradle
-   **API testing:** Postman

## How It Works

1.  The user submits a message through the web interface.
2.  JavaScript sends the message to the Spring Boot endpoint.
3.  `ChatController` passes the message to `ChatService`.
4.  Spring AI sends the conversation to a model through OpenRouter.
5.  When appropriate, the model requests a tool such as the calculator,
    weather tool, or currency converter.
6.  The tool executes and returns its result to the model.
7.  The model produces a natural-language answer, which the frontend
    displays.

## Project Structure

``` text
springChatbot/
├── src/
│   └── main/
│       ├── java/com/example/springchatbot/
│       │   ├── ChatController.java
│       │   ├── ChatService.java
│       │   └── aitools/
│       │       ├── CalculatorTool.java
│       │       ├── WeatherTool.java
│       │       └── CurrencyExchangeTool.java
│       └── resources/
│           ├── application.properties
│           └── static/
│               ├── index.html
│               ├── style.css
│               └── script.js
├── build.gradle
└── README.md
```

*The structure above is illustrative; filenames may differ depending on
your current project.*

## Prerequisites

-   A compatible JDK installed
-   The Gradle wrapper included with the project
-   An OpenRouter API key
-   A WeatherAPI.com API key
-   Any credentials required by the currency exchange service used by
    your implementation

## Setup and Run

### 1. Clone the repository

``` bash
git clone <your-repository-url>
cd springChatbot
```

Replace `<your-repository-url>` with your GitHub repository URL.

### 2. Configure API keys

In `src/main/resources/application.properties`, configure the
integrations. For example:

``` properties
spring.application.name=demo

spring.ai.openai.api-key=${OPENROUTER_API_KEY}
spring.ai.openai.base-url=https://openrouter.ai/api/v1
spring.ai.openai.chat.model=openrouter/free

weather.api.key=${WEATHER_API_KEY}
```

Configure any currency API properties required by your implementation.

Set the environment variables in the same terminal before starting the
app.

**Linux/macOS:**

``` bash
export OPENROUTER_API_KEY="your-openrouter-key"
export WEATHER_API_KEY="your-weatherapi-key"
```

**Windows PowerShell:**

``` powershell
$env:OPENROUTER_API_KEY="your-openrouter-key"
$env:WEATHER_API_KEY="your-weatherapi-key"
```

Use a model ID supported by OpenRouter. The `openrouter/free` router
selects an available free model, but model availability and provider
limits can change.

### 3. Start the application

**Linux/macOS:**

``` bash
./gradlew bootRun
```

**Windows:**

``` bat
gradlew.bat bootRun
```

Wait for Spring Boot to finish starting and confirm that the server is
listening on port `8080`.

### 4. Open the chatbot

Visit:

``` text
http://localhost:8080/index.html
```

Send a message in the chat interface to test the application.

## Example Prompts

-   `Explain how Spring Boot works.`
-   `What is 125 multiplied by 48?`
-   `What is the current weather in Mangalore?`
-   `Convert 100 USD to INR.`

Tool availability depends on the implementation, API configuration, and
whether the selected model supports the required tool-calling behavior.

## Troubleshooting

- **Frontend does not load:** Confirm that the files are under
    `src/main/resources/static` and that Spring Boot is running.
-   **404 on chat requests:** Ensure the frontend request path matches
    the controller mapping. With `@RequestMapping("/chat")` and a bare
    `@PostMapping`, the endpoint is `POST /chat`.
-   **API authentication errors:** Check that environment variables are
    set in the terminal or run configuration used to start the
    application. Never share your keys.
-   **Weather errors:** Confirm that `weather.api.key` contains a
    WeatherAPI.com key, because the current `WeatherTool` uses
    `https://api.weatherapi.com/v1`.
-   **Tool-calling errors:** Check the Spring Boot console and verify
    that the chosen OpenRouter model supports the tools used by the
    application.

## Security Notes

-   Never commit API keys, passwords, or other secrets to GitHub.
-   Prefer environment variables or a local, untracked configuration
    file for secrets.
-   If a key has been exposed, revoke it and create a replacement.
-   Before deploying publicly, add appropriate authentication,
    validation, rate limiting, and error handling.

## Future Improvements

-   Persist conversations in a database.
-   Support separate conversation histories for different users.
-   Add streaming responses and improved Markdown rendering.
-   Add authentication and rate limiting.
-   Containerize the application with Docker and deploy it to a hosting
    platform.

## Learning Outcomes

This project demonstrates integration of a language model into a Spring
Boot application, REST API development, AI tool calling, external API
consumption, and frontend-backend communication.

## License

No license is specified by default. If you want others to reuse or
modify this project, choose and add an appropriate open-source license.
