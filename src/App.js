import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Pages(FE)/Home";
import Signin from "./Pages(FE)/Signin";
import Register from "./Pages(FE)/Register"
import UserRoute from "./routes/UserRoute";

function App() {
  return (
    <>
    <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/register" element={<Register />} />
            </Routes>
    </Router>
    <UserRoute/>
    </>
  );
}

export default App;
