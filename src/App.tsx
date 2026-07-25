import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import RTC from "./pages/dashboard/RTC";
import Survey from "./pages/dashboard/Survey";
import Mutation from "./pages/dashboard/Mutation";
import OCR from "./pages/dashboard/OCR";
import Assistant from "./pages/dashboard/Assistant";
import Documents from "./pages/dashboard/Documents";
import Updates from "./pages/dashboard/Updates";
import Voice from "./pages/dashboard/Voice";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===================================== */}
        {/* LANDING PAGE */}
        {/* ===================================== */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ===================================== */}
        {/* AUTHENTICATION */}
        {/* ===================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ===================================== */}
        {/* MAIN DASHBOARD */}
        {/* ===================================== */}

        <Route
          path="/dashboard"
          element={<ProtectedRoute>
          <Dashboard />
          </ProtectedRoute>}
        />


        {/* ===================================== */}
        {/* DASHBOARD SERVICES */}
        {/* ===================================== */}

        <Route
          path="/rtc"
          element={<ProtectedRoute><RTC /></ProtectedRoute>}
        />

        <Route
          path="/survey"
          element={<ProtectedRoute><Survey /></ProtectedRoute>}
        />

        <Route
          path="/mutation"
          element={<ProtectedRoute><Mutation /></ProtectedRoute>}
        />

        <Route
          path="/ocr"
          element={<ProtectedRoute><OCR /></ProtectedRoute>}
        />

        <Route
          path="/assistant"
          element={<ProtectedRoute><Assistant /></ProtectedRoute>}
        />

        <Route
          path="/documents"
          element={<ProtectedRoute><Documents /></ProtectedRoute>}
        />

        <Route
          path="/updates"
          element={<ProtectedRoute><Updates /></ProtectedRoute>}
        />

        <Route
          path="/voice"
          element={<ProtectedRoute><Voice /></ProtectedRoute>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;