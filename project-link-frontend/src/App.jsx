import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import ProtectedRoute from './components/protectedRoute';

import "./App.css"
import Register from './pages/signUp';
import Clients from './pages/admin/client';
import Projects from './pages/admin/projects';
import ClientProfile from './pages/user/client-profile';
import SignIn from './pages/signIn';
import NavbarComponent from './components/navbar';
import AdminDashboard from './pages/admin/adminDashboard';
import ClientProject from './pages/user/clientProject';
import ClientDashboard from './pages/user/clientDashboard';
import Footer from './components/footer';

function App() {
  return (
<div className='d-flex flex-column min-vh-100'>
        <NavbarComponent />
        <main className='flex-fill'>
          <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />

            <Route path="/projects" element={
            <ProtectedRoute role="admin">
              <Projects />
            </ProtectedRoute>
          } />

          <Route path="/client-dashboard" element={
            <ProtectedRoute role="user">
              <ClientDashboard /> 
            </ProtectedRoute>
          } />

           <Route path="/client-project" element={
            <ProtectedRoute role="user">
              <ClientProject />
            </ProtectedRoute>
          } />

          <Route
          path="/client-profile"
          element={
            <ProtectedRoute>
              <ClientProfile />
            </ProtectedRoute>}/>

       
        <Route path="/admin-dashboard" element={
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>} />

        <Route path="/clients" element={
          <ProtectedRoute role="admin">
            <Clients />
          </ProtectedRoute>} />
        </Routes>
        </main>
    
        <Footer />
   </div>
  );
}

export default App;
