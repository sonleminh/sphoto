import React, { PropsWithChildren } from 'react';
import Header from '../Header';
import Footer from '../Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          width: '100%',
          height: '100%',
          minHeight: 'calc(100vh - 55px)',
        }}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
