import './index.css'
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Login from "./pages/Login";
export default function App() {
  return (
      <>
          <div className="flex flex-col min-h-screen">
              {/* Your other components like Navbar, Routes, etc. */}
              <main className="flex-grow">
                  {/* App content */}
              </main>
              <Routes>
                  <Route path="/login" element={<Login />} />
              </Routes>

              <Footer />
          </div>
      </>

  );
}
