import { BrowserRouter, Route, Routes } from "react-router-dom"

import Analytics from "./pages/Analytics"
import Dashboard from "./pages/Dashboard"
import Insights from "./pages/Insights"
import Login from "./pages/Login"
import Predictions from "./pages/Predictions"
import Properties from "./pages/properties"
import PropertyDetails from "./pages/PropertyDetails"
import Settings from "./pages/Settings"
import Signup from "./pages/Signup"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:title" element={<PropertyDetails />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}
