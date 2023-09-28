import React from 'react';

const ErrorPage = ({ statusCode }) => {
  return (
    <div>
      <h1>Error {statusCode}</h1>
      <p>Sorry, something went wrong.</p>
    </div>
  );
};

export default ErrorPage;
