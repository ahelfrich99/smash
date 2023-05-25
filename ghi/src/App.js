// import { useEffect, useState } from "react";
// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";

import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import { Main } from "./Main";
import LoginForm from "./login-signup/LoginForm";
import Navbar from "./Navbar";
import SignupForm from "./login-signup/SignupForm";
import Example from "./mock-pages/Example";


function App() {
  // const basename = 'localhost:3000';

  return (
    <div className="container">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Main />} />

            <Route exact path="/signup" element={<SignupForm />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/home" element={<Main />} />
            <Route exact path="/mock" element={<Example />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
