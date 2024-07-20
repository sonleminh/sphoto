import React, { PropsWithChildren } from 'react';
import { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { FaAngleUp } from 'react-icons/fa';

const Layout = ({ children }: PropsWithChildren) => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

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
      {showTopBtn && (
        <div className='fixed bottom-10 right-10 p-3 bg-[rgba(130,130,130,0.5)] text-white text-[30px] rounded-[50%] z-[69] cursor-pointer sm:bottom-[70px] sm:right-5'>
          <FaAngleUp onClick={goToTop} />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Layout;
