import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import Navbar from "./components/Navbar";

import useAuthContext from "./hooks/useAuthContext";

const App = () => {
    const { user } = useAuthContext();
    return (
        <div className="App">
            <Router>
                <Navbar />
                <div className="pages">
                    <Routes>
                        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
                        <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/" />} />
                        <Route path="/login" element={!user ? <Login/>: <Navigate to="/" />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default App;
