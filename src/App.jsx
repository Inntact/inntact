import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppFull from "./App.full.jsx";
import Signup from "./Signup.jsx";
import Success from "./Success.jsx";
import Privacy from "./Privacy.jsx";
import Terms from "./Terms.jsx";
import Contact from "./Contact.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppFull />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/success" element={<Success />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}