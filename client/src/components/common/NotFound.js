import React from 'react';
import notfound from './notfound.png';

const NotFound = () => {
  return (
    <div>
      <img
        src={notfound}
        alt="Something Went Wrong!!"
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
      <h6
        className="display-4"
        style={{
          width: '300px',
          margin: 'auto',
          display: 'block',
          textAlign: 'center'
        }}
      >
        Not found :/
      </h6>
    </div>
  );
};

export default NotFound;
