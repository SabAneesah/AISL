import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Register from "./Pages/Register";
import UserRoute from "./routes/UserRoute";
import ChatbotPage from "./Pages/Chatbot/ChatbotPage";
import GetStart from "./Pages/Chatbot/GetStart";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ChatbotPage" element={<ChatbotPage />} />
          <Route path="/GetStart" element={<GetStart />} />
        </Routes>
      </Router>
      <UserRoute />
    </>
  );
}

export default App;
