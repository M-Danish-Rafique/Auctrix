import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import React from 'react';
import SellerDashboard from './pages/SellerDashboard';
import ProductsPage from './pages/ProductsPage';
import ListingsPage from './pages/ListingsPage';
import SellerNotificationsPage from './pages/SellerNotificationsPage';
import SellerProfilePage from './pages/SellerProfilePage';
import SellerMessagesPage from './pages/SellerMessagesPage';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzQ2ZDg0OGRjYmY4Yjc0MmQ5ZWZmZTQiLCJ1c2VyUm9sZSI6InNlbGxlciIsImlhdCI6MTczMzU2Mjc2NCwiZXhwIjoxNzM0ODU4NzY0fQ.s9BQzmIbE8ITd9F-2LAuTUtuelQhR7h2J_bUsuCF9HI";
  
function App() {
  return (   
  <Router>
    <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/Register" element={<RegisterPage />} />
    <Route path="/ForgotPassword" element={<ForgotPasswordPage />} />
    <Route path="/SellerDashboard" element={<SellerDashboard key={token} />} />
    <Route path="/Products" element={<ProductsPage key={token} />} />
    <Route path="/Listings" element={<ListingsPage key={token} />} />
    <Route path="/SellerMessages" element={<SellerMessagesPage key={token} />} />
    <Route path="/SellerNotifications" element={<SellerNotificationsPage key={token} />} />
    <Route path="/SellerProfile" element={<SellerProfilePage key={token} />} />    
  </Routes>
</Router>
    // <SellerDashboard/>
    // <LoginPage />
    // <ForgotPasswordPage />
  );
}

export default App;
