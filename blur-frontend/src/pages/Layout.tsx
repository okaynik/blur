import React, { ReactNode } from 'react';
import Navbar from "../components/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={{ marginTop: '90px' }}> {/* Add the margin-top style inline */}
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
