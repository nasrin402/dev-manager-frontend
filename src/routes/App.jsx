import { useState } from "react";
import "./App.css";
import Menu from "../layouts/Menu";

import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contacts from "../pages/Contacts";
import AddContacts from "../pages/AddContacts";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { ToastContainer } from "react-toastify";
import ContactDetails from "../pages/ContactDetails";
import EditContact from "../pages/EditContact";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Profile from "../pages/Profile";
import ManagePassword from "../pages/ManagePassword";
import UserContactList from "../pages/UserContactList";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
function App() {
 
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Menu />
      <div className="container text-white">
        <Routes>
          <Route index element={<Home />} />

          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <Contacts  />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-contact"
            element={
              <PrivateRoute>
                <AddContacts />
              </PrivateRoute>
            }
          />
          <Route
            path="/contacts/:id"
            element={
              <PrivateRoute>
                <ContactDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-contact/:id"
            element={
              <PrivateRoute>
                <EditContact />
              </PrivateRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="manage-password" element={<ManagePassword />} />
            <Route path="contact-list" element={<UserContactList />} />
            
          </Route>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
