import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import {Toaster} from "sonner";
import Login from "./components/Login";
import Register from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Navbar />
            <Dashboard />
           </ProtectedRoute>
        } />
      </Routes>
    </Router>
    <Toaster />
    </>
  );
}

export default App;