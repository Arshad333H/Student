import React from 'react';
import StudentNavbar from '../components/StudentNavbar';


interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <StudentNavbar />
        
        {/* Main content area */}
        <main className="pt-4 pb-16 min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;