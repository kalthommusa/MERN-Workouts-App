# MERN Workout App

This Workout project is a full-stack MERN (MongoDB, Express, React, Node.js) application for managing workouts. It provides a user-friendly interface for tracking workouts, enhancing fitness routines. The app features secure user authentication, workout creation, editing, and deletion (CRUD operations). Each user’s data is stored independently, ensuring privacy and personalized access.


## Features
- **User Authentication**: Secure signup and login/logout with JWT-based authentication, ensuring that only authenticated users can access their workouts.

- **Workout Management**: Add, update, and delete workouts. Each workout includes details such as title, load, and reps.

- **User-Specific Workouts**: Each user's workouts are uniquely associated with their ID in MongoDB, ensuring that users can only view and manage their own workouts.

- **Data Privacy and Security**: By associating workouts with user IDs, data privacy is maintained. Only authenticated users can create, access, or manipulate their workouts, protecting sensitive data.

- **API Route Protection**: The app uses middleware to verify user identity before allowing access to any workout-related operations, preventing unauthorized access.

- **Multi-User System**: Supports multiple users independently, providing each user with a personalized workout history and ensuring scalability across users.

- **Responsive UI**: Built with React, the application features a clean interface for easy user interaction and responsive design.

- **Error Handling and Validation**: Provides validations for required fields and displays error messages for failed actions, creating a smoother user experience.


## Project Structure
The project is structured into frontend and backend sections. The backend manages API endpoints and database interaction, while the frontend handles user interaction and interface:


### Backend Structure
- **`server.js`**: Initializes the Express server, connects to MongoDB, and sets up routes and middleware.

- **`middleware/requireAuth.js`**: Auth middleware to protect routes; verifies the user's JWT token.

- **`routes/`**:
  - `workouts.js`: Manages CRUD routes for workouts.
  - `user.js`: Manages user authentication (signup and login).

- **`models/`**:
  - `workoutModel.js`: Defines the MongoDB schema for workouts.
  - `userModel.js`: Defines the MongoDB schema for users.

- **`controllers/`**:
  - `workoutController.js`: Contains logic for creating, reading, updating, and deleting workouts.
  - `userController.js`: Handles user registration and login.


### Frontend Structure
- **`App.js`**: The main application component, handles route definitions.

- **`components/`**: Reusable UI components, including:
  - `Navbar.js`: Header with navigation links.
  - `Footer.js`: Footer component.
  - `Spinner.js`: Displays a loading spinner during data fetches or actions.
  - `WorkoutDetails.js`: Displays workout information.
  - `CreateWorkout.js` and `UpdateWorkout.js`: Forms to add and edit workouts. 

- **`pages/`**:
  - `Home.js`: Main dashboard displaying all workouts.
  - `ManageWorkout.js`: Workout-specific management page.
  - `Signup.js` and `Login.js`: Authentication pages.
  - `NotFound.js`: Error page for undefined routes.

- **`context/`**: Context and reducer functions for state management, including:
  - `AuthContext.js`: Authenticates users across the app.
  - `WorkoutsContext.js`: Manages CRUD actions on workouts.

- **`hooks/`**: 
  - **`useAuthContext.js`** and **`useWorkoutsContext.js`**: Provides global state management for authentication and workout data.
  - **`useSignup.js`**: Handles user signup, managing the backend API request and state.
  - **`useLogin.js`**: Manages user login, handling API requests, state, and session persistence.
  - **`useLogout.js`**: Handles user logout, clearing local storage, and updating app state.
  - **`useCreateWorkout.js`**: Manages API calls and state for creating new workouts.
  - **`useFetchWorkouts.js`**: Fetches and manages data for all workouts specific to the user.
  - **`useFetchSingleWorkout.js`**: Fetches and manages data for a single workout, handling loading and error states.
  - **`useUpdateWorkout.js`**: Manages updating a workout, handling API calls and state updates. 
  - **`useDeleteWorkout.js`**: Handles workout deletion, interacting with the backend and updating app state.


## Routes

### Frontend Routes
- **`/signup`**: Signup page for new users.
- **`/login`**: Login page for existing users.
- **`/`**: Displays the user's workouts (requires authentication).
- **`/:id`**: Manages a specific workout with options to edit or delete.

### Backend API Endpoints

### User Routes :
  - **POST** `/api/user/signup`: Registers a new user.
  - **POST** `/api/user/login`: Authenticates an existing user and returns a JWT.

### Workout Routes (Protected) :
  - **GET** `/api/workouts`: Retrieves all workouts for the authenticated user.
  - **POST** `/api/workouts`: Creates a new workout.
  - **GET** `/api/workouts/:id`: Retrieves a specific workout.
  - **PATCH** `/api/workouts/:id`: Updates a specific workout.
  - **DELETE** `/api/workouts/:id`: Deletes a specific workout.


## Technologies Used

- **Frontend**: 
  - React
  - React Router DOM
  - CSS for styling

- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JSON Web Tokens (JWT) for authentication

- **Environment**:
  - dotenv for environment variable management


## MongoDB
- The project uses MongoDB as the database to store the workout data and user information. Thus, there are two main collections in the MongoDB database:

1- **users**
2- **workouts**

![alt text](/readme-imgs/mongodb.png)


## Application Demo

The following screenshots provide a visual walkthrough of the MERN Workout App, showcasing its key features and user interface flow. These images illustrate the signup, login, workout management, and error handling processes, giving an insight into how the application works.

![alt text](/readme-imgs/1-signp.png)
![alt text](/readme-imgs/2-signp.png)
![alt text](/readme-imgs/3-signp.png)
![alt text](/readme-imgs/5-signp.png)
![alt text](/readme-imgs/6-signp.png)
![alt text](/readme-imgs/7-signp.png)
![alt text](/readme-imgs/8-login.png)
![alt text](/readme-imgs/9-login.png)
![alt text](/readme-imgs/10-login.png)
![alt text](/readme-imgs/11-login.png)
![alt text](/readme-imgs/12-login.png)
![alt text](/readme-imgs/13-home.png)
![alt text](/readme-imgs/14-edit.png)
![alt text](/readme-imgs/15-edit.png)
![alt text](/readme-imgs/16-edit.png)
![alt text](/readme-imgs/17-delete.png)
![alt text](/readme-imgs/18-delete.png)
![alt text](/readme-imgs/19-create.png)
![alt text](/readme-imgs/20-create.png)
![alt text](/readme-imgs/21-create.png)
![alt text](/readme-imgs/22-notfound.png)