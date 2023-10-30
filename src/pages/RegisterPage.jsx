/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/api';

import RegisterForm from '../components/RegisterForm';
import LocaleContext from '../contexts/LocaleContext';
import ThemeContext from '../contexts/ThemeContext';
import Button from '../components/Button';
import Alert from '../components/Alert';

import { PiMoonStars } from 'react-icons/pi';
import { RiSunFill } from 'react-icons/ri';
import { useMutation } from '@tanstack/react-query';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { locale, toggleLocale } = useContext(LocaleContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const {
    mutate,
    isError,
    error: errorMessage,
  } = useMutation({
    mutationKey: 'register',
    mutationFn: register,
    onSuccess: () => {
      navigate('/');
    },
  });

  async function onSubmitHandler(e, user) {
    e.preventDefault();

    mutate(user);
  }

  return (
    <main className="register-page">
      <header className="register-page__header">
        <Button
          onSubmitHandler={toggleLocale}
          Icon={null}
          title={locale === 'en' ? 'Languange' : 'Bahasa'}
        >
          {locale === 'en' ? 'ID' : 'EN'}
        </Button>
        <Button
          onSubmitHandler={toggleTheme}
          Icon={theme === 'light' ? PiMoonStars : RiSunFill}
          title={locale === 'en' ? 'Theme' : 'Tema'}
        >
          {null}
        </Button>
      </header>
      <div className="form-wrapper">
        <h1>{locale === 'en' ? 'Welcome newbie !' : 'Selamat Bergabung !'}</h1>
        <p>
          {locale === 'en'
            ? "Let's start executing your idea better and faster"
            : 'Mari mulai mengeksekusi ide dengan lebih cepat dan tepat'}
        </p>
        <RegisterForm onSubmitHandler={onSubmitHandler} />
        <p>
          {locale === 'en' ? 'Already have an account? ' : 'Sudah punya akun? '}{' '}
          <Link to="/">{locale === 'en' ? 'Sign In' : 'Masuk'}</Link>
        </p>
      </div>
      <Alert show={isError} message={errorMessage} />
    </main>
  );
}
