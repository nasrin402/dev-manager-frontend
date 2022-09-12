import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import { ContactContext } from "./components/ContactContext/ContactContext";
import AuthProvider from "./components/authContext/AuthContext";
import { BrowserRouter } from "react-router-dom";
import App from "./routes/App";

ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <AuthProvider>
        <ContactContext>
          <App/>
        </ContactContext>
      </AuthProvider>
    </BrowserRouter>
);
