# Genchat

## What is this project?

This project is the frontend application for Genchat, a web-based chat application that utilizes a backend API for user authentication and interaction with the Gemini API for generating responses to user queries. The frontend is built using Streamlit, a Python library for building interactive web applications.

## Features

- User authentication and signup
- Real-time chat interface powered by the Gemini API
- Simple and intuitive user interface

## Prerequisites

Before running this application locally, ensure you have the following installed:

- Python (version 3.6 or higher)
- pip (Python package installer)
- Node.js (version 12 or higher)
- npm (Node package manager)

## How to Run

### Backend (Nest.js)

1. Clone the backend repository to your local machine:

    ```bash
    git clone https://github.com/your-username/genchat-backend.git
    ```

2. Navigate to the backend project directory:

    ```bash
    cd genchat-backend
    ```

3. Install the required dependencies using npm:

    ```bash
    npm install
    ```

4. Start the Nest.js server:

    ```bash
    npm run start:dev
    ```

5. The backend server will start running on your local machine.

### Frontend (Streamlit)

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/your-username/genchat-frontend.git
    ```

2. Navigate to the frontend project directory:

    ```bash
    cd genchat-frontend
    ```

3. Install the required dependencies using pip:

    ```bash
    pip install -r requirements.txt
    ```

4. Start the Streamlit application:

    ```bash
    streamlit run frontend.py
    ```

5. The frontend application will start running on your local machine. Open your web browser and go to the following URL:

    ```
    http://localhost:8501
    ```

6. You should see the Genchat homepage where you can login or signup to access the chat interface.

## Configuration

Before running the application, make sure to configure the backend API URLs in the `frontend.py` file. Update the following variables with the appropriate URLs:

- `BASE_URL`
- `LOGIN_URL`
- `SIGNUP_URL`
- `GENCHAT_URL`

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
