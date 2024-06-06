import React from 'react';

const Loading = () => {
  const spinnerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const spinnerStyle = {
    display: 'inline-block',
    width: '80px',
    height: '80px',
    position: 'relative',
  };

  const dualRingStyle = {
    content: ' ',
    display: 'block',
    width: '64px',
    height: '64px',
    margin: '8px',
    borderRadius: '50%',
    border: '6px solid #09f',
    borderColor: '#09f transparent #09f transparent',
    animation: 'dual-ring-spin 1.2s linear infinite',
  };

  const keyframesStyle = `
    @keyframes dual-ring-spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;

  return (
    <div style={spinnerContainerStyle}>
      <style>
        {keyframesStyle}
      </style>
      <div style={spinnerStyle}>
        <div style={dualRingStyle}></div>
      </div>
    </div>
  );
};

export default Loading;
