import './App.css';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/Footer'
import Emprestimo from './pages/Emprestimo/Emprestimo';
import Equipamento from './pages/Equipamento/Equipamento';
import Cliente from './pages/Cliente/Cliente';
import Login from './pages/Login/Login';

import { AuthProvider, useAuth } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const hideNavbarRoutes = ["/"];

  if (isAuthenticated === undefined) {
    return null; 
  }


  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/emprestimo" element={<PrivateRoute><Emprestimo /></PrivateRoute>} />
        <Route path="/cliente" element={<PrivateRoute><Cliente /></PrivateRoute>} />
        <Route path="/equipamento" element={<PrivateRoute><Equipamento /></PrivateRoute>} />
      </Routes>

      <Footer />
    </>
  );
}
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children; 
}

export default App;
