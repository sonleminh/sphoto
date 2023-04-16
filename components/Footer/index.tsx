import React from 'react';
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='flex justify-center items-center h-[55px] text-[#c2c2c2] border-t-2 border-[#313131] sm:px-5'>
      <div className='mx-20 sm:w-[80%] sm:mx-0'>
        ©Copyright. All rights reserved.
      </div>
      <div className='flex mx-20 sm:w-[20%] sm:mx-5'>
        <a href='https://www.facebook.com/sonlele2'>
          <FaFacebookSquare className='mx-1.5 text-[22px] sm:ml-1' />
        </a>
        <a href='https://github.com/sonleminh'>
          <FaGithubSquare className='mx-1.5 text-[22px] sm:ml-1' />
        </a>
        <a href='https://www.linkedin.com/in/son-le-028715261/'>
          <FaLinkedin className='mx-1.5 text-[22px] sm:ml-1' />
        </a>
      </div>
    </div>
  );
};

export default Footer;
