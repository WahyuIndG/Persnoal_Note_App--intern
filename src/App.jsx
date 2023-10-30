import React, { useMemo, useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import HeaderWrapper from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import Alert from './components/Alert';

import DetailPageWrapper from './pages/DetailPage';
import AddPage from './pages/AddPage';
import ArchivePage from './pages/ArchivePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import ThemeContext from './Contexts/ThemeContext';
import LocaleContext from './contexts/LocaleContext';

import { putAccessToken, getUserLogged } from './utils/api';

function App() {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const localContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['auth'],
    queryFn: getUserLogged,
    retry: false,
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleLocale() {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'en' ? 'id' : 'en';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  }

  function toggleTheme() {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }

  function loginSuccessHandler(accessToken) {
    putAccessToken(accessToken);
    refetch();
  }

  function logout() {
    putAccessToken('');
    queryClient.removeQueries();
    navigate('/');
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return (
      <>
        <ThemeContext.Provider value={themeContextValue}>
          <LocaleContext.Provider value={localContextValue}>
            <Routes>
              <Route
                path="/*"
                element={<LoginPage loginSuccessHandler={loginSuccessHandler} />}
              />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
            <Alert />
          </LocaleContext.Provider>
        </ThemeContext.Provider>
      </>
    );
  }

  return (
    <>
      <ThemeContext.Provider value={themeContextValue}>
        <LocaleContext.Provider value={localContextValue}>
          <HeaderWrapper onLogout={logout} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/detail-page/:id" element={<DetailPageWrapper />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Alert />
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
