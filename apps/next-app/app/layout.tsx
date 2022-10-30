import React from 'react';
import '../styles/globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <title>Next.js</title>
      </head>
      <body>
        <div className='app-layout'>
          <div>Root Layout</div>
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
