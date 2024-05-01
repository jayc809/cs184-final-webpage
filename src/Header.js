// Header.js
import React from 'react';

const Header = () => {
  const handleVideoClick = () => {
    window.location.href = 'https://www.youtube.com/watch?v=kvoJlMnLQ1I';
  };

  const handlePresentationClick = () => {
    window.location.href =
      'https://docs.google.com/presentation/d/1mHWAQcfgdnA74ATiRc30-pyyMjBo_4p6Qh1JDLkB-gw/edit#slide=id.g26febe1c695_0_1';
  };

  const handleMainClick = () => {
    window.location.href = '/';
  };

  return (
    <header>
      <div
        style={{
          backgroundColor: 'black',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1 style={{ color: 'white', margin: 0 }}>Point Cloud to Mesh</h1>
        <div>
          <button
            style={{
              color: 'white',
              backgroundColor: 'black',
              border: 'none',
              marginRight: '10px',
            }}
            onClick={handleMainClick}
          >
            Home
          </button>
          <button
            style={{
              color: 'white',
              backgroundColor: 'black',
              border: 'none',
              marginRight: '10px',
            }}
            onClick={handleVideoClick}
          >
            Video
          </button>
          <button
            style={{ color: 'white', backgroundColor: 'black', border: 'none' }}
            onClick={handlePresentationClick}
          >
            Presentation
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
