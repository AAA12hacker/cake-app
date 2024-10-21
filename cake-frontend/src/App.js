import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CakeList from "./components/CakeList";
import CakeForm from "./components/CakeForm";
import CakeDetails from "./components/CakeDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { CakeProvider } from "./context/CakeContext";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CakeProvider>
          <Navbar />
          <ErrorBoundary>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<CakeList />} />
                <Route path="/add-cake" element={<CakeForm />} />
                <Route
                  path="/cakes/edit/:id"
                  element={<CakeForm edit={true} />}
                />
                <Route path="/cakes/:id" element={<CakeDetails />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </CakeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
