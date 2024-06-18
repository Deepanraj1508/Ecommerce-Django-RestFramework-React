# E-commerce Website (Django + React)

This project is a full-stack e-commerce website built using Django for the backend and React for the frontend. The website allows users to browse products, add them to a cart, and complete the purchase process.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Features](#features)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Python (>= 3.7)
- React.js (>= 12.x)
- npm (>= 6.x) or yarn (>= 1.22.x)
- MySQL 

## Installation

Follow these steps to get the project up and running on your local machine.

### Backend Setup (Django)

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/ecommerce-django-react.git
    cd ecommerce-django-react
    ```

2. **Create a virtual environment:**
    ```bash
    python -m env venv
    ```

3. **Activate the virtual environment:**
    - On Windows:
        ```bash
        env\Scripts\activate
        ```
    - On macOS/Linux:
        ```bash
        source env/bin/activate
        ```

4. **Install backend dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

5. **Set up the database:**
    - Create a MySQL database and user.
    - Update the `DATABASES` setting in `backend/settings.py` with your database credentials.

6. **Apply database migrations:**
    ```bash
    python manage.py makemigrations
    ```

7. **Apply database migrations:**
    ```bash
    python manage.py migrate
    ```



### Frontend Setup (React)

1. **Navigate to the frontend directory:**
    ```bash
    cd front-end
    ```

2. **Install frontend dependencies:**
    ```bash
    npm install
    ```
    Or, if you're using yarn:
    ```bash
    yarn install
    ```

## Running the Project

### Running the Backend Server

1. **Navigate to the Backend directory:**
    ```bash
    cd Backend
    ```

1. **Start the Django development server:**
    ```bash
    python manage.py runserver
    ```

### Running the Frontend Development Server

1. **Navigate to the frontend directory:**
    ```bash
    cd front-end
    ```

2. **Start the React development server:**
    ```bash
    npm start
    ```
    Or, if you're using yarn:
    ```bash
    yarn start
    ```

3. Open your browser and navigate to `http://localhost:3000` to view the website.

## Project Structure

ecommerce-django-react:
  backend:
    description: Django backend directory
    files:
      - manage.py: Django management script
      - settings.py: Django settings
      - ...: Other backend files
  frontend:
    description: React frontend directory
    files:
      - public/: Public assets
      - src/: React source files
      - package.json: React.js dependencies and scripts
      - ...: Other frontend files
  env:
    description: Python virtual environment
  requirements.txt:
    description: Python dependencies
  README.md:
    description: Project README file


## Features

- User authentication (registration, login, logout)
- Product listing and detail views
- Shopping cart functionality
- Checkout process
- Order history and management

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to customize this README file to fit the specifics of your project. If you have any questions or need further assistance, please refer to the project's documentation or contact the repository owner.
