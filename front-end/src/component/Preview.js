import React from 'react';

const Preview = (props) => {
  const onLoginButtonClick = () => {
    // Navigate to the login page
    window.location.href = '/login';

  };

  const onRegisterButtonClick = () => {
    // Navigate to the register page
    window.location.href = '/register';
  };

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={'buttonContainer'}>
        {/* Button to navigate to the login page */}
        <input
          className={'inputButton'}
          type="button"
          onClick={onLoginButtonClick}
          value={'Log in'}
        />
        {/* Button to navigate to the register page */}
        <input
          className={'inputButton'}
          type="button"
          onClick={onRegisterButtonClick}
          value={'Register'}
        />
      </div>
    </div>
  );
};

export default Preview;
