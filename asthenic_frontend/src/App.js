import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';
import LandingPage from './container/LandingPage';
import { fetchUser } from './utils/fetchUser';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const user = await fetchUser();
      if (!user) {
        navigate('/login');
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
        <Route path="/lp" element={<LandingPage />} />
      </Routes>
    </>
  );
};

export default App;
