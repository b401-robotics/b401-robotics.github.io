import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import { LandingPage } from "./pages/LandingPage";

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element={<LandingPage />} />

          {/* Section pages: /highlight, /equipment, /practicums, etc. */}
          <Route path="/:section" element={<LandingPage />} />

          {/* Fallback: redirect any unknown path to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
