import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from '../contexts/ThemeContext';

const Alert = ({ message, show }) => {
  const [display, setDisplay] = useState(show);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (show) {
      setDisplay(show);
    }
  }, [show]);

  const style = {
    visibility: display ? 'visible' : 'hidden',
    opacity: display ? 1 : 0,
    tranform: display ? 'scale(1)' : 'scale(0)',
  };

  return (
    <aside className="alert" style={style}>
      <span>🤔</span>
      <p style={{ color: theme === 'light' ? 'black' : 'black' }}>{message}</p>
      <button onClick={() => setDisplay(false)}>OKAY</button>
    </aside>
  );
};

export default Alert;

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
};
