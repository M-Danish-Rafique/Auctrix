import './App.css';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import React from 'react';

  
function App() {
  const isLoggedIn = false;

  return (
    <div>
      {!isLoggedIn ? (
        <LoginPage />
        // Render the login page if the user is not logged in
      ) : (
        <Sidebar />
        // Render the main application or protected routes here
      )}
    </div>
  );
}

export default App;
