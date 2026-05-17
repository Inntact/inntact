import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppFull from "./App.full.jsx";
import Signup from "./Signup.jsx";
import Success from "./Success.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppFull />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}