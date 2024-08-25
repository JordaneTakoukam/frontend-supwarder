import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import './styles/global.css'; // Import des styles globaux
import { ToastContainer } from 'react-toastify';
import { config } from './_config/static_keys';
import { decodeToken, isUserAuthenticated } from './middleware/middleware';
import createToast from './_config/toast_model';

const App = () => {

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const dataToken = await isUserAuthenticated();

        if (dataToken.status === false) {
          const currentPath = window.location.pathname;

          // Vérifie si le chemin commence par "/dashboard"
          if (currentPath.startsWith("/dashboard")) {

            createToast("Séssion expirée, veuillez vous reconnecter", 1);

            setTimeout(() => {
              window.location.href = "/login";
            }, 2000);


          }
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification :", error);
      }
    };

    checkAuthentication();
  }, []);





  return (
    <>
      <ToastContainer />

      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </Router></>
  );
}

export default App;
